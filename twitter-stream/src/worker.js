'use strict'

// const trace = require('@risingstack/trace')
const logger = require('winston')
const config = require('./config')
const tortoise = require('./models/tortoise')
const twitter = require('./models/twitter')

const stream = twitter.stream('statuses/filter', { track: config.twitter.track })

stream.on('data', (event) => {
  if (!event || !event.text) {
    logger.warn('Empty text');
    return;
  }

  const mentionsCount = event.text.split('@').length - 1

  const queue = tortoise.QUEUE.tweet
  const message = {
    text: event.text,
    tweeter: event.user.screen_name,
    createdAt: event.created_at
  }

  tortoise
    .queue(queue)
    .publish(message)
    .then(() => {
      logger.debug('New tweet received, published message to queue', {
        queue,
        message
      })
    })
    .catch((err) => {
      logger.error('New tweet received, error happened during message publish to queue', {
        queue,
        err
      })

      throw err
    })
})

stream.on('error', (err) => {
  logger.error('Twitter stream error', err)
  throw err
});

logger.log("starting");
