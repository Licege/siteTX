const fs = require('fs')
const path = require('path')

exports.uploadRawFile = (file, destination) =>
  new Promise((resolve, reject) => {
    const parsedFileName = file.originalname.split('.')
    const ext = parsedFileName.pop() || 'pdf'
    const baseName = parsedFileName.join('.') || 'file'
    const fileName = `${Date.now()}-${baseName}.${ext}`
    const targetPath = path.join(destination, fileName)

    fs.writeFile(targetPath, file.buffer, (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve(path.join('uploads', fileName))
    })
  })
