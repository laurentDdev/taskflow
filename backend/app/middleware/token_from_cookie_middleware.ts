import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class TokenFromCookieMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    const token = request.cookie('access_token')

    if (token && !request.header('authorization')) {
      request.request.headers['authorization'] = `Bearer ${token}`
    }

    await next()
  }
}
