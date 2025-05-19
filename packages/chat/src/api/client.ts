import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_DOCS_API
});

export const fetchClient = {
  request: (url: string, config: RequestInit) =>
    fetch(new URL(url, import.meta.env.VITE_DOCS_API), config),
  post: (url: string, data: unknown, payload: RequestInit) =>
    fetch(new URL(url, import.meta.env.VITE_DOCS_API), {
      ...payload,
      method: "POST",
      body: JSON.stringify(data)
    })
};
