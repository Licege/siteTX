// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { News: NewsModel } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'createBasi... Remove this comment to see the full error message
const createBasicMethods = require('../lib/factories/modelFactory')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { makeNews } = require('../entity/news')

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'News'.
const News = createBasicMethods(NewsModel)

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  ...News,
  findById: async (
    id: any,
    { transaction = null, attributes = null, paranoid = true } = {}
  ) => {
    const news = await News.findById(id, { transaction, attributes, paranoid })
    return makeNews(news)
  },
  one: async (
    where: any,
    {
      transaction = null,
      attributes = null,
      include = null,
      paranoid = true
    } = {}
  ) => {
    const news = await News.one(where, {
      transaction,
      attributes,
      include,
      paranoid
    })
    return makeNews(news)
  },
  all: async (
    where: any,
    {
      transaction,
      attributes,
      limit,
      offset,
      include,
      group,
      order,
      paranoid
    }: any = {}
  ) => {
    const news = await News.all(where, {
      transaction,
      attributes,
      limit,
      offset,
      include,
      group,
      order,
      paranoid
    })

    return news.map((newsItem: any) => makeNews(newsItem));
  },
  create: async (values: any, transaction: any) => {
    const news = await News.create(values, transaction)
    return makeNews(news)
  }
}
