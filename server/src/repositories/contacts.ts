// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { Contacts: ContactModel } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'createBasi... Remove this comment to see the full error message
const createBasicMethods = require('../lib/factories/modelFactory')

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'Contacts'.
const Contacts = createBasicMethods(ContactModel)

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  ...Contacts
}
