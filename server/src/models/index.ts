import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize'
import commonDbConfig from '../../config/database';

const { Op } = Sequelize

const basename = path.basename(module.filename)
type NodeEnv = 'development' | 'production';
const env: NodeEnv = process.env.NODE_ENV as NodeEnv || 'development'
const config = commonDbConfig[env]

if (config === undefined) {
  throw Error(`In src/config/database.js not config with such NODE_ENV: ${env}`)
}

const fileOfModels = fs
  .readdirSync(__dirname)
  .filter(
    (file: any) => file.indexOf('.') !== 0 && file !== basename && ['.js', '.ts'].includes(file.slice(-3))
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
  // @ts-ignore
  if (config.use_env_constiable) {
    // @ts-ignore
    sequelize = new Sequelize.Sequelize(process.env[config.use_env_constiable])
  } else {
    sequelize = new Sequelize.Sequelize(
      config.database,
      config.username,
      config.password,
      // @ts-ignore
      { ...config, operatorsAliases }
    )
  }

  const db: any = {}
  fileOfModels.forEach((file: any) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize

  return db
}

let cachedInitDB: any
const init = () => {
  if (cachedInitDB) return cachedInitDB
  cachedInitDB = initDB()
  return cachedInitDB
}

init();

export default cachedInitDB;
