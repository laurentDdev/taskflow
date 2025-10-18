import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * This middleware transfers the auth token from an httpOnly cookie
 * to the authorization header.
 */
export default class AuthFromCookieMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.cookie('access_token')

    if (token && !ctx.request.header('authorization')) {
      ctx.request.headers().set('authorization', `Bearer ${token}`)
    }

    await next()
  }
}
