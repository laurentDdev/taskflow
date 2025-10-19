export const rootLoader = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/@me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};
