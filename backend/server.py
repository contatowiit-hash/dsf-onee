from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
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
