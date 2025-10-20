import type { AuthUser } from "@/types/AuthUser";

let userPromise: Promise<AuthUser | null> | null = null;

export const getUser = () => {
  if (userPromise) {
    return userPromise;
  }
  userPromise = fetch(`${import.meta.env.VITE_API_URL}/auth/@me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        return null;
      }
      return response.json() as Promise<AuthUser>;
    })
    .catch(() => {
      return null;
    });
  return userPromise;
};

export const clearUserCache = () => {
  userPromise = null;
};

class AuthApi {
  private readonly baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

  async logoutUser() {
    try {
      const response = await fetch(`${this.baseUrl}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || "Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      if (error instanceof Error) throw error;
      throw new Error("An unknown error occurred during logout");
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
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }
      return data;
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error instanceof Error) throw error;
      throw new Error("An unknown error occurred while resetting password");
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
      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset password email");
      }
      return data;
    } catch (error) {
      console.error("Error sending reset password email:", error);
      if (error instanceof Error) throw error;
      throw new Error(
        "An unknown error occurred while sending reset password email",
      );
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
      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }
      return data;
    } catch (error) {
      console.error("Error registering user:", error);
      if (error instanceof Error) throw error;
      throw new Error("An unknown error occurred during registration");
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
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }
      return data;
    } catch (error) {
      console.error("Error logging in:", error);
      if (error instanceof Error) throw error;
      throw new Error("An unknown error occurred during login");
    }
  }
}

export default new AuthApi();
