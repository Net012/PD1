import { Header } from "@/common/components/Header";

export function Home({ nomeUsuario }: { nomeUsuario: string }) {
  return (
    <div className="flex flex-col h-screen w-full items-center p-4 bg-black/30">
      <Header />
      <div>
        <h1 className="text-white text-2xl">Bem vindo, {nomeUsuario}</h1>
      </div>
    </div>
  );
}
