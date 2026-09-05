from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from openai import AsyncOpenAI
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timezone

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
    "energia ou ciências, redirecione educadamente para o tema da olimpíada."
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


@api_router.post("/professor")
async def professor(input: ProfessorMessage):
    text = input.message.strip()[:600]
    if not text:
        raise HTTPException(status_code=400, detail="Mensagem vazia.")
    session_id = input.session_id or str(uuid.uuid4())
    history = await db.professor_chats.find(
        {"session_id": session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(24)
    messages = [{"role": "system", "content": PROFESSOR_SYSTEM_PROMPT}]
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
