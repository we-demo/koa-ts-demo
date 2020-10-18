import Redis from 'ioredis'
import { redisOptions } from './redis-options'

export const redis = new Redis(redisOptions)
