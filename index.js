const serverless = require('serverless-http')
const express = require('express')
const api = require('./src/config/api.js')
const get = require('./src/customFields/controller.js')

const app = express()

app.use(express.json())

app.use('/:customFieldId', get)

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Nenhuma informação encontrada! Para usar, passe o ID do campo personalizado na URL, exemplo: https://q39y788rasd.execute-api.us-east-1.amazonaws.com/CF_RerdAEwdrWdEr",
  })
})

module.exports.handler = serverless(app)