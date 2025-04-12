import axiosClient from "./axiosClient";
import { AxiosRequestConfig } from "axios";

const handleAPI = async <T>(
  url: string,
  data?: Record<string, unknown> | FormData,
  method: "post" | "put" | "get" | "delete" = "get",
  isFormData: boolean = false
): Promise<T> => {
  const config: AxiosRequestConfig = {
    url,
    method,
  };

  if (method !== "get" && data) {
    config.data = data;
  }

  if (isFormData) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };
  }

  return axiosClient(config).then((res) => res as T);
};

export default handleAPI;
