import { useState } from "react";
import { useBuscarAPI } from "./useBuscarAPI";

export const useBuscar = () => {
  const { listarPalestrantes: listarPalestrantesAPI } = useBuscarAPI();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    titulo: string;
    descricao: string;
  } | null>(null);

  const [palestrantes, setPalestrantes] = useState([]);

  const listarPalestrantes = async () => {
    setLoading(true);
    setError(null);

    const response = await listarPalestrantesAPI();

    if ("codigo" in response) {
      setError({
        titulo: "Erro",
        descricao: response.mensagem,
      });
      setLoading(false);
      return { sucesso: false };
    }

    setLoading(false);
    setPalestrantes(response.data as any);
  };

  return {
    loading,
    error,
    listarPalestrantes,
    palestrantes,
  };
};
