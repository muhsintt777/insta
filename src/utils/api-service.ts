import { http } from "configs/http";
import { GetCurrentUserSchema } from "./schema";

export class ApiService {
  static async login(email: string, password: string) {
    await http.post("auth/login", { email, password });
  }

  static async getCurrentUser() {
    try {
      const result = (await http.get("auth/user", { withCredentials: true }))
        .data;

      const user = GetCurrentUserSchema.safeParse(result);
      if (user.success === false) {
        throw { errorMessage: "Server error: Invalidated data received" };
      } else {
        return user;
      }
    } catch (err: any) {
      if (err.errorMessage) {
        throw { errorMessage: err.errorMessage };
      } else {
        throw { errorMessage: "Fetch auth user failed" };
      }
    }
  }
}
