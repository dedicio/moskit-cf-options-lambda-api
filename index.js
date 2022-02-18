const serverless = require('serverless-http')
const express = require('express')
const api = require('./src/config/api.js')
const get = require('./src/customFields/controller.js')

const app = express()

app.use(express.json())

app.use('/:customFieldId', get)

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  })
})

module.exports.handler = serverless(app)