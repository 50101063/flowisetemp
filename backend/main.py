from typing import List, Optional
from datetime import timedelta

from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import crud, models, schemas, auth
from .database import SessionLocal, engine, get_db, create_all_tables

# Create all database tables (if they don't exist)
# This should ideally be handled by a proper migration tool in production,
# but for this project, we'll create them on app startup.
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Personal Recipe Card Organizer API",
    description="API for managing personal recipes, including user authentication and CRUD operations for recipes.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS middleware
# In a production environment, you should restrict origins to your frontend's domain.
origins = [
    "http://localhost",
    "http://localhost:3000",  # Assuming your frontend runs on port 3000
    "http://localhost:8000",
    # Add your deployed frontend URL here when available
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Root Endpoint ---
@app.get("/", tags=["Health Check"])
async def root():
    return {"message": "Welcome to the Personal Recipe Card Organizer API!"}

# --- API Versioning --- 
# All main API routes will be prefixed with /api/v1

# --- User Authentication Endpoints ---

@app.post("/api/v1/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED, tags=["Users"])
async def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.post("/api/v1/token", response_model=schemas.Token, tags=["Users"])
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.get_user_by_username(db, username=form_data.username)
    if not user or not auth.verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/v1/users/me", response_model=schemas.UserResponse, tags=["Users"])
async def read_users_me(current_user: schemas.UserResponse = Depends(auth.get_current_user)):
    return current_user

# --- Recipe Management Endpoints ---

@app.post("/api/v1/recipes", response_model=schemas.RecipeResponse, status_code=status.HTTP_201_CREATED, tags=["Recipes"])
async def create_recipe_for_current_user(
    recipe: schemas.RecipeCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    return crud.create_user_recipe(db=db, recipe=recipe, user_id=current_user.id)

@app.get("/api/v1/recipes", response_model=List[schemas.RecipeResponse], tags=["Recipes"])
async def read_recipes(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=200),
    search: Optional[str] = Query(None, description="Search by recipe name or ingredients"),
    category: Optional[str] = Query(None, description="Filter by recipe category"),
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    recipes = crud.get_recipes(db, user_id=current_user.id, skip=skip, limit=limit, search=search, category=category)
    return recipes

@app.get("/api/v1/recipes/{recipe_id}", response_model=schemas.RecipeResponse, tags=["Recipes"])
async def read_recipe(
    recipe_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_recipe = crud.get_recipe(db, recipe_id=recipe_id, user_id=current_user.id)
    if db_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe not found")
    return db_recipe

@app.put("/api/v1/recipes/{recipe_id}", response_model=schemas.RecipeResponse, tags=["Recipes"])
async def update_recipe(
    recipe_id: int,
    recipe: schemas.RecipeUpdate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_recipe = crud.get_recipe(db, recipe_id=recipe_id, user_id=current_user.id)
    if db_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe not found or not authorized")
    return crud.update_recipe(db=db, db_recipe=db_recipe, recipe_update=recipe)

@app.delete("/api/v1/recipes/{recipe_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Recipes"])
async def delete_recipe(
    recipe_id: int,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    db_recipe = crud.get_recipe(db, recipe_id=recipe_id, user_id=current_user.id)
    if db_recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recipe not found or not authorized")
    crud.delete_recipe(db=db, db_recipe=db_recipe)
    return
