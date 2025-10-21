class WorkspaceApi {
  private readonly baseUrl = `${import.meta.env.VITE_API_URL}/api/workspace`;

  async createWorkspace(name: string, description: string) {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create workspace");
      }
      return data;
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
      const response = await fetch(`${this.baseUrl}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch workspaces");
      }
      return data;
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unknown error occurred while fetching workspaces");
    }
  }

  async getWorkspace(id: string) {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        return null;
      }
      const text = await response.text();
      if (!text) {
        return null;
      }
      const data = JSON.parse(text);
      return data;
    } catch (error) {
      console.error("Error fetching workspace:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unknown error occurred while fetching workspace");
    }
  }
}

export default new WorkspaceApi();
