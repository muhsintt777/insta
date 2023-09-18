import { http } from "configs/http";

export class ApiService {
  static async login(email: string, password: string) {
    return http.post("auth/login", { email, password });
  }
}
