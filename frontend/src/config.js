export const baseUrl = "http://localhost:3000";

const token = localStorage.getItem("token");
export const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
};
