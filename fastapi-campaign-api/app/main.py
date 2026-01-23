from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.database import create_db_and_tables
from app.routers import campaigns

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager to handle startup and shutdown events.
    In this case, we create the database and tables on startup.
    """
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

# Include the campaigns router
app.include_router(campaigns.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Campaign API", "docs": "/docs"}
