docker network inspect express_public_network --format {{.Id}} 2> /dev/null || docker network create --driver bridge express_public_network
docker network inspect express_auth_db_network --format {{.Id}} 2> /dev/null || docker network create --driver bridge express_auth_db_network
docker network inspect express_auth_redis_network --format {{.Id}} 2> /dev/null || docker network create --driver bridge express_auth_redis_network

docker volume inspect express_auth_redis --format {{.Name}} 2> /dev/null || docker volume create --name=express_auth_redis
docker volume inspect express_auth_postgres --format {{.Name}} 2> /dev/null || docker volume create --name=express_auth_postgres
docker volume inspect express_auth_node_modules --format {{.Name}} 2> /dev/null || docker volume create --name=express_auth_node_modules

cp -n .env.example .env

cd config
cp -n config.js.example config.js
cd ..

make npm_install

make create_database

make run_migration

make stop

echo "Auth service setup finished"
