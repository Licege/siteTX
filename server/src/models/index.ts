// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'path'.
const path = require('path')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const Sequelize = require('sequelize')

const { Op } = Sequelize

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
const basename = path.basename(module.filename)
// @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
const env = process.env.NODE_ENV || 'development'
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const config = require('../../config/database.js')[env]

if (config === undefined) {
  throw Error(`In src/config/database.js not config with such NODE_ENV: ${env}`)
}

const fileOfModels = fs
  // @ts-expect-error TS(2304): Cannot find name '__dirname'.
  .readdirSync(__dirname)
  .filter(
    (file: any) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
}

const initDB = () => {
  let sequelize: any
  if (config.use_env_constiable) {
    // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
    sequelize = new Sequelize(process.env[config.use_env_constiable])
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      { ...config, operatorsAliases }
    )
  }

  const db = {}
  fileOfModels.forEach((file: any) => {
    // @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    db[model.name] = model
  })

  Object.keys(db).forEach((modelName) => {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (db[modelName].associate) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      db[modelName].associate(db)
    }
  })

  // @ts-expect-error TS(2339): Property 'sequelize' does not exist on type '{}'.
  db.sequelize = sequelize
  // @ts-expect-error TS(2339): Property 'Sequelize' does not exist on type '{}'.
  db.Sequelize = Sequelize

  return db
}

let cachedInitDB: any
// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.init = () => {
  if (cachedInitDB) return cachedInitDB
  cachedInitDB = initDB()
  return cachedInitDB
}
