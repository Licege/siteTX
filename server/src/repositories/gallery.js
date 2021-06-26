const { Gallery: GalleryModel } = require('../models').init()
const createBasicMethods = require('../lib/factories/modelFactory')

const Gallery = createBasicMethods(GalleryModel)

module.exports = {
    ...Gallery
}