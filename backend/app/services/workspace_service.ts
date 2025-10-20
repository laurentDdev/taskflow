import Workspace from '#models/workspace'

export default class WorkspaceService {
  async create(name: string, description: string, userId: number) {
    const workspace = await Workspace.create({
      name: name,
      description: description,
      owner_id: userId,
    })
    await workspace.save()
    return workspace
  }

  async getAll(userId: number) {
    const workspaces = await Workspace.findManyBy('owner_id', userId)

    return workspaces
  }
}
