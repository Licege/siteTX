const path = require('path')

const setupWebStreamsPolyfill = () => {
  if (typeof globalThis.ReadableStream !== 'undefined') {
    return
  }

  const {ReadableStream, TransformStream, WritableStream} = require('stream/web')

  globalThis.ReadableStream = ReadableStream
  globalThis.TransformStream = TransformStream
  globalThis.WritableStream = WritableStream
}

setupWebStreamsPolyfill()

const pdfjs = require('pdfjs-dist/build/pdf')

pdfjs.GlobalWorkerOptions.workerSrc = path.join(
  __dirname,
  '../../../node_modules/pdfjs-dist/build/pdf.worker.js'
)

module.exports = pdfjs
