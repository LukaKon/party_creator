FROM python:3.9-alpine3.15

LABEL maintainer="PartyTeam"
LABEL description="PartyWizard Backend"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.doc.txt /tmp/requirements.doc.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
COPY . /app
WORKDIR /app
EXPOSE 8000

ARG DEV=false

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    # installing necessary packages to install psycopg2 from source
    # because this version is more robust/efficient than psycopg2-binary
    apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache --virtual .tmp-build-deps \
    build-base postgresql-dev musl-dev && \
    /py/bin/pip install -r /tmp/requirements.doc.txt && \
    if [ $DEV = "true" ]; \
    then /py/bin/pip install -r /tmp/requirements.dev.txt; \
    fi && \
    rm -rf /tmp && \
    # remove unnecessary packages used to build psycopg2
    apk del .tmp-build-deps && \
    adduser \
    --disabled-password \
    --no-create-home \
    django-user

ENV PATH="/py/bin:$PATH"

USER django-user