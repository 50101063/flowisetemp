import os
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env file

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'a_very_secret_key_default'
    SQLLACHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///site.db'
    SQLLACHEMY_TRACK_MODIFICATIONS = False
