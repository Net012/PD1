"use client";

import { useAuth } from "@/common/hooks/useAuth";
import { Home } from "@/home/components/Home";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ClipLoader";

export default function Page() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <ScaleLoader loading={loading} size={35} color="#0000FF" />
      </div>
    );

  return <Home nomeUsuario={nomeUsuario} />;
}
