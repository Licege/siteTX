// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'start'.
const { start, showBalance } = require('./commands');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'contactHan... Remove this comment to see the full error message
const { contactHandler } = require('./listeners');

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  start,
  showBalance,
  contactHandler,
}