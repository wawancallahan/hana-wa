const express = require('express')
const routes = express.Router()
const middleware = require('./middleware')
const healthController = require('./controllers/healthController')
const sessionController = require('./controllers/sessionController')
const clientController = require('./controllers/clientController')

/**
 * ================
 * HEALTH ENDPOINTS
 * ================
 */

// API endpoint to check if server is alive
routes.get('/ping', healthController.ping)

/**
 * ================
 * SESSION ENDPOINTS
 * ================
 */
const sessionRouter = express.Router()
routes.use('/session', sessionRouter)

sessionRouter.get('/start/:sessionId', middleware.sessionNameValidation, sessionController.startSession)
sessionRouter.get('/status/:sessionId', middleware.sessionNameValidation, sessionController.statusSession)
sessionRouter.get('/qr/:sessionId', middleware.sessionNameValidation, sessionController.sessionQrCode)
sessionRouter.get('/qr/:sessionId/image', middleware.sessionNameValidation, sessionController.sessionQrCodeImage)
sessionRouter.get('/restart/:sessionId', middleware.sessionNameValidation, sessionController.restartSession)
sessionRouter.get('/terminate/:sessionId', middleware.sessionNameValidation, sessionController.terminateSession)
sessionRouter.get('/terminateInactive', sessionController.terminateInactiveSessions)
sessionRouter.get('/terminateAll', sessionController.terminateAllSessions)

/**
 * ================
 * CLIENT ENDPOINTS
 * ================
 */

const clientRouter = express.Router()

routes.use('/client', clientRouter)
clientRouter.post('/sendMessage/:sessionId', [middleware.sessionNameValidation, middleware.sessionValidation], clientController.sendMessage)
clientRouter.get('/getWWebVersion/:sessionId', [middleware.sessionNameValidation, middleware.sessionValidation], clientController.getWWebVersion)

module.exports = { routes }
