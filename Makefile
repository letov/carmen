PROD_ENV_PATH = ./server/src/config/env/.env.production.local
DEV_ENV_PATH = ./server/src/config/env/.env.development.local
include $(DEV_ENV_PATH)
export
DOCKER_COMPOSE_PROD_ENV = docker-compose --env-file $(PROD_ENV_PATH)

x-prod-start:
	$(DOCKER_COMPOSE_PROD_ENV) down -v;
	$(DOCKER_COMPOSE_PROD_ENV) build --no-cache;
	$(DOCKER_COMPOSE_PROD_ENV) up -d;

x-dev-init:
	docker run \
		--name postgres-db \
		-e POSTGRES_USER=$(POSTGRES_USER) \
		-e POSTGRES_PASSWORD=$(POSTGRES_PASSWORD) \
		-e POSTGRES_DB=$(POSTGRES_DB) \
		-p $(POSTGRES_PORT):$(POSTGRES_PORT) \
		-v /data:/var/lib/postgresql/data \
		-d postgres:14; \
	docker run \
		--name redis-cache \
		-p $(REDIS_PORT):$(REDIS_PORT) \
		-v /data:/data \
		-d redis;

x-dev-stop:
	docker stop postgres-db \
    	& docker stop redis-cache

x-dev-start:
	docker start postgres-db
	docker start redis-cache
	npm --prefix client i
	npm --prefix server i
	npm --prefix client run dev \
	& npm --prefix server run start:dev

