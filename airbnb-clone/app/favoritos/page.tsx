import { BottomNav } from "@/components/home/BottomNav";
import { MobileFrame } from "@/components/home/MobileFrame";

export default function FavoritosPage() {
  return (
    <div className="bg-zinc-100 py-4 sm:py-8">
      <MobileFrame>
        <main className="px-4 py-8 pb-24">
          <h1 className="text-2xl font-semibold text-zinc-900">Favoritos</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Aqui apareceran tus alojamientos guardados.
          </p>
        </main>
      </MobileFrame>
      <BottomNav />
    </div>
  );
}
