# alembic/env.py
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import Base
# target_metadata = Base.metadata
from backend.database import Base
from backend import models # Import models to ensure they are registered with Base.metadata
target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired: copy those values from the .ini file itself.
# for example, myapp.models might be a relative module name to be loaded here

# load the .env file for database URL
import os
from dotenv import load_dotenv
load_dotenv()

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an actual Engine, though an Engine is supplied here as well.
    Because we don't actually connect to the database here, we just generate
    the SQL we would have run.
    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.
    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
elif os.getenv("DATABASE_URL"): # Check if DATABASE_URL is set for online mode
    # Override sqlalchemy.url from .env if running online
    config.set_main_option("sqlalchemy.url", os.getenv("DATABASE_URL"))
    run_migrations_online()
else:
    print("DATABASE_URL environment variable not set. Cannot run migrations online.")
    exit(1)
