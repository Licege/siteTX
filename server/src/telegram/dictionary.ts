// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'commands'.
const commands = `
  /help - Помощь
`

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.dictionary = {
  commands
}
