FROM python:3.10-slim-buster

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./alembic.ini /app/alembic.ini
COPY ./alembic /app/alembic
COPY ./backend /app/backend

EXPOSE 8000

CMD ["/bin/bash", "-c", "alembic upgrade head && uvicorn backend.main:app --host 0.0.0.0 --port 8000"]