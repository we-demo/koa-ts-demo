// https://stackoverflow.com/questions/42088007/is-there-source-map-support-for-typescript-in-node-nodemon
import { install } from 'source-map-support'

install()

process.on('unhandledRejection', console.error)
