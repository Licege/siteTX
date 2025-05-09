import { prepareImageUrl } from '../utils';

export const makeEmployee = (employeeData: any) => {
  if (!employeeData) return null

  const { avatarSrc, ...restEmployeeData } = employeeData

  const preparedAvatarSrc = prepareImageUrl(avatarSrc)

  const position = employeeData.position.name

  return { ...restEmployeeData, avatarSrc: preparedAvatarSrc, position }
}
