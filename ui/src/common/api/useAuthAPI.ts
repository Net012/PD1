import { AxiosAPI } from "../hooks/useAxios";

export const useAuthAPI = () => {
  const axiosAPI = AxiosAPI.getInstance();

  const checkToken = async (token: string, nome: string, email: string) => {
    const response = await axiosAPI.post("/auth/checkToken", {
      token,
      nome,
      email,
    });

    return response;
  };

  return { checkToken };
};
