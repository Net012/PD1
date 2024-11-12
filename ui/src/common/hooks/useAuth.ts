import { useState } from "react";
import { useAuthAPI } from "../api/useAuthAPI";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const { checkToken: checkTokenAPI } = useAuthAPI();

  const checkToken = async (token: string, nome: string, email: string) => {
    setLoading(true);
    const response = await checkTokenAPI(token, nome, email);

    if ("status" in response) {
      setLoading(false);
      return { valid: true };
    }
  };

  return {
    loading,
    checkToken,
  };
};
