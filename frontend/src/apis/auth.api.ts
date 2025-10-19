class AuthApi {
  private readonly baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

  async logoutUser() {
    try {
      await fetch(`${this.baseUrl}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      const err = error as { response: { data: { message: string } } };
      throw new Error(err.response.data.message);
    }
  }

  async resetPassword(token: string, password: string) {
    try {
      const response = await fetch(`${this.baseUrl}/reset-password/${token}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (response.ok && data.message) {
        return data;
      }
    } catch (error) {
      const err = error as { response: { data: { message: string } } };
      throw new Error(err.response.data.message);
    }
  }

  async sendResetPasswordEmail(email: string) {
    try {
      const response = await fetch(`${this.baseUrl}/forgot-password`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.message) {
        return data;
      }
    } catch (error) {
      const err = error as { response: { data: { message: string } } };
      throw new Error(err.response.data.message);
    }
  }

  async registerUser(email: string, username: string, password: string) {
    try {
      const response = await fetch(`${this.baseUrl}/register`, {
        method: "POST",
        credentials: "include",
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
      const err = error as { response: { data: { message: string } } };
      throw new Error(err.response.data.message);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log("Data received:", data);
      if (response.ok) {
        return data;
      }
    } catch (error) {
      const err = error as { response: { data: { message: string } } };
      throw new Error(err.response.data.message);
    }
  }
}

export default new AuthApi();
