import request from "@/utils/request";

export function uploadFileAPI(data: any) {
  return request(`/upload`, "POST", data);
}
