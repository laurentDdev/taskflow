import type { HttpContext } from '@adonisjs/core/http'

import WorkspaceService from '#services/workspace_service'
import { inject } from '@adonisjs/core'

@inject()
export default class WorkspacesController {
  constructor(protected workspaceService: WorkspaceService) {}

  async create({ request, response, auth }: HttpContext) {
    try {
      const { name, description } = request.body()
      const userId = auth.user?.id
      const workspace = await this.workspaceService.create(name, description, userId!)
      return response.json(workspace)
    } catch (error) {
      return response.badRequest('Failed to create workspace')
    }
  }

  async getAll({ response, auth }: HttpContext) {
    try {
      const userId = auth.user?.id
      const workspaces = await this.workspaceService.getAll(userId!)

      return response.json(workspaces)
    } catch (error) {
      return response.badRequest('Failed to fetch workspaces')
    }
  }
}
