const parseLink = (data: any, fieldsWithLink = ['imageSrc']) => {
  if (!data || typeof data === 'number' || typeof data === 'boolean')
    return null

  if (data instanceof Array) {
    return data.map((item) => {
      return Object.keys(item).forEach((key) =>
        // @ts-expect-error TS(2550): Property 'includes' does not exist on type 'string... Remove this comment to see the full error message
        fieldsWithLink.includes(key)
          // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
          ? (item[key] = process.env.STORAGE_SRC + item[key])
          : item
      )
    })
  }

  if (typeof data === 'string') {
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    return process.env.STORAGE_SRC + data
  }

  return Object.keys(data).reduce((newObj, key) => {
    // @ts-expect-error TS(2550): Property 'includes' does not exist on type 'string... Remove this comment to see the full error message
    return fieldsWithLink.includes(key)
      // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
      ? { ...newObj, [key]: process.env.STORAGE_SRC + data[key] }
      : newObj
  }, {})
}

// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const { STORAGE_SRC } = process.env

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'prepareIma... Remove this comment to see the full error message
const prepareImageUrl = (url: any) => {
  if (!url) return ''

  return `${STORAGE_SRC}/${url.replace('\\', '/')}`
}

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'getFullNam... Remove this comment to see the full error message
function getFullName({ lastName = '', firstName = '', middleName = '' }) {
  return `${lastName} ${firstName} ${middleName}`.trim()
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = { parseLink, prepareImageUrl, getFullName }
