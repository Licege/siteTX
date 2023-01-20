interface FindAllOptions {
  transaction: any;
  attributes: any,
  limit: any,
  offset: any,
  include: any,
  group: any,
  order: any,
  paranoid: any
}

interface ModelFactory {
  bulkCreate: (values: any, transaction?: any) => any;
  create: (values: any, transaction?: any) => any;
  update: (where: any, values: any, transaction?: any) => any;
  updateAll: (where: any, values: any, transaction?: any) => any;
  findById: (id: any, options?: any) => any;
  one: (where: any, options?: any) => any;
  all: (where?: any, options?: Partial<FindAllOptions>) => any;
  oneAttrId: (where: any, transaction?: any) => any;
  allAttrId: (where: any, transaction?: any) => any;
  oneAttr: (attr: any, where: any, transaction?: any) => any;
  allAttr: (attr: any, where: any, transaction?: any) => any;
  allAttrUnique: (attr: any, where: any, transaction?: any) => any;
  totalUniqueAttr: (attr: any, where: any, transaction?: any) => any;
  toggleAttr: (attr: any, where: any, transaction?: any) => any;
  destroy: (where: any, transaction?: any) => any;
  destroyById: (id: any, transaction?: any) => any;
  isExist: (where: any, transaction?: any) => any;
  total: (where: any, transaction?: any) => any;
  totalOptions: (where: any, transaction?: any) => any;
  createOrUpdate: (where: any, values: any, transaction?: any) => any;
}


const modelFactory = (Model: any): ModelFactory => ({
  bulkCreate: async (values: any, transaction: any) => {
    const collections = await Model.bulkCreate(values, {
      transaction,
      returning: true
    })
    return collections.map((collection: any) => collection.get({ plain: true }));
  },

  create: async (values: any, transaction?: any) => {
    const newObj = await Model.create(values, { transaction, returning: true })
    return newObj.get({ plain: true })
  },

  update: async (where: any, values: any, transaction?: any) => {
    await Model.update(values, { where, transaction, limit: 1 })
    return undefined
  },

  updateAll: async (where: any, values: any, transaction?: any) => {
    await Model.update(values, { where, transaction })
    return undefined
  },

  findById: async (
    id: any,
    {
      transaction = null,
      attributes = null,
      include = null,
      paranoid = true
    } = {}
  ) =>
    await Model.findOne({
      where: { id },
      transaction,
      attributes,
      include,
      exclude: ['password'],
      paranoid,
      nest: true,
      raw: true
    }),

  one: async (
    where: any,
    {
      transaction = null,
      attributes = null,
      include = null,
      paranoid = true
    } = {}
  ) =>
    await Model.findOne({
      where,
      transaction,
      attributes,
      include,
      paranoid,
      nest: true,
      raw: true
    }),

  all: async (
    where: any,
    {
      transaction = null,
      attributes = null,
      limit = null,
      offset = null,
      include = null,
      group = null,
      order = null,
      paranoid = true
    } = {}
  ) =>
    await Model.findAll({
      where,
      transaction,
      attributes,
      limit,
      offset,
      include,
      group,
      order,
      paranoid,
      raw: true,
      nest: true
    }),

  oneAttrId: async (where: any, transaction?: any) => {
    const data = await Model.findOne({ where, attributes: ['id'], transaction })

    if (!data) return null
    return data.id
  },

  allAttrId: async (where: any, transaction?: any) => {
    const colections = await Model.findAll({
      where,
      transaction,
      attributes: ['id'],
      nest: true,
      raw: true
    })

    return colections.map((data: any) => data.id);
  },

  oneAttr: async (attr: any, where: any, transaction?: any) => {
    const data = await Model.findOne({ where, attributes: [attr], transaction })

    if (!data) return null
    return data[attr]
  },

  allAttr: async (attr: any, where: any, transaction?: any) => {
    const colections = await Model.findAll({
      where,
      attributes: [attr],
      transaction
    })

    return colections.map((data: any) => data[attr]);
  },

  allAttrUnique: async (attr: any, where: any, transaction: any) => {
    const groupedValues = await Model.findAll({
      where,
      group: [attr],
      attributes: [attr],
      transaction,
      nest: true,
      raw: true
    })
    return groupedValues.map((value: any) => value[attr]);
  },

  totalUniqueAttr: async (attr: any, where: any, transaction?: any) => {
    const groupedValues = await Model.findAll({
      where,
      group: [attr],
      attributes: [attr],
      transaction,
      nest: true,
      raw: true
    })
    return groupedValues.length
  },

  destroy: async (where: any, transaction?: any, force = false) =>
    await Model.destroy({ where, transaction, force }),

  destroyById: async (id: any, transaction?: any) =>
    await Model.destroy({ where: { id }, transaction }),

  isExist: async (where: any, transaction?: any) =>
    !!(await Model.findOne({ where, transaction, attributes: ['id'] })),

  total: async (where: any, transaction?: any) =>
    await Model.count({ where, transaction }),

  totalOptions: async (where: any, { transaction = null, include = null } = {}) =>
    await Model.count({ where, transaction, include }),

  toggleAttr: async (attr: any, where: any, transaction?: any) => {
    const data = await Model.findOne({ where, attributes: [attr], transaction })

    if (!data) return null
    const value = data[attr]

    await Model.update({ [attr]: !value }, { where, transaction })
    return !value
  },

  createOrUpdate: async ({
    where,
    values,
    transaction
  }: any) => {
    // @ts-ignore
    const data = await this.one({ where }, { transaction })

    if (!data) {
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      return this.create(values, transaction)
    }

    // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
    return this.update(where, values, transaction)
  }
})

export default modelFactory;
