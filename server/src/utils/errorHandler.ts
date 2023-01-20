export default (res: any, error: any, code = 500) => {
  console.log(error)
  res.status(code).json({
    success: false,
    message: error.message ?? error // TODO не забыть заменить на "Something broke" после ввода системы логирования
  })
}
