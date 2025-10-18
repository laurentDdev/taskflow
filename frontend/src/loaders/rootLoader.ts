export const rootLoader = async () => {
  fetch(`${import.meta.env.VITE_API_URL}/auth/@me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};
