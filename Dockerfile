# base image
FROM python:3.9-slim

# USER app
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE=1
# RUN mkdir /db
#RUN chown app:app -R /db

RUN apt-get update && apt-get install -y \
    binutils \
    libproj-dev \
    gdal-bin
RUN apt-get clean && apt-get autoremove

RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
# RUN python -m pip install --upgrade pip
# RUN pip install --user --upgrade pip
RUN pip install -r requirements.txt
COPY . /code/

# RUN python manage.py runserver_plus 0.0.0.0:8000
