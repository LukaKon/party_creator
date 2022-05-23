ifneq (,$(wildcard ./.env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif


build:
	set -e
	docker compose down
	docker compose up --build -d

up:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down
	# docker compose down -v

logs:
	docker compose logs

lint:
	docker compose run --rm backend sh -c 'black .'

isort:
	docker compose run --rm backend sh -c 'isort --profile black .'

test:
	docker compose run --rm backend sh -c 'python manage.py test'
	# docker compose run --rm backend sh -c 'python manage.py test --parallel'

migrate:
	docker compose run --rm backend sh -c 'python3 manage.py migrate --noinput'
	# docker compose exec backend python3 manage.py migrate --noinput

makemigrations:
	docker compose run --rm backend sh -c 'python3 manage.py makemigrations'
	# docker compose exec backend python3 manage.py makemigrations

superuser:
	docker compose run --rm backend sh -c 'python3 manage.py createsuperuser'
	# docker compose exec backend python3 manage.py createsuperuser

volume:
	docker volume inspect party_creator_pgdata

shell:
	docker compose run --rm backend sh -c 'python3 manage.py shell_plus'
	# docker compose exec backend python3 manage.py shell_plus

dump:
	docker exec -i postgres_db /bin/bash -c "PGPASSWORD=$(DATABASE_PASSWORD) pg_dump -h localhost --username $(DATABASE_USER) $(DATABASE_NAME)" > dump.sql
	# docker compose exec db pg_dump -c -U ${DATABASE_USER} ${DATABASE_NAME} --no-owner > dump.sql

restore:
	docker exec -i postgres_db /bin/bash -c "PGPASSWORD=$(DATABASE_PASSWORD) psql -h localhost --username $(DATABASE_USER) $(DATABASE_NAME)" < dump.sql
