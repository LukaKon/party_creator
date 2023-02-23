ifneq (,$(wildcard ./.env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif

# DOCKER
build:
	set -e
	docker compose down
	docker compose up --build -d

up:
	docker compose up -d

stop:
	docker compose stop

down:
	# docker compose down
	docker compose down -v

rest: stop up 

logs:
	docker compose logs

volume:
	docker volume inspect party_creator_pgdata

### PYTHON/DJANGO
flake:
	docker compose run --rm backend sh -c 'flake8'

test:
	docker compose run --rm backend sh -c 'python manage.py test'

migrate:
	docker compose run --rm backend sh -c 'python manage.py migrate --noinput'

makemigrations:
	docker compose run --rm backend sh -c 'python manage.py makemigrations'

superuser:
	docker compose run --rm backend sh -c 'python manage.py createsuperuser'

shell:
	docker compose run --rm backend sh -c 'python manage.py shell_plus'
#	 docker compose exec backend python3 manage.py shell_plus

### DATABASE
psql:
	docker compose run --rm db sh -c 'psql -h db -p $(DB_PORT) -d $(DATABASE_NAME) -U $(DATABASE_USER) -W $(DATABASE_PASSWORD) ' 

dump:
	docker exec -i postgres_db /bin/bash -c "PGPASSWORD=$(DATABASE_PASSWORD) pg_dump -h localhost --username $(DATABASE_USER) $(DATABASE_NAME)" > dump.sql
	# docker compose exec db pg_dump -c -U ${DATABASE_USER} ${DATABASE_NAME} --no-owner > dump.sql

restore:
	docker exec -i postgres_db /bin/bash -c "PGPASSWORD=$(DATABASE_PASSWORD) psql -h localhost --username $(DATABASE_USER) $(DATABASE_NAME)" < dump.sql

redtest:
	docker compose run --rm cache sh -c 'redis-cli ping'
	# docker compose run --rm cache sh -c 'redis-cli'

redis:
	docker exec -it redis_cache redis-cli
