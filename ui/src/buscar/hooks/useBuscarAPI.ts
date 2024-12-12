import { AxiosAPI } from "@/common/hooks/useAxios";

export const useBuscarAPI = () => {
  const axiosAPI = AxiosAPI.getInstance();
  const listarPalestrantes = async () => {
    const response = await axiosAPI.get("/usuario");
    return response;
  };
  return {
    listarPalestrantes,
  };
};
