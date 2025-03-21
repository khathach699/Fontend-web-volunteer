import axiosClient from "./axiosClient";

const handAPI = async (
  url: string,
  data?: Record<string, unknown>,
  method: "post" | "put" | "get" | "delete" = "get"
) => {
  return await axiosClient({
    url,
    method,
    ...(method !== "get" ? { data } : {}),
  });
};

export default handAPI;
