import request from "@/utils/request";

interface LoginData {
  password: string;
  nickname?: string;
  phone?: string;
}

interface IdentifyData {
  id: number;
  role: number; //用户身份：1学生 2教师
}

export const LoginAPI = (data: LoginData) => {
  return request("/login", "POST", data);
};

export const LoginByPhoneAPI = (data: LoginData) => {
  return request("/login/byPhone", "POST", data);
};

export const registerAPI = (data: LoginData) => {
  return request("/register", "POST", data);
};

export const identifyAPI = (data: IdentifyData) => {
  return request("/popup", "POST", data);
};
