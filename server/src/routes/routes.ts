// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'router'.
const router = require('express').Router()
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'passport'.
const passport = require('passport')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { check } = require('express-validator')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const adminAuthFailed = require('../utils/adminAuthFailed')

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'upload'.
const upload = require('../middleware/upload')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const uploadPDF = require('../middleware/uploadPDF')

// const admin = require('../controllers/admin')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'auth'.
const auth = require('../controllers/auth')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const categories = require('../controllers/categories')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const contacts = require('../controllers/contacts')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const menu = require('../controllers/dish')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const news = require('../controllers/news')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const orders = require('../controllers/orders')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const promo = require('../controllers/promo')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const reviews = require('../controllers/reviews')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const users = require('../controllers/users')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const vacancies = require('../controllers/vacancies')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const delivery = require('../controllers/delivery')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const commonDeliverySettings = require('../controllers/deliveryCommonSettings')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const globalDeliverySettings = require('../controllers/deliveryGlobalSettings')
// const averageChecks = require('../../controllersMongo/Statistics/averageChecks');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const profile = require('../controllers/profile')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const complain = require('../controllers/complain')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const complainType = require('../controllers/complainType')
// const files = require('../../controllersMongo/file')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const menuGallery = require('../controllers/menuGallery')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const staffPositions = require('../controllers/staffPositions')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const employees = require('../controllers/employees')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { testUploadFiles } = require('../controllers/files')

const PRIVATE = '/api/private'
const PUBLIC = '/api/public'

// @ts-expect-error TS(2580): Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = (io: any) => {
  // router
  //     .get('/api/private/admin', passport.authenticate('admin-jwt', {
  //         session: false,
  //         failWithError: true
  //     }), admin.getAll, adminAuthFailed)
  //     .post('/api/private/admin/:id', passport.authenticate('admin-jwt', {
  //         session: false,
  //         failWithError: true
  //     }), admin.create, adminAuthFailed)
  //     .delete('/api/private/admin/:id', passport.authenticate('admin-jwt', {
  //         session: false,
  //         failWithError: true
  //     }), admin.remove, adminAuthFailed)

  router.post('/api/public/test-file', upload.single('image'), testUploadFiles)

  router.get('api/public/test', (req: any, res: any) => {
    res.status(200).json({ success: true })
  })

  router
    .get('/api/private/categories', categories.getAll)
    .get('/api/private/categories/:id', categories.get)
    .post('/api/private/categories', categories.create)
    .patch('/api/private/categories/:id', categories.update)
    .delete('/api/private/categories/:id', categories.remove)

  router
    .get('/api/private/contacts', contacts.get)
    .patch('/api/private/contacts/:id', contacts.update)

  router
    .get('/api/private/menu', menu.getAll)
    .get('/api/private/menu/:category', menu.getByCategory)
    .get('/api/private/menu/dish/:id', menu.getById)
    .delete('/api/private/menu/:id', menu.remove)
    .post('/api/private/menu', upload.single('image'), menu.create)
    .patch('/api/private/menu/:id', upload.single('image'), menu.update)
  // .post('/api/private/menu/:id', passport.authenticate('admin-jwt', {
  //     session: false,
  //     failWithError: true
  // }), uploadPDF.single('file'), menu.uploadPdf, adminAuthFailed)

  router
    .get('/api/private/news', news.getAll)
    .get('/api/private/news/:id', news.getById)
    .post('/api/private/news', upload.single('image'), news.create)
    .patch('/api/private/news/:id', upload.single('image'), news.update)
    .delete('/api/private/news/:id', news.delete)

  router
    .get('/api/private/orders', orders.getAll)
    .get('/api/private/orders/:id', orders.getById)
    .patch('/api/private/orders/:id', orders.update)
    .delete('/api/private/orders/:id', orders.remove)

  router
    .get('/api/private/promos', promo.getAll)
    .get('/api/private/promos/:id', promo.getById)
    .post('/api/private/promos', upload.single('image'), promo.create)
    .patch('/api/private/promos/:id', upload.single('image'), promo.update)
    .delete('/api/private/promos/:id', promo.remove)

  router
    .get('/api/private/reviews', reviews.getAll)
    .get('/api/private/reviews/:id', reviews.getById)
    .post('/api/private/reviews', reviews.create)
    .patch('/api/private/reviews/:id', reviews.update)
    .delete('/api/private/reviews/:id', reviews.remove)

  router
    .get('/api/private/users', users.getAll)
    .get('/api/private/users/:id', users.getById)
    .patch('/api/private/users/:id', users.update)

  router
    .get('/api/private/vacancies', vacancies.getAll)
    .get('/api/private/vacancies/:id', vacancies.getById)
    .post('/api/private/vacancies', upload.single('image'), vacancies.create)
    .patch('/api/private/vacancies/:id', vacancies.update)
    .delete('/api/private/vacancies/:id', vacancies.remove)

  router
    .get('/api/private/delivery', delivery.getAll)
    .get('/api/private/delivery/:id', delivery.getById)
    .patch('/api/private/delivery/:id', delivery.update)

  router
    .get(
      '/api/private/delivery-settings/common/',
      commonDeliverySettings.getAll
    )
    .get(
      '/api/private/delivery-settings/common/:id',
      commonDeliverySettings.getById
    )
    .post(
      '/api/private/delivery-settings/common/',
      commonDeliverySettings.create
    )
    .patch(
      '/api/private/delivery-settings/common/:id',
      commonDeliverySettings.update
    )

  router
    .get('/api/private/delivery-settings/global/', globalDeliverySettings.get)
    .patch(
      '/api/private/delivery-settings/global/:id',
      globalDeliverySettings.update
    )

  // router.get('/api/private/statistics/average-checks', averageChecks.get);

  /* Public */

  router.post('/api/public/delivery', delivery.create)

  router
    .get('/api/public/delivery-settings/common', commonDeliverySettings.getAll)
    .get(
      '/api/public/delivery-settings/common/:id',
      commonDeliverySettings.getById
    )

  router.get('/api/public/delivery-settings/global', globalDeliverySettings.get)

  router
    //   .post('/api/public/auth/login',
    //     [
    //       check('email', 'Некорректный email').isEmail(),
    //       check('password', 'Минимальная длина пароля 8 символов')
    //         .isLength({min: 8})
    //     ],
    //     auth.login)
    .post('/api/public/auth/registration', auth.register)
  // .post('/api/public/auth/refresh-token', auth.refreshTokens);

  router
    .get('/api/public/categories', categories.getAll)
    .get('/api/public/categories/:id', categories.get)

  router.get('/api/public/contacts', contacts.get)

  router
    .get('/api/public/menu', menu.getAll)
    .get('/api/public/menu/:category', menu.getByCategory)
    .get('/api/public/menu/dish/:id', menu.getById)

  router
    .get('/api/public/news', news.getAll)
    .get('/api/public/news/:id', news.getById)

  router.post('/api/public/orders', orders.create)

  router
    .get('/api/public/me', profile.getMe)
    .get('/api/public/me/orders', profile.getMyOrders)
    .put('/api/public/me', profile.updateMe)

  router
    .get('/api/public/promos', promo.getAll)
    .get('/api/public/promos/:id', promo.getById)

  router
    .get('/api/public/reviews', reviews.publicGetAll)
    .get('/api/public/reviews/:id', reviews.getById)
    .post('/api/public/reviews', reviews.create)
    .patch('/api/public/reviews/:id', reviews.update)
    .delete('/api/public/reviews/:id', reviews.remove)

  router
    .get('/api/public/vacancies', vacancies.getAll)
    .get('/api/public/vacancies/:id', vacancies.getById)

  router.get('/api/public/complain-types', complainType.getAll)

  router
    .post('/api/private/complains', complain.getAll)
    .get('/api/private/complain/:id', complain.get)
    .post('/api/private/complain', complain.create)
    .post('/api/public/complain', complain.create)
    .patch('/api/private/complain/:id', complain.update)
    .delete('/api/private/complain/:id', complain.remove)

  // router.post('/', upload.array('files', 25), files.uploadFile)

  router
    .get('/api/private/menu/gallery', menuGallery.getAllMenu)
    .get('/api/private/bar/gallery', menuGallery.getAllBar)
    .post(
      '/api/private/menu/gallery',
      upload.array('files', 10),
      menuGallery.createOrUpdateMenu
    )
    .post(
      '/api/private/bar/gallery',
      upload.array('files', 10),
      menuGallery.createOrUpdateBar
    )

  router
    .get(`${PRIVATE}/staff-positions`, staffPositions.findAll)
    .get(`${PRIVATE}/staff-positions/:id`, staffPositions.findById)
    .post(`${PRIVATE}/staff-positions`, staffPositions.create)
    .patch(`${PRIVATE}/staff-positions/:id`, staffPositions.update)
    .delete(`${PRIVATE}/staff-positions/:id`, staffPositions.destroy)

  router
    .post(`${PRIVATE}/employees/list`, employees.getAll)
    .post(`${PRIVATE}/employees`, upload.single('image'), employees.create)
    .patch(`${PRIVATE}/employees/:id`, upload.single('image'), employees.update)
    .delete(`${PRIVATE}/employees/:id`, employees.remove)

  router
    .get(`${PUBLIC}/tips/employees`, employees.getAllForTips)
    .get(`${PUBLIC}/tips/employees/:id`, employees.getOneForTips)

  return router
}
