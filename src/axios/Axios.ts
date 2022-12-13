import axios from "axios";

export const getAxiosInstance = (
  config = {
    headers: { contentType: "application/json" },
  }
) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
      "Content-Type": config.headers.contentType || "application/json",
    },
  });

  return instance;
};

export default getAxiosInstance();
