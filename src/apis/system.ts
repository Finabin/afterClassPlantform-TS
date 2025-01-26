import request from "@/utils/request";

export function getTeacherCourseAPI(data: any) {
  return request(`/upload`, "POST", data);
}
