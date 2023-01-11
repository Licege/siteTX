// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { PassThrough } = require('stream')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { fileTransformer } = require('./transformer')

function getFileName(file: any, options: any) {
  let parsedFileName = file.originalname.split('.')
  let ext = parsedFileName.pop()

  if (options.format) {
    ext = `.${options.format}`
  }

  return `${parsedFileName.join('.')}${ext}`

  return `${Date.now()}-${parsedFileName.join('.')}${ext}`
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.uploadFile = (file: any, destination: any, options = {}) =>
  // @ts-expect-error TS(2585): 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
  new Promise((resolve: any, reject: any) => {
    const fileName = getFileName(file, options)
    const targetPath = `${destination}/${fileName}`
    const writableStream = fs.createWriteStream(targetPath)

    const stream = fileTransformer(file.buffer, options)
    stream.pipe(writableStream)

    writableStream.on('finish', () => {
      resolve(path.join('uploads', fileName))
    })

    writableStream.on('error', reject)
  })

function uploadWithMultiSize() {}

function eachUpload(file: any, fileName: any, destination: any, stream: any) {
  return (size: any) => {
    const fileNameWithSuffix = `${destination}/${fileName}-${size.suffix}`
    const streamClone = new PassThrough()
    const transformStream = fileTransformer(file.buffer, size)
    const writableStream = fs.createWriteStream(fileName)

    stream.pipe(streamClone)

    // @ts-expect-error TS(2585): 'Promise' only refers to a type, but is being used... Remove this comment to see the full error message
    return new Promise((resolve: any, reject: any) => {
      streamClone.pipe(transformStream).pipe(writableStream)

      transformStream.on('error', (reason: any) => {
        reject(reason)
      })

      writableStream.on('finish', () => {
        resolve({
          mimetype: file.mimetype,
          fileName: fileNameWithSuffix,
          suffix: size.suffix
        })
      })
    });
  };
}
