import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { DatasetCard } from "@/components/dataset-card";
import { SiteFooter } from "@/components/site-footer";
import { QueryEditor } from "@/components/query-editor";
import { QueryResult } from "@/components/query-result";
import { Separator } from "@/components/ui/separator";
import { DatasetProvider } from "@/contexts/dataset-context";

function DemoContainer({ className, ...props }) {
  return (
    <section
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DatasetProvider>
        <div className="relative flex min-h-screen flex-col bg-background">
          <SiteHeader />
          <main className="flex-1">
            <div className="items-start justify-center gap-6 rounded-lg p-8 md:grid md:grid-cols-5">
              <DemoContainer className="col-span-2">
                <DatasetCard />
              </DemoContainer>
              <DemoContainer className="flex flex-col col-span-3 gap-4 mt-8 md:mt-0">
                <QueryEditor />
                <Separator />
                <QueryResult />
              </DemoContainer>
            </div>
          </main>
          <SiteFooter />
        </div>
      </DatasetProvider>
    </ThemeProvider>
  );
}

export default App;
