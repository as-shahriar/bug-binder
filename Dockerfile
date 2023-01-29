FROM python:3.7
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY . /app
RUN  pip install pipenv  \
    && pipenv requirements > requirements.txt \
    && pip install -r requirements.txt

EXPOSE 8000
WORKDIR /app/bugbinder