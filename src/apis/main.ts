import request from "../utils/request";

interface searchData {
  classification: string;
  grade: string;
  courseTime: Array<number>;
  sellNum: Array<number>;
  username: string;
  nickname: string;
}

interface pwdData {
  id: number;
  password: string;
}

interface buyCourseData {
  id: number;
  courseId: number;
}

export const getMainPageDataAPI = () => {
  return request("/home/list_course", "GET");
};

export const getGoodSellingDataAPI = () => {
  return request("/home/list_popularCourse", "GET");
};

export const getSearchDataAPI = (data: searchData) => {
  return request("/home/search_course", "POST", data);
};

export const updatePwdAPI = (data: pwdData) => {
  return request("/home/update_password", "PUT", data);
};

export const buyCourseAPI = (data: buyCourseData) => {
  return request("/home/buy_course", "PUT", data);
};

export const payCourseAPI = (data: buyCourseData) => {
  return request("/home/pay_course", "PUT", data);
};
