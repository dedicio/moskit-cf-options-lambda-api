const api = require('../config/api.js')
const { limiterFunction, stringToNumber } = require('../config/utils.js')

class CustomFieldsService {
  #items
  #total
  #size
  #start

  constructor(fieldId) {
    this.fieldId = fieldId
    this.#items = []
    this.#total = 1
    this.#size = 0
    this.#start = 0
  }

  async get() {
    try {
      while (this.#size < this.#total) {
        const {data = [], headers = {}} = await limiterFunction(this.apiGet.bind(this))() || {}
  
        this.#items = [...this.#items, ...data]
        this.#total = stringToNumber(headers['x-moskit-listing-total'])
        this.#size = stringToNumber(headers['x-moskit-listing-start'])
          + stringToNumber(headers['x-moskit-listing-present'])
        this.#start = this.#start + 50
      }
      
      return {
        items: this.#items,
        meta: {
          total: this.#items.length
        }
      }
    } catch (error) {
      console.error(error)
      return {
        error: error
      }
    }
  }

  apiGet() {
    const url = `/customFields/${this.fieldId}/options?sort=label&start=${this.#start}&quantity=50`
    return api.get(url)
  }
}

module.exports = CustomFieldsService