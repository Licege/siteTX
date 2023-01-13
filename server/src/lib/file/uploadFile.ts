import fs from 'fs';
import path from 'path';
import { PassThrough } from 'stream';
import { fileTransformer } from './transformer';

function getFileName(file: any, options: any) {
  let parsedFileName = file.originalname.split('.')
  let ext = parsedFileName.pop()

  if (options.format) {
    ext = `.${options.format}`
  }

  return `${parsedFileName.join('.')}${ext}`

  return `${Date.now()}-${parsedFileName.join('.')}${ext}`
}

export const uploadFile = (file: any, destination: any, options = {}) =>
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
