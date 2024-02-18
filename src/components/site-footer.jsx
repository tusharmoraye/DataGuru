export function SiteFooter() {
  return (
    <footer className="py-6 px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row p-0 m-0">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Data Guru | Powertool used by every data
          analyst
        </p>
      </div>
    </footer>
  );
}
