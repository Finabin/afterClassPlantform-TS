import request from "@/utils/request";

interface teacherInfo {
  teacher_id: number;
}

interface searchInfo {
  type: string;
  nickname: string;
  applictetime: string;
  username: string;
  id?: number;
}

interface withdrawalInfo {
  teacherId: number;
  mode: string;
  money: string;
}

export function getAllIncomeAPI() {
  return request(`/income_manage/admin`, "GET");
}

export function getTeacherIncomeAPI(data: teacherInfo) {
  return request(`/income_manage/teacher`, "GET", data);
}

export function searchTeacherIncomeAPI(data: searchInfo) {
  return request(`/income_manage/search/teacher`, "GET", data);
}

export function searchAllIncomeAPI(data: searchInfo) {
  return request(`/income_manage/search/admin`, "GET", data);
}

export function withdrawalAPI(data: withdrawalInfo) {
  return request(`/income_manage/withdrawal`, "PUT", data);
}
