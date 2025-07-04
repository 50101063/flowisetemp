# create_db_tables.py
from .database import Base, engine
from . import models # Import models to ensure they are registered with Base.metadata

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Database tables created successfully!")
