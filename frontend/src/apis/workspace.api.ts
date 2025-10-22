import api from "@/lib/api";
import { redirect } from "react-router";

class WorkspaceApi {
  private readonly baseUrl = `/api/workspace`;

  async createWorkspace(name: string, description: string) {
    try {
      const data = await api.post(this.baseUrl, { name, description });
      return data.data;
    } catch (error) {
      console.error("Error creating workspace:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unknown error occurred while creating the workspace");
    }
  }

  async getWorkspaces() {
    try {
      const data = await api.get(this.baseUrl);

      return data.data;
    } catch (error) {
      const err = error as { status: number };
      console.error("Error fetching workspaces:", error);

      if (err.status === 401) {
        return redirect("/auth");
      }

      throw new Error("An unknown error occurred while fetching workspaces");
    }
  }

  async getWorkspace(id: string) {
    try {
      const data = await api.get(`${this.baseUrl}/${id}`);
      return data.data;
    } catch (error) {
      console.error("Error fetching workspace:", error);
      const err = error as { status: number };
      if (err.status === 404) {
        throw new Error("Workspace not found");
      }
      if (err.status === 401) {
        return redirect("/auth");
      }
      throw new Error("An unknown error occurred while fetching workspace");
    }
  }

  async generateWorkspaceInviteLink(workspaceId: string) {
    try {
      const data = await api.get(
        `${this.baseUrl}/${workspaceId}/generate-link`,
      );
      return data.data;
    } catch (error) {
      console.error("Error generating invite link:", error);
      const err = error as {
        response: { data: { message: string }; status: number };
      };
      if (err.response.status === 404) {
        throw new Error(err.response.data.message);
      }
      if (err.response.status === 401) {
        return redirect("/auth");
      }
      throw new Error("An unknown error occurred while generating invite link");
    }
  }

  async inviteMemberToWorkspace(workspaceId: string, email: string) {
    try {
      await api.post(`${this.baseUrl}/${workspaceId}/invite`, { email });
    } catch (error) {
      const err = error as {
        response: { data: { message: string }; status: number };
      };

      console.log("Status ", err.response.status);
      if (err.response.status === 404) {
        throw new Error(err.response.data.message);
      }
      if (err.response.status === 401) {
        return redirect("/auth");
      }

      throw new Error(
        "An unknown error occurred while inviting member to workspace",
      );
    }
  }
}

export default new WorkspaceApi();
