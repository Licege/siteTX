export default (req: any, res: any, next: any) => {
  if (req.isAuthenticated() || req.method === 'OPTIONS') {
    return next()
  }
  return res.status(401).end()
}
