import { AxiosAPI } from "@/common/hooks/useAxios";

export interface CadastrarProps {
  nome: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  tipoUsuario: string;
}

export const useCadastroAPI = () => {
  const axiosAPI = AxiosAPI.getInstance();

  const cadastrar = async (props: CadastrarProps) => {
    const response = await axiosAPI.post("usuario/cadastrar", {
      nome: props.nome,
      email: props.email,
      senha: props.password,
      tipo: props.tipoUsuario,
    });

    return response;
  };

  return { cadastrar };
};
