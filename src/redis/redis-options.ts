const host = process.env.REDIS_HOST || '127.0.0.1'
const port = +process.env.REDIS_PORT || 6379
const db = +process.env.REDIS_DB || 0

// todo config loader library
export const redisOptions = { host, port, db }
