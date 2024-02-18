import * as React from "react";
import { TableIcon } from "@radix-ui/react-icons";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DEFAULT_DATASETS } from "@/lib/constants";
import { DATASET_ACTION, useDatasetDispatch } from "@/contexts/dataset-context";

export function SelectDatasetDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(DEFAULT_DATASETS[0].id);

  const dispatch = useDatasetDispatch();

  React.useEffect(() => {
    const down = (e) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleChooseDataset = (id) => {
    setOpen(false);
    setValue(id);

    dispatch({
      type: DATASET_ACTION.DATASET_CHANGE,
      payload: id,
    });
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="inline-flex">Choose Dataset</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        value={value}
        onValueChange={setValue}
      >
        <CommandInput placeholder="Type a dataset name to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Datasets">
            {DEFAULT_DATASETS.map((dataset) => (
              <CommandItem
                key={dataset.id}
                onSelect={() => handleChooseDataset(dataset.id)}
              >
                <TableIcon className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{dataset.display}</span>
                  <span className="text-stone-500 overflow-ellipsis">
                    {dataset.description}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
