"use client";

import { useAuth } from "@/common/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  const { checkToken } = useAuth();

  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const usuario = sessionStorage.getItem("usuario");

    if (!usuario) {
      router.push("/login");
      return;
    }

    const { token, nome, email } = JSON.parse(usuario);

    checkToken(token, nome, email)
      .then((response) => {
        if (response && "valid" in response) {
          setNomeUsuario(nome);
        } else {
          router.push("/login");
        }
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 bg-black/30">
      <h1>Olá, {nomeUsuario}</h1>
    </div>
  );
}
