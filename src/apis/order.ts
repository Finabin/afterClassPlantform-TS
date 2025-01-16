import request from "@/utils/request";

export function getAllOrderAPI() {
  return request(`/order_manage/admin`, "GET");
}
