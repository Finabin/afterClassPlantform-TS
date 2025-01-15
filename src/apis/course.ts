import request from "@/utils/request";

export function getAllCourseAPI() {
  return request(`/course_manage/admin`, "GET");
}
