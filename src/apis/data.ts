import request from "@/utils/request";

export function getDataPageInfoAPI() {
  return request(`/statistics`, "GET");
}
