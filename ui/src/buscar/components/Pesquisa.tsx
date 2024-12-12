"use client";

import { Button } from "@/common/components/button";
import Image from "next/image";
import { useState } from "react";

export const Pesquisa = ({ palestrantes }: { palestrantes: any[] }) => {
  const [pesquisa, setPesquisa] = useState("");

  const [conteudoFiltrado, setConteudoFiltrado] = useState(palestrantes);

  const handlePesquisa = () => {
    const conteudoFiltrado = palestrantes.filter((palestrante) =>
      palestrante._nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    setConteudoFiltrado(conteudoFiltrado);
  };

  return (
    <div className="ml-64">
      <div className="flex flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Pesquise palestrantes"
          className="w-[500px] h-[40px] border border-gray-300 rounded-3xl rounded-r-none p-2"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <button
          onClick={handlePesquisa}
          className="bg-gray-400 text-white rounded-3xl rounded-s-none p-2"
        >
          Pesquisar
        </button>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-y-5">
        {conteudoFiltrado.map((palestrante, index) => {
          console.log(palestrante);

          const fotoNumero = (index % 3) + 1;
          return (
            <div key={index} className="flex flex-row items-center">
              <Image
                src={require(`../../assets/palestrantes/${fotoNumero}.png`)}
                alt="palestrante"
                className="w-[100px] h-[100px] rounded-full"
              />
              <div className="ml-4 flex flex-col items-center">
                <h1>{palestrante._nome}</h1>
                <Button
                  className="self-center border px-2 text-xs  border-black text-black rounded-full bg-gray-100 hover:bg-gray-300"
                  onClick={() => {
                    window.open(
                      `https://api.whatsapp.com/send?phone=55${palestrante._celular}&text=Ol%C3%A1,%20gostaria%20de%20conversar%20sobre%20os%20seus%20servi%C3%A7os.`,
                      "_blank"
                    );
                  }}
                >
                  Entre em contato
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
