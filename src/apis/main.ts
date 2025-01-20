import request from "../utils/request";

interface searchData {
  classification: string;
  grade: string;
  courseTime: Array<number>;
  sellNum: Array<number>;
  username: string;
  nickname: string;
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
