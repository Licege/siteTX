export function getFullName({ lastName = '', firstName = '', middleName = '' }) {
  return `${lastName} ${firstName} ${middleName}`.trim();
}