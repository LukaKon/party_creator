ifneq (,$(wildcard ./.env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif

# vol:
# docker volume create --name=pgdata

build:
	set -e
	docker-compose down
	docker-compose up --build

up:
	docker-compose up
#	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down -v

logs:
	docker-compose logs

migrate:
	docker-compose exec django python3 manage.py migrate --noinput

makemigrations:
	docker-compose exec django python3 manage.py makemigrations

superuser:
	docker-compose exec django python3 manage.py createsuperuser

volume:
	docker volume inspect party_creator_pgdata

shell:
	docker-compose exec django python3 manage.py shell_plus

dump:
	docker exec -i postgis_db /bin/bash -c "PGPASSWORD=$(DATABASE_PASSWORD) pg_dump -h localhost --username $(DATABASE_USER) $(DATABASE_NAME)" > dump.sql

restore:
	docker exec -i postgis_db /bin/bash -c "PGPASSWORD=$(DATABASE_PASSWORD) psql -h localhost --username $(DATABASE_USER) $(DATABASE_NAME)" < dump.sql

#dark:
#	docker-compose exec django darker .