export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8">
      <div className="mx-auto max-w-6xl text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SubList Me. All rights reserved.
      </div>
    </footer>
  );
}
