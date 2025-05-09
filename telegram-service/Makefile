DEFAULT=./.env
DEVELOPMENT=./.development.env
VARIABLES=`cat $(DEFAULT) | xargs`
DEVELOPMENT_VARIABLES=`cat $(DEVELOPMENT) | xargs`

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

run-test-dev:
	env $(DEVELOPMENT_VARIABLES) node ./sandbox/test

run-task-dev:
	env $(DEVELOPMENT_VARIABLES) node ${path}

migrate-run-dev:
	env $(DEVELOPMENT_VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:migrate

migrate-undo-dev:
	env $(DEVELOPMENT_VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:migrate:undo

migrate-undo-all-dev:
	env $(DEVELOPMENT_VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:migrate:undo:all

seed-run-dev:
	env $(DEVELOPMENT_VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:seed

seed-run-all-dev:
	env $(DEVELOPMENT_VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:seed:all

seed-undo-dev:
	env $(DEVELOPMENT_VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:seed:undo

seed-undo-all-dev:
	env $(DEVELOPMENT_VARIABLES) DB_NAME=trixolma ./node_modules/.bin/sequelize db:seed:undo:all

run-test-dev:
	env $(DEVELOPMENT_VARIABLES) node ./sandbox/test