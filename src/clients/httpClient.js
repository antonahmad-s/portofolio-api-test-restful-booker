import axios from "axios";
import { config } from "../config/env.js";

export const httpClient = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  headers: {
    Accept: "application/json"
  },
  validateStatus: () => true
});
