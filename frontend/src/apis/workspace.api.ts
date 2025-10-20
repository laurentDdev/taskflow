class WorkspaceApi {
  private readonly baseUrl = `${import.meta.env.VITE_API_URL}/workspace`;

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
}

export default new WorkspaceApi();
