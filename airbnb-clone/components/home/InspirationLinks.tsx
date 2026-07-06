type InspirationLinksProps = {
  links: string[];
};

export function InspirationLinks({ links }: InspirationLinksProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-700">
      {links.map((link) => (
        <button key={link} type="button" className="text-left hover:text-zinc-950">
          {link}
        </button>
      ))}
    </div>
  );
}
