import { AxiosAPI } from "@/common/hooks/useAxios";

export const useLoginAPI = () => {
  const axiosAPI = AxiosAPI.getInstance();
  const login = async (email: string, password: string) => {
    const response = await axiosAPI.post("/auth/signIn", {
      email,
      senha: password,
    });

    return response;
  };

  return { login };
};
