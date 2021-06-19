DEFAULT=./.env
VARIABLES=`cat $(DEFAULT) | xargs`

start:
	env $(VARIABLES) NODE_ENV=development npm run start

start-prod:
	env $(VARIABLES) NODE_ENV=production npm run start