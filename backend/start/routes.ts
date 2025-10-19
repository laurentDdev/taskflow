/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.use([() => import('#middleware/token_from_cookie_middleware')])

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/github/redirect', '#controllers/auth_controller.githubRedirect')

router.get('/google/redirect', '#controllers/auth_controller.googleRedirect')

router
  .group(() => {
    router.get('/google/callback', '#controllers/auth_controller.googleCallback')
    router.get('/github/callback', '#controllers/auth_controller.githubCallback')
    router.post('/register', '#controllers/auth_controller.register')
    router.post('/login', '#controllers/auth_controller.login')
    router.post('/forgot-password', '#controllers/auth_controller.forgotPassword')
    router.post('/reset-password/:token', '#controllers/auth_controller.resetPassword')
    router.post('/logout', '#controllers/auth_controller.logout')
    router.get('/@me', '#controllers/auth_controller.me')
  })
  .prefix('/auth')
