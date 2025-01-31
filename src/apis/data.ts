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

export function getTeacherDataPageInfoAPI() {
  return request(`/teacher_statistics`, "GET");
}

export function getTeacherSalesGraphDataAPI() {
  return request(`/annual_statistics/sales_teacher`, "GET");
}

export function getTeacherOrdersGraphDataAPI() {
  return request(`/annual_statistics/order_teacher`, "GET");
}
