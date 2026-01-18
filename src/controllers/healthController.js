const { sendErrorResponse } = require('../utils')

const ping = async (req, res) => {
  try {
    res.json({ success: true, message: 'pong' })
  } catch (error) {
    sendErrorResponse(res, 500, error.message)
  }
}

module.exports = { ping }
