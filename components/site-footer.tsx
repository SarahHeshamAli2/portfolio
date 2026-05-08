export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-border/80 bg-muted/20 py-10 dark:bg-muted/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-center text-sm text-muted-foreground sm:flex-row sm:text-left sm:px-8 lg:px-10">
        <p>© {year} Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
