// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'prepareIma... Remove this comment to see the full error message
const { prepareImageUrl } = require('../utils')

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.makeEmployee = (employeeData: any) => {
  if (!employeeData) return null

  const { avatarSrc, ...restEmployeeData } = employeeData

  const preparedAvatarSrc = prepareImageUrl(avatarSrc)

  const position = employeeData.position.name

  return { ...restEmployeeData, avatarSrc: preparedAvatarSrc, position }
}
