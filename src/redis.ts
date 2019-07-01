import * as Redis from 'ioredis'

let host = process.env.REDIS_HOST || 'localhost'

export const redis = new Redis({ host })
