// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'contactHan... Remove this comment to see the full error message
const { contactHandler } = require('./contact');

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  contactHandler
}