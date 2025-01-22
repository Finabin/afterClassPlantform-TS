import request from "@/utils/request";

interface getDataInfo {
  teacherId?: string;
  studentId?: string;
}

interface searchDataInfo {
  courseSection: string;
  courseName: string;
  beginTime: string;
  userId?: number;
}

export function getAllFileAPI() {
  return request(`/file_manage/admin`, "GET");
}

export function getTeacherFileAPI(data: getDataInfo) {
  return request(`/file_manage/teacher`, "GET", data);
}

export function getStudentFileAPI(data: getDataInfo) {
  return request(`/file_manage/student`, "GET", data);
}

export function searchAllFileAPI(data: searchDataInfo) {
  return request(`/file_manage/admin`, "GET", data);
}

export function searchTeacherFileAPI(data: searchDataInfo) {
  return request(`/file_manage/teacher`, "GET", data);
}

export function searchStudentFileAPI(data: searchDataInfo) {
  return request(`/file_manage/student`, "GET", data);
}
