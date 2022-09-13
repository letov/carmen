docker-compose --env-file ./server/src/config/env/.env.production.local down -v
docker-compose --env-file ./server/src/config/env/.env.production.local build --no-cache
docker-compose --env-file ./server/src/config/env/.env.production.local up -d
