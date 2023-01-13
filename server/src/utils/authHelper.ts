import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import models from '../models';
import TokenRepo from '../repositories/token';
import { jwtTokens } from '../../config/options';
import * as secret from '../../config/keys';

const { sequelize } = models;

export const generateAccessToken = async (userId: any) => {
  const payload = {
    userId,
    type: jwtTokens.access.type
  }

  // const isAdmin = await Admin.findOne({user_id: userId})
  // if (isAdmin) {
  //     payload.role = 'admin'
  // }

  return jwt.sign(payload, secret.jwt, { expiresIn: jwtTokens.access.expiresIn })
}

export const generateRefreshToken = () => {
  const payload = {
    id: v4(),
    type: jwtTokens.refresh.type
  }

  return {
    id: payload.id,
    token: jwt.sign(payload, secret.jwt, {
      expiresIn: jwtTokens.refresh.expiresIn
    })
  }
}

export const replaceRefreshToken = async (tokenId: any, userId: any) => {
  const transaction = await sequelize.transaction()
  try {
    await TokenRepo.destroyById(userId, transaction)
    await TokenRepo.create({ tokenId, userId }, transaction)
    await transaction.commit()
  } catch (e) {
    await transaction.rollback()
  }
}
