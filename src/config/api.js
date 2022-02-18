const axios = require('axios')

const BASE_URL = 'https://api.moskitcrm.com/v2'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 1000000,
  headers: {
    'apiKey': process.env.API_KEY
  }
})

module.exports = api