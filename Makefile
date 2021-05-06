DEFAULT=./.env
VARIABLES=`cat $(DEFAULT) | xargs`

start:
	env $(VARIABLES) npm run start