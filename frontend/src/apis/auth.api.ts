class AuthApi {
  private readonly baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

  async registerUser(email: string, username: string, password: string) {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });
      const data = await response.json();
      if (response.ok && data.id) {
        return data;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}

export default new AuthApi();
