import request from "@/utils/request";

interface LoginData {
  username: string;
  password: string;
}

export const LoginAPI = (data: LoginData) => {
  return request("/login", "POST", data);
};
