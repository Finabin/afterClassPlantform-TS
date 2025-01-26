import request from "@/utils/request";

export function getDataPageInfoAPI() {
  return request(`/statistics`, "GET");
}

export function getSalesGraphDataAPI() {
  return request(`/annual_statistics/sales`, "GET");
}

export function getOrdersGraphDataAPI() {
  return request(`/annual_statistics/order`, "GET");
}
