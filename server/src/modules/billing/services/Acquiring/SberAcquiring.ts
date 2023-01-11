// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const axios = require('axios')
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const qs = require('fast-querystring')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'SberError'... Remove this comment to see the full error message
const { SberError } = require('./SberError.js')

// https://securepayments.sberbank.ru/wiki/doku.php/integration:api:start#%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D1%84%D0%B5%D0%B9%D1%81_rest

const TEST_ENTRY = 'https://3dsec.sberbank.ru/payment/rest/'
const ENTRY = 'https://securepayments.sberbank.ru/payment/rest/'

const SBER_ERRORS = {
  NO_SUCH_ORDER_ID: 6
}

const ACTIONS = {
  register: 'register.do', // создание нового заказа
  getOrderStatusExtended: 'getOrderStatusExtended.do', // получение статуса заказа
  refund: 'refund.do', // возврат средств оплаты заказа
  getBindings: 'getBindings.do', // получение списка всех связок клиента
  unBindCard: 'unBindCard.do' // деактивация связки
}

function parse(response: any) {
  const { status } = response

  if (status === 200) {
    const { data } = response

    if (parseInt(data.errorCode)) {
      throw new SberError(data)
    }

    return data
  } else {
    throw new Error(`HTTP error ${status}`)
  }
}

/**
 * @typedef {object} Credentials
 * @property {string} userName - username
 * @property {string} password - password
 */

class SberAcquiring {
  creadentials: any;
  entry: any;
  failUrl: any;
  successUrl: any;
  /**
   * @param {object} params
   * @param {Credential} params.credentials
   * @param {string} params.successUrl URL-адрес, на который будет перенаправлен плательщик в случае успешного платежа;
   * @param {string} params.failUrl URL-адрес, на который будет перенаправлен плательщик в случае неуспешного платежа;
   * @param {boolean} params.test - использовать ли тестовое окружение
   */
  constructor({
    credentials,
    successUrl,
    failUrl,
    test = false
  }: any) {
    this.successUrl = successUrl
    this.failUrl = failUrl
    this.creadentials = credentials
    this.entry = test ? TEST_ENTRY : ENTRY
  }

  // TODO в будущем возможно получать callback об изменении статуса оплаты https://securepayments.sberbank.ru/wiki/doku.php/integration:api:callback:start
  /**
   * Создание нового заказа
   * @param {string} orderNumber
   * @param {number} amount
   * @param {string} description
   * @param {object} otherParams
   * @returns {{
   *   orderId,
   *   formUrl
   * }}
   */
  async register(orderNumber: any, amount: any, description = '', otherParams = {}) {
    const data = this.#buildData({
      ...otherParams,
      orderNumber,
      amount: Math.round(amount * 100),
      description,
      successUrl: this.successUrl.replace(/{order}/g, orderNumber),
      failUrl: this.failUrl.replace(/{order}/g, orderNumber)
    })

    const response = await this.#POST(ACTIONS.register, data)
    return parse(response)
  }

  /**
   * Checking if order exists and getting its status
   * Provide only one value - for orderId OR for orderNumber
   * @param {string|null} orderId
   * @param {string|null} orderNumber
   * @returns {Promise<number|null>} status of the order or null unless it exists
   * может вернуть 0 - заказ создан, но не оплачен, будьте осторожны при сравнении null и 0
   */
  async status(orderId: any, orderNumber = null) {
    try {
      const response = await this.getOrderInfo(orderId, orderNumber)
      return response.orderStatus
    } catch (error) {
      // @ts-expect-error TS(2571): Object is of type 'unknown'.
      if (parseInt(error.sberErrorCode) === SBER_ERRORS.NO_SUCH_ORDER_ID) {
        return null
      }

      throw error
    }
  }

  /**
   * Получение статуса заказа
   * Provide only one value - for orderId OR for orderNumber
   * @param {string|null} orderId
   * @param {string|null} orderNumber
   * @returns {Promise<object>} response
   */
  async getOrderInfo(orderId: any, orderNumber = null) {
    const data = this.#buildData(orderId ? { orderId } : { orderNumber })
    const response = await this.#POST(ACTIONS.getOrderStatusExtended, data)
    return parse(response)
  }

  /**
   * Возврат средств оплаты заказа
   * @param {string} orderId Номер заказа в платежной системе.
   * @param {number} amount Сумма платежа (500.23). 0 для возврата на всю сумму.
   * @param {object|null} otherParams Дополнительные параметры запроса.
   * @returns {Promise<object>} response
   */
  async refund(orderId: any, amount: any, otherParams = null) {
    const params = {
      orderId,
      amount: Math.round(amount * 100)
    }

    if (otherParams) {
      // @ts-expect-error TS(2339): Property 'jsonParams' does not exist on type '{ or... Remove this comment to see the full error message
      params.jsonParams = JSON.stringify(otherParams)
    }

    const data = this.#buildData(params)
    const response = await this.#POST(ACTIONS.refund, data)
    return parse(response)
  }

  /**
   * Запрос списка всех связок клиента
   * @param {string} clientId Номер (идентификатор) клиента в системе магазина.
   * @param {"C"|"I"|"R"|"CR"|undefined} bindingType Тип связки.
   * @param {string|undefined} bindingId Идентификатор связки.
   * @returns {Promise<object>} response
   */
  async getBindings(clientId: any, bindingType = 'C', bindingId: any) {
    const params = {
      clientId,
      bindingType,
      bindingId
    }

    const data = this.#buildData(params)
    const response = await this.#POST(ACTIONS.getBindings, data)
    return parse(response)
  }

  /**
   * Запрос деактивации связки
   * @param {string} bindingId Идентификатор связки.
   * @returns {Promise<object>} response
   */
  async unBindCard(bindingId: any) {
    const data = this.#buildData({ bindingId })
    const response = await this.#POST(ACTIONS.unBindCard, data)
    return parse(response)
  }

  // TODO перенести отсюда в lib
  // @ts-expect-error TS(18028): Private identifiers are only available when target... Remove this comment to see the full error message
  async #POST(action: any, data: any) {
    return axios.post(this.entry + action, qs.stringify(data))
  }

  /**
   * Add technical parameters to data
   */
  // @ts-expect-error TS(18028): Private identifiers are only available when target... Remove this comment to see the full error message
  #buildData(params = {}) {
    return { ...params, ...this.creadentials }
  }
}

// // FOR TEST ONLY!
// (async () => {
//   const ac = new SberAcquiring({ credentials: {}, successUrl: '', failUrl: '', test: true });
//   await ac.register();
// })()

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.SberAcquiring = SberAcquiring
