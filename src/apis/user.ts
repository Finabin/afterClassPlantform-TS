import type { V } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import request from "../utils/request";

interface studentSearch {
  username?: string;
  phone?: string;
  registerTime?: string;
}

interface studentSearchT {
  teacherId: number;
  username?: string;
  phone?: string;
  registerTime?: string;
}

interface teacherSearch {
  username?: string;
  phone?: string;
  registerTime?: string;
  status?: string;
}

interface teacherTPInfo {
  teacherId: number;
  takePercent: number;
  status: string;
}

interface personInfo {
  userId: number;
  username?: string;
  nickname?: string;
  password?: string;
  phone?: string;
  gender?: number;
  avatar?: string;
  subject?: string;
  introduction?: string;
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

export const searchAllTeachernfoAPI = (data: teacherSearch) => {
  return request("/teacher_manage/search", "GET", data);
};

export const getPersonalInfoAPI = (data: personInfo) => {
  return request("/information", "GET", data);
};

export const getTStudentInfoAPI = (data: studentSearchT) => {
  return request("/student_manage/teacher", "GET", data);
};

export const searchTStudentInfoAPI = (data: studentSearchT) => {
  return request("/student_manage/teacher/search", "GET", data);
};

export const updateteacherTPAPI = (data: teacherTPInfo) => {
  return request("/teacher_manage/update", "PUT", data);
};
