import { apiLogin } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiLogin;

export function login(email, password) {
    return http.post(apiEndpoint + "/Login", { email, password });
}