# base image
# FROM python:3.9-slim-bullseye

# LABEL maintainer="PartyTeam"
# LABEL description="GeoDjango..."

# ENV PYTHONUNBUFFERED 1
# ENV PYTHONDONTWRITEBYTECODE 1

# RUN apt-get update && apt-get install -y \
# binutils \
# libproj-dev \
# gdal-bin
# RUN apt-get clean && apt-get autoremove

# RUN mkdir /code
# WORKDIR /code
# COPY requirements.txt /code/
# RUN python -m pip install --upgrade pip
# RUN pip install --user --upgrade pip
# RUN pip install -r requirements.txt
# COPY . /code/

# RUN python manage.py runserver_plus 0.0.0.0:8000


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

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app