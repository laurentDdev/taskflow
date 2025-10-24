export enum WorkspaceRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type WorkspaceMember = {
  id: string;
  role: WorkspaceRole;
  userId: string;
  workspaceId: string;
};

export type Workspace = {
  id: string;
  name: string;
  description: string;
  logo: string;
  WorkspaceMember: WorkspaceMember[];
};
