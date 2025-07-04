import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key") # Change this in production!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # Token valid for 30 minutes

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/recipes_db")