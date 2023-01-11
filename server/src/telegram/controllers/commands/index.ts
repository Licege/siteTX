// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'start'.
const { start } = require('./start')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'showBalanc... Remove this comment to see the full error message
const { showBalance } = require('./showBalance')

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  start,
  showBalance,
}