import axiosClient from "./axiosClient";
const handleAPI = async <T>(
  url: string,
  data?: Record<string, unknown>,
  method: "post" | "put" | "get" | "delete" = "get"
): Promise<T> => {
  return axiosClient({
    url,
    method,
    ...(method !== "get" ? { data } : {}),
  }).then((res) => res as T);
};

export default handleAPI;
