set -e
docker-compose down #-v
docker-compose up --build

source .env
echo '---comment---'
./wait-until "docker-compose exec -T -e PGPASSWORD=${DATABASE_PASSWORD} postgres psql -U ${DATABASE_USER} ${DATABASE_USER} -c 'select 1'"
