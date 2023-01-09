DEFAULT=./.env
VARIABLES=`cat $(DEFAULT) | xargs`

start-service:
	env $(VARIABLES) PORT=9090 DEFAULT_EXECUTION_MODE=service npm run watch

start-auth:
	env $(VARIABLES) PORT=9092 DEFAULT_EXECUTION_MODE=authorization npm run watch

start-tg-bot:
	env $(VARIABLES) PORT=9093 DEFAULT_EXECUTION_MODE=telegram npm run watch

run-task:
	env $(VARIABLES) node ${path}

migrate-run:
	env $(VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:migrate

migrate-undo:
	env $(VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:migrate:undo

migrate-undo-all:
	env $(VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:migrate:undo:all

seed-run:
	env $(VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:seed

seed-run-all:
	env $(VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:seed:all

seed-undo:
	env $(VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:seed:undo

seed-undo-all:
	env $(VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:seed:undo:all