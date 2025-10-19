import User from '#models/user'
import env from '#start/env'
import mail from '@adonisjs/mail/services/main'
import { HttpContext } from '@adonisjs/core/http'
import { v4 as uuidv4 } from 'uuid'
import { DateTime } from 'luxon'

export default class AuthController {
  private FRONT_URL: string = env.get('FRONT_URL') as string

  async forgotPassword({ request, response }: HttpContext) {
    try {
      const { email } = request.body()
      const user = await User.findBy('email', email)
      const token = uuidv4()

      if (user) {
        user.reset_token = token
        user.reset_token_expires_at = DateTime.now().plus({ minutes: 15 })
        await user.save()
      }

      await mail.send((message) => {
        message
          .to(email)
          .subject('Reset Password')
          .text(
            `Hello,\n\nYou have requested to reset your password. Please click on the following link to reset your password:\n\n${this.FRONT_URL}/auth/reset-password/${token}\n\nThis link will expire in 15 minutes.\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nYour App Team`
          )
      })

      return response.json({
        message: 'If an account with this email exists, a password reset email has been sent.',
      })
    } catch (error) {
      console.error(error)
      return response.json({
        message: 'If an account with this email exists, a password reset email has been sent.',
      })
    }
  }

  async resetPassword({ request, response, params }: HttpContext) {
    try {
      const { password } = request.body()
      const { token } = params

      const user = await User.query()
        .where('reset_token', token)
        .where('reset_token_expires_at', '>', DateTime.now().toSQL())
        .first()

      if (!user) {
        return response.badRequest({ error: 'Invalid or expired token' })
      }

      user.password = password
      user.reset_token = null
      user.reset_token_expires_at = null
      await user.save()

      return response.ok({ message: 'Password has been reset successfully.' })
    } catch (error) {
      console.error('Error resetting password:', error)
      return response.internalServerError({ error: 'Internal server error' })
    }
  }

  async githubRedirect({ ally }: HttpContext) {
    const github = ally.use('github')
    return github.redirect()
  }

  async githubCallback({ ally, response, auth }: HttpContext) {
    const github = ally.use('github')

    try {
      const githubUser = await github.user()

      const providerId = githubUser.id

      if (!githubUser.email) {
        return response.redirect(`${this.FRONT_URL}/auth?error=email_required`)
      }

      await this.loginBySocial({
        provider: 'github',
        providerId: providerId,
        email: githubUser.email,
        name: githubUser.name,
        avatar: githubUser.avatarUrl,
        response,
        auth,
      })
    } catch (error) {
      return response.redirect(`${this.FRONT_URL}/auth?error=auth_failed`)
    }
  }

  async googleRedirect({ ally }: HttpContext) {
    const google = ally.use('google')
    return google.redirect()
  }

  async googleCallback({ ally, response, auth }: HttpContext) {
    try {
      const google = ally.use('google')
      const googleUser = await google.user()

      const providerId = googleUser.id

      if (!googleUser.email) {
        return response.redirect(`${this.FRONT_URL}/auth?error=email_required`)
      }

      await this.loginBySocial({
        provider: 'google',
        providerId: providerId,
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.avatarUrl,
        response,
        auth,
      })
    } catch (error) {
      return response.redirect(`${this.FRONT_URL}/auth?error=auth_failed`)
    }
  }

  private async loginBySocial({
    provider,
    providerId,
    email,
    name,
    avatar,
    response,
    auth,
  }: {
    provider: 'github' | 'google'
    providerId: string
    email: string
    name: string | null
    avatar: string | null
    response: HttpContext['response']
    auth: HttpContext['auth']
  }) {
    try {
      let user = await User.query().where('email', email).first()

      const providerKey = `${provider}_id` as string

      if (!user) {
        user = await User.create({
          email: email,
          username: name || email.split('@')[0],
          password: uuidv4(),
          avatar: avatar || null,
          provider_auth: provider,
          [providerKey]: providerId,
        })
      } else if (!user.google_id && !user.github_id) {
        provider === 'github' ? (user.github_id = providerId) : (user.google_id = providerId)

        user.provider_auth = user.provider_auth || provider
        await user.save()
      }

      const token = await auth.use('api').createToken(user, ['server:create', 'server:read'], {
        name: `${user.username}_social_login_${Date.now()}`,
        expiresIn: '7 days',
      })

      response.cookie('access_token', token.value?.release(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      return response.redirect(this.FRONT_URL || 'http://localhost:5173')
    } catch (error) {
      console.error('Erreur lors de la connexion sociale:', error.message)
      return response.redirect(`${this.FRONT_URL}/auth?error=internal_server_error`)
    }
  }

  async me({
    auth,
    response,
  }: {
    auth: HttpContext['auth']
    response: HttpContext['response']
    request: HttpContext['request']
  }) {
    const user = await auth.authenticate()

    if (!user) {
      return response.redirect(`${this.FRONT_URL}/auth?error=unauthorized`)
    }

    return response.json({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      provider: user.provider_auth,
    })
  }

  async login({ auth, request, response }: HttpContext) {
    try {
      const { email, password } = request.body()

      const user = await User.findByOrFail('email', email)

      const isValid = await user.verifyPassword(password)

      if (!isValid) {
        return response.badRequest({ error: 'invalid_password' })
      }

      const token = await auth.use('api').createToken(user, ['server:create', 'server:read'], {
        name: `${user.username}_login_${Date.now()}`,
        expiresIn: '7 days',
      })

      response.cookie('access_token', token.value?.release(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      return response.json({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        provider: user.provider_auth,
      })
    } catch (error) {
      console.error('Erreur lors de la connexion:', error.message)
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.notFound({ error: 'email_not_found' })
      }
      return response.internalServerError({ error: 'internal_server_error' })
    }
  }

  async register({ auth, request, response }: HttpContext) {
    try {
      const { email, password, username } = request.body()

      const existingUser = await User.findBy('email', email)

      if (existingUser) {
        return response.badRequest({ error: 'email_already_exists' })
      }

      const newUser = await User.create({
        email,
        password,
        username,
        provider_auth: 'basic',
      })

      const token = await auth.use('api').createToken(newUser, ['server:create', 'server:read'], {
        name: `${newUser.username}_login_${Date.now()}`,
        expiresIn: '7 days',
      })

      response.cookie('access_token', token.value?.release(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      return response.json({
        id: newUser.id,
        username: newUser.username,
        avatar: newUser.avatar || 'none',
        provider: newUser.provider_auth,
      })
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error.message)
      return response.internalServerError({ error: 'internal_server_error' })
    }
  }
}
