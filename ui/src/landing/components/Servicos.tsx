import Image from "next/image";

export const Servicos = () => {
  return (
    <div className="flex flex-row justify-between items-center gap-x-12 mt-12">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <Image
          alt=""
          src={require("../../assets/palestrante.png")}
          width={50}
          height={50}
        />
        <h4 className="text-sm">Palestrantes</h4>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2">
        <Image
          alt=""
          src={require("../../assets/equipamentos.png")}
          width={50}
          height={50}
        />
        <h4 className="text-sm">Equipamentos</h4>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2">
        <Image
          alt=""
          src={require("../../assets/local.png")}
          width={35}
          height={35}
        />
        <h4 className="text-sm">Locais</h4>
      </div>
    </div>
  );
};
