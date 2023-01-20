import models from '../models';
import createBasicMethods from '../lib/factories/modelFactory';
import { makeNews } from '../entity/news';

const { News: NewsModel } = models;
const News = createBasicMethods(NewsModel)

const newsRepository = {
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

export default newsRepository
