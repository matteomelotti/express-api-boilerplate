.PHONY: help
.SILENT: build config eslint_fix eslint_report npm_add_dep npm_add_dev_dep npm_install npm_remove prettier rebuild recreate recreated remove setup start startd stop
SERVICE_NAME=express-api

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
setup: ## launch setup.sh script
	./docker/dev/setup.sh	
config: ## return docker compose config
	docker-compose config
remove: ## run docker compose down
	docker-compose down
build: ## run docker compose build
	docker-compose build
rebuild: ## run docker compose build --no-cache
	docker-compose build --no-cache
start: ## run docker compose up
	docker-compose up
stop: ## run docker compose stop
	docker-compose stop	
recreate: ## run docker compose up --force-recreate
	docker-compose up --force-recreate
startd: ## run docker compose up -d
	docker-compose up -d
recreated: ## run docker compose up --force-recreate d
	docker-compose up --force-recreate -d
# SPECIFIC FOR THE PROJECT
create_database: ## make created_database | create the database (check config/config.json)
	docker-compose run --rm $(SERVICE_NAME) npx sequelize-cli db:create
drop_database: ## make drop_database | create the database (check config/config.json)
	docker-compose run --rm $(SERVICE_NAME) npx sequelize-cli db:drop
create_model: ## MODEL_NAME=Bar make create_model | create a model Bar with a placeholder attribute called foo
	docker-compose run --rm $(SERVICE_NAME) npx sequelize-cli model:generate --name $$MODEL_NAME --attributes foo:string
create_migration: ## MIGRATION_NAME=create-foo make create_migration | create a migration named create-foo.js, rename in .cjs
	docker-compose run --rm $(SERVICE_NAME) npx sequelize-cli migration:generate --name $$MIGRATION_NAME;
run_migration: ## make run_migration | run migrations
	docker-compose run --rm $(SERVICE_NAME) npx sequelize-cli db:migrate
rollback_migration: ## make rollback_migration | rollback one migration at a time
	docker-compose run --rm $(SERVICE_NAME) npx sequelize-cli db:migrate:undo
npm_install: ## make npm_install | install modules
	docker-compose run --rm $(SERVICE_NAME) npm install;
npm_add_dev_dep: ## PACKAGE="package1 package2" make npm_add_dev_dep | install module/s into dev dependencies
	docker-compose run --rm $(SERVICE_NAME) npm install --save-dev $$PACKAGE;
npm_add_dep: ## PACKAGE="package1 package2" make npm_add_dep | install module/s into dependencies
	docker-compose run --rm $(SERVICE_NAME) npm install --save $$PACKAGE;
npm_remove: ## PACKAGE="package1 package2" make npm_remove | remove module/s
	docker-compose run --rm $(SERVICE_NAME) npm uninstall --save $$PACKAGE;
prettier: ## make prettier | launch script prettier
	docker-compose run --rm $(SERVICE_NAME) npm run prettier;
eslint_report: ## make eslint_report | launch script eslint_report
	docker-compose run --rm $(SERVICE_NAME) npm run eslint_report;
eslint_fix: ## make eslint_fix | launch script eslint_fix
	docker-compose run --rm $(SERVICE_NAME) npm run eslint_fix;	
