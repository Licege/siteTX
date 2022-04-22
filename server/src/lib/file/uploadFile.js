const fs = require('fs');
const path = require('path');
const { PassThrough } = require('stream');
const { fileTransformer } = require('./transformer');

function getFileName(file, options) {
  let parsedFileName = file.originalname.split('.');
  let ext = parsedFileName.pop();

  if (options.format) {
    ext = `.${options.format}`;
  }

  return `${Date.now()}-${parsedFileName.join('.')}${ext}`
}

exports.uploadFile = (file, destination, options = {}) => new Promise((resolve, reject) => {
  const fileName = getFileName(file, options);
  const targetPath = `${destination}/${fileName}`;
  const writableStream = fs.createWriteStream(targetPath);

  const stream = fileTransformer(file.buffer, options);
  stream.pipe(writableStream);

  writableStream.on('finish', () => {
    resolve(path.join('uploads', fileName));
  });

  writableStream.on('error', reject);
})

function uploadWithMultiSize() {

}

function eachUpload(file, fileName, destination, stream) {
  return (size) => {
    const fileNameWithSuffix = `${destination}/${fileName}-${size.suffix}`;
    const streamClone = new PassThrough();
    const transformStream = fileTransformer(file.buffer, size);
    const writableStream = fs.createWriteStream(fileName);

    stream.pipe(streamClone);
    
    return new Promise((resolve, reject) => {
      streamClone.pipe(transformStream).pipe(writableStream);

      transformStream.on('error', reason => {
        reject(reason);
      });

      writableStream.on('finish', () => {
        resolve({
          mimetype: file.mimetype,
          fileName: fileNameWithSuffix,
          suffix: size.suffix
        })
      })
    })
  }
}