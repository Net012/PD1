import { useState } from "react";
import { CadastrarProps, useCadastroAPI } from "./useCadastroAPI";

export const useCadastro = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    titulo: string;
    descricao: string;
  } | null>(null);

  const { cadastrar: cadastrarAPI } = useCadastroAPI();

  const cadastrar = async (props: CadastrarProps) => {
    setLoading(true);

    const response = await cadastrarAPI(props);

    if ("codigo" in response) {
      setError({
        titulo: "Erro",
        descricao: response.mensagem,
      });
      setLoading(false);
      return { sucesso: false };
    }

    setLoading(false);
    return { sucesso: true };
  };

  return {
    cadastrar,
    loading,
    error,
  };
};
