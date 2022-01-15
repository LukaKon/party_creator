FROM python:3.9.2-slim-buster

WORKDIR /app

LABEL maintainer="PartyTeam"
LABEL description="GeoDjango..."

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get -y install netcat gcc postgresql \
    && apt-get clean

RUN apt-get install -y binutils libproj-dev gdal-bin python-gdal python3-gdal

RUN pip install --upgrade pip

# COPY ./requirements.txt /app/requirements.txt

COPY . /app
RUN pip install -r requirements.txt
# RUN psql -e "select * from party_db;"
RUN python3 manage.py runserver_plus 0.0.0.0:8000