"use client";

import { Button } from "@/common/components/button";
import { Card, CardContent } from "@/common/components/card";
import { Input } from "@/common/components/input";
import { Label } from "@/common/components/label";
import { Toaster } from "@/common/components/toaster";
import { useToast } from "@/common/hooks/use-toast";
import { useLogin } from "@/login/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaTemplate } from "../schemas/Login.schema";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "react-feather";

export function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const { login, error } = useLogin();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (data: LoginSchema) => {
    const response = await login(data.email, data.senha);

    if (response.sucesso) {
      router.push("/home");
    }
  };

  useEffect(() => {
    if (!error) return;
    toast({
      title: error.titulo,
      description: error.descricao,
      className: "bg-red-500 border-red-500 text-white",
      variant: "destructive",
    });
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchemaTemplate),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Card className="w-full max-w-sm border-none shadow-none">
        <CardContent className="p-6">
          <h1 className="text-center text-lg font-bold mb-8">
            Faça login para aproveitar mais de nossos serviços!!!
          </h1>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
              <Label className="block mb-4" htmlFor="email">
                Digite o seu email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                required
                className="w-full"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <Label className="block mb-4" htmlFor="password">
                Digite sua senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={mostrarSenha ? "text" : "password"}
                  required
                  placeholder="Digite sua senha"
                  className="w-full pr-10"
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
              <Link
                href="#"
                className="block text-sm text-right text-blue-600 underline mt-4"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div className="w-full flex justify-center">
              <Button
                type="submit"
                className="bg-black text-center text-white py-2 rounded-full w-40 hover:bg-gray-800"
              >
                Entrar
              </Button>
            </div>
          </form>
          <div className="text-center mt-4 text-sm">
            <Link href="/cadastro">
              <Button className="w-40 mt-2 border border-black text-black py-2 rounded-full bg-gray-100 hover:bg-gray-100">
                Cadastrar
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
