import request from "../utils/request";

interface studentSearch {
  username?: string;
  phone?: string;
  registerTime?: string;
}

export const getAllStudentInfoAPI = () => {
  return request("/student_manage/admin", "GET");
};

export const searchAllStudentInfoAPI = (data: studentSearch) => {
  return request("/student_manage/admin/search", "GET", data);
};

export const getAllTeacherInfoAPI = () => {
  return request("/teacher_manage", "GET");
};
