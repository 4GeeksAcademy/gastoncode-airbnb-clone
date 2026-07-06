type IconCircleButtonProps = {
  icon: string;
  label: string;
};

export function IconCircleButton({ icon, label }: IconCircleButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm shadow-sm transition hover:border-zinc-300"
    >
      {icon}
    </button>
  );
}
