// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'jwt'.
const jwt = require('jsonwebtoken')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { v4 } = require('uuid')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'sequelize'... Remove this comment to see the full error message
const { sequelize } = require('../models').init()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'TokenRepo'... Remove this comment to see the full error message
const TokenRepo = require('../repositories/token')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const tokens = require('../../config/options').jwt
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const secret = require('../../config/keys')

const generateAccessToken = async (userId: any) => {
  const payload = {
    userId,
    type: tokens.access.type
  }

  // const isAdmin = await Admin.findOne({user_id: userId})
  // if (isAdmin) {
  //     payload.role = 'admin'
  // }

  return jwt.sign(payload, secret.jwt, { expiresIn: tokens.access.expiresIn })
}

const generateRefreshToken = () => {
  const payload = {
    id: v4(),
    type: tokens.refresh.type
  }

  return {
    id: payload.id,
    token: jwt.sign(payload, secret.jwt, {
      expiresIn: tokens.refresh.expiresIn
    })
  }
}

// @ts-expect-error TS(2705): An async function or method in ES5/ES3 requires th... Remove this comment to see the full error message
const replaceRefreshToken = async (tokenId: any, userId: any) => {
  const transaction = await sequelize.transaction()
  try {
    await TokenRepo.destroyById(userId, transaction)
    await TokenRepo.create({ tokenId, userId }, transaction)
    await transaction.commit()
  } catch (e) {
    await transaction.rollback()
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceRefreshToken
}
