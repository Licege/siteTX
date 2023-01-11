// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = function (err: any, req: any, res: any, next: any) {
  console.log(err)
  return res.status(401).send({
    message: 'Доступ запрещен.'
  })
}
