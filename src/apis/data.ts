import request from "@/utils/request";

interface getTeacherDataPageInfo {
  id: number;
}

export function getDataPageInfoAPI() {
  return request(`/statistics`, "GET");
}

export function getSalesGraphDataAPI() {
  return request(`/annual_statistics/sales`, "GET");
}

export function getOrdersGraphDataAPI() {
  return request(`/annual_statistics/order`, "GET");
}

export function getTeacherDataPageInfoAPI(data: getTeacherDataPageInfo) {
  return request(`/teacher_statistics`, "POST", data);
}

export function getTeacherSalesGraphDataAPI(data: getTeacherDataPageInfo) {
  return request(`/annual_statistics/sales_teacher`, "POST", data);
}

export function getTeacherOrdersGraphDataAPI(data: getTeacherDataPageInfo) {
  return request(`/annual_statistics/order_teacher`, "POST", data);
}
