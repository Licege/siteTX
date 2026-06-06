const path = require('path')

const setupWebStreamsPolyfill = () => {
  if (typeof globalThis.ReadableStream !== 'undefined') {
    return
  }

  let streams

  try {
    streams = require('stream/web')
  } catch (error) {
    streams = require('web-streams-polyfill/dist/ponyfill.js')
  }

  globalThis.ReadableStream = streams.ReadableStream
  globalThis.TransformStream = streams.TransformStream
  globalThis.WritableStream = streams.WritableStream
}

setupWebStreamsPolyfill()

const pdfjs = require('pdfjs-dist/build/pdf')

pdfjs.GlobalWorkerOptions.workerSrc = path.join(
  __dirname,
  '../../../node_modules/pdfjs-dist/build/pdf.worker.js'
)

module.exports = pdfjs
