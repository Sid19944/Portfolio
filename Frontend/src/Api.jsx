import axios from "axios";
// const url = "https://portfolio-backend-xmod.onrender.com"
const url = "http://localhost:3000"

const userUrl = axios.create({
  baseURL: `${url}/auth/v1/user`,
  withCredentials: true,
});

const projectUrl = axios.create({
  baseURL: `${url}/auth/v1/project`,
  withCredentials: true,
});

const skillUrl = axios.create({
  baseURL: `${url}/auth/v1/skills`,
  withCredentials: true,
});

const timeLineUrl = axios.create({
  baseURL: `${url}/auth/v1/timeline`,
  withCredentials: true,
});

const messageUrl = axios.create({
  baseURL: `${url}/auth/v1/message`,
});

export { userUrl, projectUrl, skillUrl, timeLineUrl, messageUrl };
