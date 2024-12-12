"use client";

import { useEffect } from "react";
import { useBuscar } from "../hooks/useBuscar";
import { Filtros } from "./Filtros";
import { Pesquisa } from "./Pesquisa";

export const Buscar = () => {
  const { listarPalestrantes, palestrantes } = useBuscar();

  useEffect(() => {
    listarPalestrantes();
  }, []);

  if (palestrantes.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center ">
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-row mt-20 w-full">
      <Filtros />
      <Pesquisa palestrantes={palestrantes} />
    </div>
  );
};
