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
import { Toaster } from "@/common/components/toaster";
import { useToast } from "@/common/hooks/use-toast";
import { useLogin } from "@/login/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaTemplate } from "../schemas/Login.schema";
import { useRouter } from "next/navigation";

export function Login() {
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
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Digite seu email e senha para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              required
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              placeholder="Digite sua senha"
              {...register("senha")}
            />
            {errors.senha && (
              <span className="text-red-500 text-xs">
                {errors.senha.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit(handleLogin)}
          >
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Não tem uma conta?{" "}
          <Link href="/cadastro" className="underline">
            Registre-se
          </Link>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  );
}
