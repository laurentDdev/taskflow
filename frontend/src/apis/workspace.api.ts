import { api } from "./index.ts";

class WorkspaceApi {
  private baseURL: string = "/api/workspace";

  async findAll() {
    const response = await api.get(`${this.baseURL}`);
    return response.data;
  }

  async findById(id: string) {
    const response = await api.get(`${this.baseURL}/${id}`);
    return response.data;
  }

  async create(name: string, description: string) {
    const response = await api.post(`${this.baseURL}`, {
      name,
      description,
    });
    return response.data;
  }
}

export default new WorkspaceApi();
