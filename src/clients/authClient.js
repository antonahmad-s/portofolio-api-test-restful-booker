import { httpClient } from "./httpClient.js";

export const authClient = {
  async login(username, password) {
    return httpClient.post("/auth", { username, password }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  }
};
