import { Buscar } from "@/buscar/components/Buscar";
import { Header } from "@/common/components/Header";

export default function Page() {
  return (
    <div>
      <div className="p-4">
        <Header />
      </div>
      <Buscar />
    </div>
  );
}
