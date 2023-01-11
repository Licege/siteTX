// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  jwt: {
    access: {
      expiresIn: 3600,
      type: 'access'
    },
    refresh: {
      expiresIn: 36000,
      type: 'refresh'
    }
  }
}
