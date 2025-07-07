from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from . import crud, models, schemas
from .database import SessionLocal, engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Product CRUD API",
    description="A simple RESTful API to manage product information.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5500", # For Live Server VS Code extension
    "http://127.0.0.1:5500", # For Live Server VS Code extension
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the Product CRUD API!"}

@app.post("/products/", response_model=schemas.ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = crud.get_product_by_name(db, name=product.name)
    if db_product:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product with this name already exists")
    return crud.create_product(db=db, product=product)

@app.get("/products/", response_model=List[schemas.ProductResponse])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return products

@app.get("/products/{product_id}", response_model=schemas.ProductResponse)
def read_product(product_id: UUID, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return db_product

@app.put("/products/{product_id}", response_model=schemas.ProductResponse)
def update_product(product_id: UUID, product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    # Check if a product with the new name already exists (if name is updated)
    if product.name and product.name != db_product.name:
        existing_product_with_name = crud.get_product_by_name(db, name=product.name)
        if existing_product_with_name and existing_product_with_name.id != product_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product with this name already exists")

    return crud.update_product(db=db, product_id=product_id, product=schemas.ProductUpdate(**product.model_dump()))

@app.patch("/products/{product_id}", response_model=schemas.ProductResponse)
def patch_product(product_id: UUID, product: schemas.ProductUpdate, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    # Check if a product with the new name already exists (if name is updated)
    if product.name is not None and product.name != db_product.name:
        existing_product_with_name = crud.get_product_by_name(db, name=product.name)
        if existing_product_with_name and existing_product_with_name.id != product_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Product with this name already exists")

    return crud.update_product(db=db, product_id=product_id, product=product)


@app.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: UUID, db: Session = Depends(get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    crud.delete_product(db=db, product_id=product_id)
    return {"message": "Product deleted successfully"}