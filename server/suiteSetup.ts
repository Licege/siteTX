// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('./src/models').init()

// @ts-expect-error TS(2304): Cannot find name 'afterAll'.
afterAll(() => sequelize.close())
