import { http } from "configs/http";
import { GetCurrentUserSchema } from "utils/schema";

export class ApiService {
  static async login(email: string, password: string) {
    await http.post("auth/login", { email, password });
  }

  static async getCurrentUser() {
    try {
      const result = (await http.get("auth/user")).data;

      const user = GetCurrentUserSchema.safeParse(result);
      if (user.success === false) {
        throw { errorMessage: "Server error: Invalidated data received" };
      } else {
        return user.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.errorMessage) {
        throw { errorMessage: err.errorMessage };
      } else {
        throw { errorMessage: "Fetch auth user failed" };
      }
    }
  }
}
