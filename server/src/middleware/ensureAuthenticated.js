module.exports = (req, res, next) => {
  if (req.isAuthenticated() || req.method === 'OPTIONS') {
    return next()
  }
  return res.status(401).end()
}
