import request from "@/utils/request";

interface getInfoData {
  id: number;
}

interface searchInfoData {
  username: string;
  course_name: string;
  status: string;
  classification: string;
  beginTime: string;
}

interface updateInfoData {
  courseId: number;
  displayStatus: string;
  status: string;
}

interface updateCatalogInfoData {
  id: number;
  status: string;
}

interface addCatalogInfoData {
  id: number;
  catalogName: string;
  beginTime: string;
}

export function getAllCourseAPI() {
  return request(`/course_manage/admin`, "GET");
}

export function getTeacherCourseAPI(data: getInfoData) {
  return request(`/course_manage/check_course`, "POST", data);
}

export function searchAllCourseAPI(data: searchInfoData) {
  return request(`/search/admin`, "POST", data);
}

export function searchTeacherCourseAPI(data: searchInfoData) {
  return request(`/course_manage/search/teacher`, "POST", data);
}

export function getCourseDetailAPI(data: getInfoData) {
  return request(`/course_manage/check_course`, "POST", data);
}

export function updateCourseInfoAPI(data: updateInfoData) {
  return request(`/course_manage/update_status`, "PUT", data);
}

export function updateCatalogStatusAPI(data: updateCatalogInfoData) {
  return request(`/course_manage/update_sectionStatus`, "PUT", data);
}

export function addCatalogAPI(data: addCatalogInfoData) {
  return request(`/course_manage/insert_catalog`, "PUT", data);
}
