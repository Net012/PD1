import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export interface ErroGenerico {
  codigo: number;
  mensagem: string;
}

export class AxiosAPI {
  private axiosInstance: AxiosInstance;
  private static instance: AxiosAPI;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3001/",
    });

    this.axiosInstance.interceptors.response.use(
      this.handleSuccessResponse,
      this.handleErrorResponse
    );
  }

  public static getInstance(): AxiosAPI {
    if (!AxiosAPI.instance) {
      AxiosAPI.instance = new AxiosAPI();
    }
    return AxiosAPI.instance;
  }

  private handleSuccessResponse(response: AxiosResponse) {
    return response;
  }

  private handleErrorResponse(error: AxiosError): ErroGenerico {
    let codigo = 0;
    let mensagem = "Erro desconhecido";

    const errorData = error.response?.data as { error: string };

    if (errorData) {
      return {
        codigo,
        mensagem: error ? errorData.error : "Erro desconhecido",
      };
    }

    if (error.response) {
      codigo = error.response.status;
      switch (error.response.status) {
        case 400:
          mensagem = "Requisição inválida";
          break;
        case 401:
          mensagem = "Não autorizado";
          break;
        case 403:
          mensagem = "Proibido";
          break;
        case 404:
          mensagem = "Não encontrado";
          break;
        case 500:
          mensagem = "Erro interno do servidor";
          break;
        default:
          mensagem = error.response.statusText;
      }
    } else {
      mensagem = "Erro sem resposta do servidor";
    }
    return { codigo, mensagem };
  }

  public async get(url: string, config?: object) {
    try {
      return await this.axiosInstance.get(url, config);
    } catch (error) {
      return this.handleErrorResponse(error as AxiosError);
    }
  }

  public async post(url: string, data: object, config?: object) {
    try {
      return await this.axiosInstance.post(url, data, config);
    } catch (error) {
      return this.handleErrorResponse(error as AxiosError);
    }
  }

  public async put(url: string, data: object, config?: object) {
    try {
      return await this.axiosInstance.put(url, data, config);
    } catch (error) {
      return this.handleErrorResponse(error as AxiosError);
    }
  }

  public async delete(url: string, config?: object) {
    try {
      return await this.axiosInstance.delete(url, config);
    } catch (error) {
      return this.handleErrorResponse(error as AxiosError);
    }
  }
}
