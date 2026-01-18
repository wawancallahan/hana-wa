const { rateLimitMax, rateLimitWindowMs } = require('./config')
const { sendErrorResponse } = require('./utils')
const { validateSession } = require('./sessions')
const rateLimiting = require('express-rate-limit')


const sessionNameValidation = async (req, res, next) => {
  /*
    #swagger.parameters['sessionId'] = {
      in: 'path',
      description: 'Unique identifier for the session (alphanumeric and - allowed)',
      required: true,
      type: 'string',
      example: 'f8377d8d-a589-4242-9ba6-9486a04ef80c'
    }
  */
  if ((!/^[\w-]+$/.test(req.params.sessionId))) {
    /* #swagger.responses[422] = {
        description: "Unprocessable Entity.",
        content: {
          "application/json": {
            schema: { "$ref": "#/definitions/ErrorResponse" }
          }
        }
      }
    */
    return sendErrorResponse(res, 422, 'Session should be alphanumerical or -')
  }
  next()
}

const sessionValidation = async (req, res, next) => {
  const validation = await validateSession(req.params.sessionId)
  if (validation.success !== true) {
    /* #swagger.responses[404] = {
        description: "Not Found.",
        content: {
          "application/json": {
            schema: { "$ref": "#/definitions/NotFoundResponse" }
          }
        }
      }
    */
    return sendErrorResponse(res, 404, validation.message)
  }
  next()
}

const rateLimiter = rateLimiting({
  max: rateLimitMax,
  windowMs: rateLimitWindowMs,
  message: "You can't make any more requests at the moment. Try again later"
})

module.exports = {
  sessionValidation,
  sessionNameValidation,
  rateLimiter
}
