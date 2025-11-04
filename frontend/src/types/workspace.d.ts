export type WorkspaceMember = {
  id: string;
  workspaceId: string;
  workspace: Workspace;
  userId: string;
  user: User;
  role: string;
};

export type Workspace = {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;

  WorkspaceInvite: WorkspaceInvite[];
  WorkspaceMember: WorkspaceMember[];
};

export type WorkspaceInvite = {
  id: string;
  userId: string;
  user: User;
  workspaceId: string;
  workspace: Workspace;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
