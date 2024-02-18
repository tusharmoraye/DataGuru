import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <img className="w-8 h-8 mr-4" src="/favicon.jpg" alt="favicon" />
        <h2 className="text-2xl">Data Guru</h2>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
