const service = require('./service.js')

const get = async (req, res) => {
  const { customFieldId } = req.params
  const customFields = new service(customFieldId)
  try {
    const results = await customFields.get()
    return res
      .status(200)
      .send(results)
  } catch (error) {
    return res
      .status(500)
      .send(error)
  }
}

module.exports = get