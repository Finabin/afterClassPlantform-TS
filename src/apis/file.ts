import request from "@/utils/request";

export function getAllFileAPI() {
  return request(`/file_manage/admin`, "GET");
}
