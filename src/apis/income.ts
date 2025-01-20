import request from "@/utils/request";

interface teacherInfo {
  teacher_id: number;
}

interface searchInfo {
  type: string;
  nickName: string;
  applicteTime: string;
  teacherName: string;
  id?: number;
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
  return request(`/income_manage/search`, "GET", data);
}
