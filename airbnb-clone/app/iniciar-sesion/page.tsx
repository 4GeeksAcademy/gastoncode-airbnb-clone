import { BottomNav } from "@/components/home/BottomNav";
import { MobileFrame } from "@/components/home/MobileFrame";

export default function IniciarSesionPage() {
  return (
    <div className="bg-zinc-100 py-4 sm:py-8">
      <MobileFrame>
        <main className="px-4 py-8 pb-24">
          <h1 className="text-2xl font-semibold text-zinc-900">Iniciar sesion</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Accede para gestionar reservas, mensajes y favoritos.
          </p>
        </main>
      </MobileFrame>
      <BottomNav />
    </div>
  );
}
