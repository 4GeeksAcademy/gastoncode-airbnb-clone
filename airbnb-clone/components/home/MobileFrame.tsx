type MobileFrameProps = {
  children: React.ReactNode;
};

export function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-sm bg-white text-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      {children}
    </div>
  );
}
