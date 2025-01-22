import request from "@/utils/request";

interface LoginData {
  username: string;
  password: string;
}

interface IdentifyData {
  id: number;
  role: number; //用户身份：1学生 2教师
}

export const LoginAPI = (data: LoginData) => {
  return request("/login", "POST", data);
};

export const registerAPI = (data: LoginData) => {
  return request("/register", "POST", data);
};

export const identifyAPI = (data: IdentifyData) => {
  return request("/register", "POST", data);
};
