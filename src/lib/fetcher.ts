import axios from "axios";
export const baseURL = "http://localhost:3000/";

axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem("at");
  console.log(token)
  config.headers.Authorization = 'Bearer '+token;
  config.headers["Content-Type"] = "application/json"
  config.baseURL = baseURL;
  return config;
});

export async function getData(endpoint: string) {
  try {
    const { data, status } = await axios.get(endpoint);
    return { ...data, status };
  } catch (error: any) {
    throw error;
  }
}

export async function postData(endpoint: string, body: FormData | {}) {
  try {
    const { data, status } = await axios.post(endpoint, body);
    return { ...data, status };
  } catch (error: any) {
    throw error;
  }
}

export async function updateData(endpoint: string, body: {}) {
  try {
    const { data, status } = await axios.patch(endpoint, body);
    return { ...data, status };
  } catch (error: any) {
    throw error;
  }
}

export async function deleteData(endpoint: string) {
  try {
    const response = await axios.delete(endpoint);
    return response;
  } catch (error: any) {
    throw error;
  }
}
