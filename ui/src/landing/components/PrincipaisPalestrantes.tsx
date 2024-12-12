import Image from "next/image";

export const PrincipaisPalestrantes = () => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <h1 className="font-bold">Principais palestrantes</h1>
      <div className="flex flex-row justify-between items-center gap-x-12 mt-12">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <Image
            alt=""
            src={require("../../assets/palestrantes/3.png")}
            width={100}
            height={100}
          />
          <h4 className="text-sm font-bold">Karol Attekita</h4>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <Image
            alt=""
            src={require("../../assets/palestrantes/2.png")}
            width={100}
            height={100}
          />
          <h4 className="text-sm font-bold">Angelo Luz</h4>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <Image
            alt=""
            src={require("../../assets/palestrantes/1.png")}
            width={100}
            height={100}
          />
          <h4 className="text-sm font-bold">Pablo Rosa</h4>
        </div>
      </div>
    </div>
  );
};
