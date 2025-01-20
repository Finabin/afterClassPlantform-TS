import request from "@/utils/request";

interface getOrderInfo {
  userId: number;
}

interface searchOrderInfo {
  coursename: string;
  orderno: string;
  studentname: string;
  status: string;
  payTime: string;
  userId?: number;
}

export function getAllOrderAPI() {
  return request(`/order_manage/admin`, "GET");
}

export function getTeacherOrderAPI(data: getOrderInfo) {
  return request(`/order_manage/teacher`, "GET", data);
}

export function getStudentOrderAPI(data: getOrderInfo) {
  return request(`/order_manage/student`, "GET", data);
}

export function searchAllOrderAPI(data: searchOrderInfo) {
  return request(`/order_manage/admin`, "GET", data);
}

export function searchTeacherOrderAPI(data: searchOrderInfo) {
  return request(`/order_manage/admin`, "GET", data);
}

export function searchStudentOrderAPI(data: searchOrderInfo) {
  return request(`/order_manage/admin`, "GET", data);
}
