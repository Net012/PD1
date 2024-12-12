"use client";

import Link from "next/link";

import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { useRouter } from "next/navigation";

export const Header = () => {

  

  const router = useRouter();
  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="font-bold">TechEventCreator</h1>
      <div className="w-[120px]">
        <Tabs>
          <TabsList>
            <TabsTrigger
              onClick={() => {
                router.push("/buscar");
              }}
              value="palestrantes"
            >
              Palestrantes
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                router.push("/buscar");
              }}
              value="servicos"
            >
              Serviços
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                router.push("/buscar");
              }}
              value="locais"
            >
              Locais
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-row items-center gap-x-8">
        <Link className="font-medium" href="/landing">
          Sobre
        </Link>
        <div className="flex flex-row items-center gap-x-8">
          <Link
            className="font-medium bg-black text-white rounded-full py-2 px-4"
            href="/login"
          >
            Entrar
          </Link>
          <Link className="font-semibold" href="/cadastro">
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
};
