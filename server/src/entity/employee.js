const { prepareImageUrl } = require('../utils');

exports.makeEmployee = (employeeData) => {
  if (!employeeData) return null

  const { avatarSrc, ...restEmployeeData } = employeeData

  const preparedAvatarSrc = prepareImageUrl(avatarSrc)

  const position = employeeData.position.name

  return { ...restEmployeeData, avatarSrc: preparedAvatarSrc, position }
}