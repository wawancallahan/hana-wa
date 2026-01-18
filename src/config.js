// Load environment variables from .env file
require('dotenv').config()

// setup global const
const sessionFolderPath = process.env.SESSIONS_PATH || './sessions'
const webVersion = process.env.WEB_VERSION
const webVersionCacheType = process.env.WEB_VERSION_CACHE_TYPE || 'none'
const rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX || 1000)
const rateLimitWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || 1000)
const recoverSessions = (process.env.RECOVER_SESSIONS || '').toLowerCase() === 'true'

module.exports = {
  sessionFolderPath,
  webVersion,
  webVersionCacheType,
  rateLimitMax,
  rateLimitWindowMs,
  recoverSessions,
}
