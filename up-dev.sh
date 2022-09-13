(docker start \
  postgres-db \
|| docker run \
  --name postgres-db \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_DB=carmen_db \
  -p 5432:5432 \
  -v /data:/var/lib/postgresql/data \
  -d postgres); \

(docker start \
  redis-cache \
|| docker run \
  --name redis-cache \
  -p 6379:6379 \
  -v /data:/data \
  -d redis); \

npm --prefix client i
npm --prefix server i

npm --prefix client run dev \
& npm --prefix server run start:dev
