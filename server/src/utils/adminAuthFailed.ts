export default function (err: any, req: any, res: any, next: any) {
  console.log(err)
  return res.status(401).send({
    message: 'Доступ запрещен.'
  })
}
