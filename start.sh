# import subprocess
# import environ

# subprocess.run(["docker-compose", "up", "-d"])

# env = environ.Env(DEBUG=(bool, False))
# environ.Env.read_env(env_file=".env")


# query = "select 1"

# subprocess.run(
#     [
#         "./wait-until",
#         f"docker-compose exec -T -e PGPASSWORD=${env('DATABASE_PASSWORD')} postgres psql -U ${env('DATABASE_USER')} ${env('DATABASE_USER')} -c query",
#     ]
# )
#!/usr/bin/env bash

set -e
docker-compose down #-v
docker-compose up --build

# source .env
echo '---comment---'
./wait-until "docker-compose exec -T -e PGPASSWORD=${DATABASE_PASSWORD} postgres psql -U ${DATABASE_USER} ${DATABASE_USER} -c 'select 1'"
