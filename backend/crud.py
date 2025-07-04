from sqlalchemy.orm import Session
from sqlalchemy import or_

from . import models, schemas, auth

# --- User CRUD Operations ---

def get_user_by_username(db: Session, username: str):
    """Retrieves a user by their username."""
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    """Creates a new user in the database."""
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# --- Recipe CRUD Operations ---

def get_recipe(db: Session, recipe_id: int, user_id: int):
    """Retrieves a single recipe by ID for a specific user."""
    return db.query(models.Recipe).filter(models.Recipe.id == recipe_id, models.Recipe.user_id == user_id).first()

def get_recipes(db: Session, user_id: int, skip: int = 0, limit: int = 100, search: Optional[str] = None, category: Optional[str] = None):
    """Retrieves all recipes for a specific user, with optional search and category filtering."""
    query = db.query(models.Recipe).filter(models.Recipe.user_id == user_id)

    if search:
        # Search by recipe name or ingredients
        query = query.filter(or_(
            models.Recipe.name.ilike(f"%{search}%"),
            models.Recipe.ingredients.ilike(f"%{search}%")
        ))
    if category:
        # Filter by category, case-insensitive
        query = query.filter(models.Recipe.category.ilike(f"%{category}%"))

    return query.offset(skip).limit(limit).all()

def create_user_recipe(db: Session, recipe: schemas.RecipeCreate, user_id: int):
    """Creates a new recipe associated with a user."""
    db_recipe = models.Recipe(**recipe.dict(), user_id=user_id)
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def update_recipe(db: Session, db_recipe: models.Recipe, recipe_update: schemas.RecipeUpdate):
    """Updates an existing recipe."""
    update_data = recipe_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_recipe, key, value)
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def delete_recipe(db: Session, db_recipe: models.Recipe):
    """Deletes a recipe from the database."""
    db.delete(db_recipe)
    db.commit()
    return {"message": "Recipe deleted successfully"}
