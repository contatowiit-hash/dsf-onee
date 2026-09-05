from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from openai import AsyncOpenAI
import httpx
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timezone, timedelta

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

groq_client = AsyncOpenAI(
    api_key=os.environ["GROQ_API_KEY"],
    base_url="https://api.groq.com/openai/v1",
)

PROFESSOR_SYSTEM_PROMPT = (
    "Você é o Professor ONEE, um professor virtual especializado em energia elétrica e "
    "eficiência energética para estudantes do 8º e 9º ano do Ensino Fundamental que se "
    "preparam para a Olimpíada Nacional de Eficiência Energética. Responda sempre em "
    "português do Brasil, com linguagem simples, didática e encorajadora. Seja direto: "
    "respostas com no máximo 120 palavras. Use exemplos do dia a dia (conta de luz, "
    "chuveiro elétrico, geladeira, lâmpadas). Se a pergunta não tiver relação com estudos, "
    "energia ou ciências, redirecione educadamente para o tema da olimpíada. "
    "Você também atua como tutor durante as aulas e os quizzes: quando o aluno disser que "
    "não entendeu, reexplique de outro jeito, com outro exemplo do cotidiano; quando ele "
    "pedir uma dica, oriente o raciocínio SEM revelar a resposta da questão; quando ele "
    "errar, explique o motivo do erro com carinho e indique o que revisar. Nunca entregue "
    "a resposta pronta de uma questão: conduza o aluno a concluir sozinho."
)

app = FastAPI()
api_router = APIRouter(prefix="/api")


class LeadCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    source: str = "checklist"


@api_router.get("/")
async def root():
    return {"message": "Desafio ONEE API"}


@api_router.post("/leads", status_code=201)
async def create_lead(input: LeadCreate):
    email = input.email.strip().lower()
    existing = await db.leads.find_one({"email": email})
    if existing:
        return {"status": "ok", "duplicate": True, "message": "E-mail já cadastrado."}
    doc = {
        "id": str(uuid.uuid4()),
        "email": email,
        "name": (input.name or "").strip() or None,
        "source": input.source,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.leads.insert_one(doc)
    return {"status": "ok", "duplicate": False, "message": "Lead cadastrado com sucesso."}


@api_router.get("/leads/count")
async def leads_count():
    return {"count": await db.leads.count_documents({})}


class ProfessorMessage(BaseModel):
    message: str
    session_id: Optional[str] = None
    context: Optional[str] = None


@api_router.post("/professor")
async def professor(input: ProfessorMessage):
    text = input.message.strip()[:600]
    if not text:
        raise HTTPException(status_code=400, detail="Mensagem vazia.")
    session_id = input.session_id or str(uuid.uuid4())
    history = await db.professor_chats.find(
        {"session_id": session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(24)
    system_prompt = PROFESSOR_SYSTEM_PROMPT
    if input.context:
        system_prompt += (
            "\n\nO aluno está vendo agora este conteúdo/questão: "
            + input.context[:500]
            + "\nUse esse contexto para orientar o raciocínio, sem entregar a resposta de cara."
        )
    messages = [{"role": "system", "content": system_prompt}]
    messages += [{"role": h["role"], "content": h["content"]} for h in history[-12:]]
    messages.append({"role": "user", "content": text})
    completion = await groq_client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=messages,
        max_tokens=400,
        temperature=0.6,
    )
    reply = completion.choices[0].message.content.strip()
    now = datetime.now(timezone.utc).isoformat()
    await db.professor_chats.insert_many([
        {"session_id": session_id, "role": "user", "content": text, "created_at": now},
        {"session_id": session_id, "role": "assistant", "content": reply, "created_at": now},
    ])
    return {"reply": reply, "session_id": session_id}


# ---------- Google Auth (Emergent-managed) ----------

class SessionExchange(BaseModel):
    session_id: str


@api_router.post("/auth/session")
async def auth_session(input: SessionExchange, response: Response):
    async with httpx.AsyncClient() as http:
        r = await http.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers={"X-Session-ID": input.session_id},
            timeout=15,
        )
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Sessão inválida.")
    data = r.json()
    email = data["email"].strip().lower()
    user_doc = await db.users.find_one({"email": email}, {"_id": 0})
    if user_doc:
        await db.users.update_one(
            {"email": email},
            {"$set": {"name": data.get("name", ""), "picture": data.get("picture", "")}},
        )
        user_doc["name"] = data.get("name", "")
        user_doc["picture"] = data.get("picture", "")
    else:
        user_doc = {
            "user_id": f"user_{uuid.uuid4().hex[:12]}",
            "email": email,
            "name": data.get("name", ""),
            "picture": data.get("picture", ""),
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        await db.users.insert_one({**user_doc})
    token = data["session_token"]
    await db.user_sessions.insert_one({
        "user_id": user_doc["user_id"],
        "session_token": token,
        "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    response.set_cookie(
        "session_token", token, path="/", secure=True, httponly=True,
        samesite="none", max_age=7 * 24 * 3600,
    )
    return user_doc


async def get_current_user(request: Request):
    token = request.cookies.get("session_token")
    auth = request.headers.get("Authorization")
    if not token and auth and auth.startswith("Bearer "):
        token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Não autenticado.")
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Sessão inválida.")
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Sessão expirada.")
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado.")
    return user


@api_router.get("/auth/me")
async def auth_me(user=Depends(get_current_user)):
    return user


@api_router.post("/auth/logout")
async def auth_logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_many({"session_token": token})
    response.delete_cookie("session_token", path="/", secure=True, samesite="none")
    return {"status": "ok"}


# ---------- Progresso do aluno ----------

def _default_progress(user_id):
    return {
        "user_id": user_id,
        "completed_lessons": [],
        "xp": 0,
        "simulados": [],
        "activity_dates": [],
        "created_at": datetime.now(timezone.utc).isoformat(),
    }


def _today():
    return datetime.now(timezone.utc).date().isoformat()


@api_router.get("/progress")
async def get_progress(user=Depends(get_current_user)):
    doc = await db.progress.find_one({"user_id": user["user_id"]}, {"_id": 0})
    if not doc:
        doc = _default_progress(user["user_id"])
        await db.progress.insert_one({**doc})
    today = _today()
    doc.setdefault("activity_dates", [])
    if today not in doc["activity_dates"]:
        await db.progress.update_one(
            {"user_id": user["user_id"]},
            {"$push": {"activity_dates": today}, "$inc": {"xp": 5}},
        )
        doc["activity_dates"].append(today)
        doc["xp"] += 5
    return doc


class LessonComplete(BaseModel):
    lesson_key: str
    quiz_correct: Optional[int] = None


@api_router.post("/progress/lesson")
async def complete_lesson(input: LessonComplete, user=Depends(get_current_user)):
    doc = await db.progress.find_one({"user_id": user["user_id"]}, {"_id": 0})
    if not doc:
        doc = _default_progress(user["user_id"])
        await db.progress.insert_one({**doc})
    doc.setdefault("activity_dates", [])
    today = _today()
    if today not in doc["activity_dates"]:
        await db.progress.update_one(
            {"user_id": user["user_id"]}, {"$push": {"activity_dates": today}}
        )
        doc["activity_dates"].append(today)
    if input.lesson_key not in doc["completed_lessons"]:
        gained = 25 + (input.quiz_correct or 0) * 10
        await db.progress.update_one(
            {"user_id": user["user_id"]},
            {"$push": {"completed_lessons": input.lesson_key}, "$inc": {"xp": gained}},
        )
        doc["completed_lessons"].append(input.lesson_key)
        doc["xp"] += gained
    return doc


class SimuladoResult(BaseModel):
    score: int
    total: int


@api_router.post("/progress/simulado")
async def save_simulado(input: SimuladoResult, user=Depends(get_current_user)):
    doc = await db.progress.find_one({"user_id": user["user_id"]}, {"_id": 0})
    if not doc:
        doc = _default_progress(user["user_id"])
        await db.progress.insert_one({**doc})
    doc.setdefault("activity_dates", [])
    today = _today()
    gained = 100 + input.score * 10
    record = {
        "score": input.score,
        "total": input.total,
        "date": datetime.now(timezone.utc).isoformat(),
    }
    updates = {"$push": {"simulados": record}, "$inc": {"xp": gained}}
    if today not in doc["activity_dates"]:
        updates["$push"]["activity_dates"] = today
        doc["activity_dates"].append(today)
    await db.progress.update_one({"user_id": user["user_id"]}, updates)
    doc["simulados"].append(record)
    doc["xp"] += gained
    return doc


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
