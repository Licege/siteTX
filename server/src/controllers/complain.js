const { sequelize } = require('../models').init()
const ComplainRepo = require('../repositories/complain')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
    try {
        const { limit = 20, offset = 0 } = req.body.pagination;
        const complains = await ComplainRepo.all({},{ limit, offset })

        res.status(200).json(complains)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.get = async function (req, res) {
    try {
        const { id } = req.params
        const complain = await ComplainRepo.findById(id)

        res.status(200).json(complain)
    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.create = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        const {
            typeId,
            name,
            email,
            phone,
            visitDate,
            text
        } = req.body

        const complainToAdd = {
            typeId,
            userId: req.user?.id,
            name,
            email,
            phone,
            visitDate,
            text
        }

        if (!phone) return res.status(409).json({ success: false, msg: 'Phone can not be empty' });

        const complain = await ComplainRepo.create(complainToAdd, transaction)
        await transaction.commit()
        res.status(200).json(complain)
    } catch (error) {
        await transaction.rollback()
        errorHandler(res, error)
    }
}

module.exports.update = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        const { id } = req.params

        const {
            typeId,
            userId,
            name,
            email,
            phone,
            visitDate,
            text
        } = req.body

        const complainToUpdate = {
            typeId,
            userId,
            name,
            email,
            phone,
            visitDate,
            text
        }

        await ComplainRepo.update({ id }, complainToUpdate, transaction)
        await transaction.commit()

        const complain = await ComplainRepo.findById(id)

        res.status(200).json(complain)
    } catch (error) {
        await transaction.rollback()
        errorHandler(res, error)
    }
}

module.exports.remove = async function (req, res) {
    const transaction = await sequelize.transaction()

    try {
        const { id } = req.params

        await ComplainRepo.destroyById(id, transaction)
        await transaction.commit()

        res.status(204).json('Запись успешно удалена.')
    } catch (error) {
        await transaction.rollback()
        errorHandler(res, error)
    }
}