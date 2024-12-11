"use client";

import { Button } from "@/common/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/common/components/card";
import { Input } from "@/common/components/input";
import { Label } from "@/common/components/label";
import { RadioGroup, RadioGroupItem } from "@/common/components/radio-group";
import { Toaster } from "@/common/components/toaster";
import { useToast } from "@/common/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCadastro } from "../hooks/useCadastro";
import {
  CadastroSchema,
  CadastroSchemaTemplate,
} from "../schemas/Cadastro.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "react-feather";

export function Cadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmaSenha, setMostrarConfirmaSenha] = useState(false);

  const { cadastrar, error } = useCadastro();
  const { toast } = useToast();
  const router = useRouter();

  const [tipoUsuario, setTipoUsuario] = useState<"presatador" | "consumidor">(
    "consumidor"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroSchema>({
    resolver: zodResolver(CadastroSchemaTemplate),
  });

  const handleCadastro = async (data: CadastroSchema) => {
    const response = await cadastrar({
      nome: data.nome,
      email: data.email,
      password: data.senha,
      passwordConfirmation: data.confirmaSenha,
      tipoUsuario,
    });

    if (response?.sucesso) {
      toast({
        title: "Sucesso!",
        description: "Cadastro efetuado com sucesso.",
        className: "bg-green-500 border-green-500 text-white font-bold",
      });
      router.push("/login");
    }
  };

  useEffect(() => {
    if (!error) return;
    toast({
      title: error.titulo,
      description: error.descricao,
      className: "bg-red-500 border-none text-white font-bold",
    });
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-md p-6 border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-xl text-center font-bold">
            Faça login para aproveitar mais de nossos serviços!!!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleCadastro)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Digite seu nome</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Nome"
                required
                {...register("nome")}
                className="p-2"
              />
              {errors.nome && (
                <span className="text-red-500 text-xs">
                  {errors.nome.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Digite o seu email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                {...register("email")}
                className="p-2"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="senha">Digite sua senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  required
                  placeholder="Digite sua senha"
                  className="p-2"
                  {...register("senha")}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.senha && (
                <span className="text-red-500 text-xs">
                  {errors.senha.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmacaoSenha">Confirme a sua senha</Label>
              <div className="relative">
                <Input
                  id="confirmacaoSenha"
                  type={mostrarConfirmaSenha ? "text" : "password"}
                  required
                  placeholder="Confirme sua senha"
                  className="p-2"
                  {...register("confirmaSenha")}
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmaSenha(!mostrarConfirmaSenha)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {mostrarConfirmaSenha ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmaSenha && (
                <span className="text-red-500 text-xs">
                  {errors.confirmaSenha.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Tipo de conta</Label>
              <RadioGroup
                defaultValue="consumidor"
                className="flex justify-around"
                onValueChange={(value) =>
                  setTipoUsuario(value as "presatador" | "consumidor")
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prestador" id="prestador" />
                  <Label htmlFor="prestador">Prestador</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="consumidor" id="consumidor" />
                  <Label htmlFor="consumidor">Consumidor</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full bg-black text-white">
              Cadastrar
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link className="underline text-blue-600" href="/login">
              Entrar
            </Link>
          </div>
        </CardContent>
        <Toaster />
      </Card>
    </div>
  );
}
