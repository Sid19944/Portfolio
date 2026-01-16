import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:3000/auth/v1/user",
  withCredentials: true,
});

const skillApi = axios.create({
  baseURL: "http://localhost:3000/auth/v1/skills",
  withCredentials: true,
});

const messageApi = axios.create({
  baseURL: "http://localhost:3000/auth/v1/message",
  withCredentials: true,
});

const projectApi = axios.create({
  baseURL: "http://localhost:3000/auth/v1/project",
  withCredentials: true,
});

const timeLineApi = axios.create({
  baseURL: "http://localhost:3000/auth/v1/timeline",
  withCredentials: true,
});

export { userApi, skillApi, messageApi, projectApi, timeLineApi };
