// src/apis/configs/axiosConfigs.js

import axios from "axios"

import { BASE_URL } from "../apiConstants";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  // headers: { 'Access-Control-Allow-Credentials': 'true' }
})

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error)
  }

  return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
})


