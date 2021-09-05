DEFAULT=./.env
VARIABLES=`cat $(DEFAULT) | xargs`

dev:
	env ${VARIABLES} PORT=3005 npm run dev

start:
	env ${VARIABLES} PORT=3005 npm run start

mock-api:
	npm run mock-api