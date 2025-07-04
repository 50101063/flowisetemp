from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# --- User Schemas ---

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, description="Unique username")

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="Password for the user")

class UserLogin(UserBase):
    password: str = Field(..., description="Password for the user")

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # For SQLAlchemy ORM compatibility

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# --- Recipe Schemas ---

class RecipeBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=100, description="Name of the recipe")
    ingredients: str = Field(..., min_length=10, description="List of ingredients")
    instructions: str = Field(..., min_length=20, description="Cooking instructions")
    category: str = Field(..., min_length=2, max_length=50, description="Category or tag for the recipe (e.g., 'Dinner', 'Dessert')")

class RecipeCreate(RecipeBase):
    pass

class RecipeUpdate(RecipeBase):
    # All fields are optional for partial updates
    name: Optional[str] = Field(None, min_length=3, max_length=100, description="Name of the recipe")
    ingredients: Optional[str] = Field(None, min_length=10, description="List of ingredients")
    instructions: Optional[str] = Field(None, min_length=20, description="Cooking instructions")
    category: Optional[str] = Field(None, min_length=2, max_length=50, description="Category or tag for the recipe (e.g., 'Dinner', 'Dessert')")

class RecipeResponse(RecipeBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  # For SQLAlchemy ORM compatibility
