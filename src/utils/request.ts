import axios from "axios";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const BACKEND_BASE_URL = "http://localhost:8080/system";

export default function request(
  url: string,
  method: string,
  data?: any,
  headers?: any
) {
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
