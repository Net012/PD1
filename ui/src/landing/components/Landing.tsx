import { PrincipaisPalestrantes } from "./PrincipaisPalestrantes";
import { Servicos } from "./Servicos";
import { Sobre } from "./Sobre";

export const Landing = () => {
  return (
    <div className="flex flex-col items-center mt-16">
      <h1>Principais tipos de produtos</h1>
      <Servicos />
      <Sobre />
      <PrincipaisPalestrantes />
    </div>
  );
};
