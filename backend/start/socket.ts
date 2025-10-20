import transmit from '@adonisjs/transmit/services/main'
import { middleware } from '#start/kernel'
import { throttle } from '#start/limiter'

transmit.registerRoutes((route) => {
  // Ensure you are authenticated to register your client
  if (route.getPattern() === '__transmit/events') {
    route.middleware(middleware.auth())
    return
  }

  route.use(throttle)
})

transmit.on('connect', ({ uid, context }) => {
  console.log('User connected', uid)
})

transmit.broadcast('global')
