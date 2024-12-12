import { Checkbox } from "@/common/components/checkbox";
import { Header } from "@/common/components/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/select";

export default function Page() {
  const cidades = [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Curitiba",
    "Porto Alegre",
    "Pelotas",
  ];
  return (
    <div>
      <div className="p-4">
        <Header />
      </div>
      <div className="flex flex-row mt-20">
        <div className="flex p-4 flex-col h-full bg-gray-300">
          <h1 className="font-bold text-base">Filtros</h1>
          <div className="space-y-2">
            <h1 className="text-sm my-3">Areas</h1>
            <div className="flex flex-row gap-x-2">
              <Checkbox />
              <p className="text-xs">Inteligência Artificial</p>
            </div>
            <div className="flex flex-row gap-x-2">
              <Checkbox />
              <p className="text-xs">Machine Learning</p>
            </div>
            <div className="flex flex-row gap-x-2">
              <Checkbox />
              <p className="text-xs">Segurança</p>
            </div>
            <div className="flex flex-row gap-x-2">
              <Checkbox />
              <p className="text-xs">Ciência de dados</p>
            </div>
          </div>
          <div>
            <h1 className="text-sm mt-6 mb-3">Localização</h1>

            <div className="flex flex-row items-center gap-x-2">
              <Checkbox />
              <p className="text-xs">Remoto</p>
            </div>
            <div className="mt-3">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Escolha uma cidade" />
                </SelectTrigger>
                <SelectContent>
                  {cidades.map((cidade) => (
                    <SelectItem key={cidade} value={cidade}>
                      {cidade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
