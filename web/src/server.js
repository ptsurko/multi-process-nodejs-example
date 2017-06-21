'use strict'

const koa = require('koa')
const middleware = require('./middleware')
const router = require('./router')
const http = require('http')
const promisify = require('es6-promisify')
const logger = require('winston')
const config = require('./config')

const app = koa();

app.use(middleware.parseQuery({ allowDots: true }))
app.use(router.middleware())

const server = http.createServer(app.callback());

const serverListen = promisify(server.listen, server)
serverListen(config.server.port)
  .then(() => logger.info(`App is listening on port ${config.server.port}`))
  .catch((err) => {
    logger.error('Error happened during server start', err);
    process.exit(1);
  });
