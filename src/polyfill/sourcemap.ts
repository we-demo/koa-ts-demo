// https://stackoverflow.com/questions/42088007/is-there-source-map-support-for-typescript-in-node-nodemon
require('source-map-support').install()
process.on('unhandledRejection', console.error)
