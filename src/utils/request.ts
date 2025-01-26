import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import useUserInfoStore from "@/stores/user";
import { storeToRefs } from "pinia";

const BACKEND_BASE_URL = "http://localhost:8080/system";
const router = useRouter();
const userInfoStore = useUserInfoStore();
const { token } = storeToRefs(userInfoStore);

const nonHeaders = ["/login", "/register"];

export default function request(
  url: string,
  method: string,
  data?: any,
  headers?: any
) {
  let defaultHeaders = {
    "Content-Type": "application/json",
  };
  if (!nonHeaders.includes(url)) {
    if (token.value == "") {
      ElMessage({
        message: "未登录，请先登录",
        type: "warning",
      });
      router.push("/login");
      return;
    }
    defaultHeaders["token"] = token.value;
  }
  console.log(token);

  return new Promise((resolve, reject) => {
    axios({
      url: `${BACKEND_BASE_URL}${url}`,
      method: method,
      data: data,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
