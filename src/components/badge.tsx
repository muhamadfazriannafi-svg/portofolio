export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}
