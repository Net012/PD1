import { useState } from "react";
import { useLoginAPI } from "./useLoginAPI";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    titulo: string;
    descricao: string;
  } | null>(null);

  const { login: loginAPI } = useLoginAPI();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const response = await loginAPI(email, password);

    if ("codigo" in response) {
      setError({
        titulo: "Erro",
        descricao: response.mensagem,
      });
      setLoading(false);
      return { sucesso: false };
    }

    sessionStorage.setItem("usuario", JSON.stringify(response.data.usuario));
    setLoading(false);
    return { sucesso: true };
  };

  return {
    loading,
    error,
    login,
  };
};
