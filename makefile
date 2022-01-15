ifneq (,$(wildcard ./.env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif

build:
	echo 'build'
	set -e
	docker-compose down
	docker-compose up --build

	source .env
	./wait-until "docker-compose exec -T -e PGPASSWORD=${DATABASE_PASSWORD} postgres psql -U ${DATABASE_USER} ${DATABASE_USER} -c 'select 1'"

up:
	echo 'up'
	docker-compose up -d

	source .env
	./wait-until "docker-compose exec -T -e PGPASSWORD=${DATABASE_PASSWORD} postgres psql -U ${DATABASE_USER} ${DATABASE_USER} -c 'select 1'"

down:
	docker-compose down

# remove also volumes
down-v:
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
