import { redisOptions } from './redis-options'
import Redis from 'ioredis'

export const redis = new Redis(redisOptions)
