// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (req: any, res: any, next: any) => {
  if (req.isAuthenticated() || req.method === 'OPTIONS') {
    return next()
  }
  return res.status(401).end()
}
