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

export function Cadastro() {
  const { cadastrar, error } = useCadastro();
  const { toast } = useToast();
  const router = useRouter();

  const [tipoUsuario, setTipoUsuario] = useState<"contratante" | "prestador">(
    "contratante"
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
      router.push("/login");
    }
  };

  useEffect(() => {
    if (!error) return;
    toast({
      title: error.titulo,
      description: error.descricao,
      className: "bg-yellow-500 border-yellow-500 text-white font-bold",
    });
  }, [error]);

  return (
    <Card className="mx-auto max-w-sm p-4">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Cadastro</CardTitle>
        <CardDescription>
          Digite seus dados para criar uma conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Nome"
              required
              {...register("nome")}
              className="bg-gray-300 placeholder:text-black/80"
            />
            {errors.nome && (
              <span className="text-red-500 text-xs">
                {errors.nome.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              {...register("email")}
              className="bg-gray-300 placeholder:text-black/80"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              placeholder="Senha"
              required
              {...register("senha")}
              className="bg-gray-300 placeholder:text-black/80"
            />
            {errors.senha && (
              <span className="text-red-500 text-xs">
                {errors.senha.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmacaoSenha">Confirme sua senha</Label>
            <Input
              id="confirmacaoSenha"
              type="password"
              placeholder="Confirme sua senha"
              required
              {...register("confirmaSenha")}
              className="bg-gray-300 placeholder:text-black/80"
            />
            {errors.confirmaSenha && (
              <span className="text-red-500 text-xs">
                {errors.confirmaSenha.message}
              </span>
            )}
          </div>

          <Label>Tipo de usuário</Label>
          <RadioGroup
            defaultValue="contratante"
            className="flex justify-between"
            onValueChange={(value) =>
              setTipoUsuario(value as "contratante" | "prestador")
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="contratante" id="contratante" />
              <Label htmlFor="contratante">Contratante</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prestador" id="prestador" />
              <Label htmlFor="prestador">Prestador</Label>
            </div>
          </RadioGroup>
          <Button className="w-full" onClick={handleSubmit(handleCadastro)}>
            Cadastrar
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  );
}
