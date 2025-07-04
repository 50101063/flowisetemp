from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .main import router as api_router

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Personal Recipe Card Organizer API",
    description="API for managing personal recipe cards.",
    version="1.0.0",
)

# CORS Middleware
# Adjust origins as needed for your frontend deployment
origins = [
    "http://localhost:3000", # React frontend default
    "http://localhost:8000", # Backend itself
    # Add your deployed frontend URL here in production
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"]
)

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the Personal Recipe Card Organizer API!"}