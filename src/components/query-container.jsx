import { Cross2Icon } from "@radix-ui/react-icons";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  DATASET_ACTION,
  useDataset,
  useDatasetDispatch,
} from "@/contexts/dataset-context";

export function QueryContainer() {
  const { currentDataset, queries } = useDataset();
  const dispatch = useDatasetDispatch();

  const { recent, saved } = queries[currentDataset];

  const handleQueryChange = (query) => {
    dispatch({
      type: DATASET_ACTION.QUERY_CHANGE,
      payload: query,
    });
  };
  const handleRemoveRecent = (id) => {
    dispatch({
      type: DATASET_ACTION.REMOVE_RECENT_QUERY,
      payload: id,
    });
  };
  const handleUnsave = (id) => {
    dispatch({
      type: DATASET_ACTION.UNSAVE_QUERY,
      payload: id,
    });
  };
  return (
    <Tabs defaultValue="recent" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="recent">Recent Queries</TabsTrigger>
        <TabsTrigger value="saved">Saved Queries</TabsTrigger>
      </TabsList>
      <TabsContent value="recent">
        <Command>
          <CommandList>
            {recent.map((recentQuery) => (
              <CommandItem
                onSelect={() => {
                  handleQueryChange(recentQuery.query);
                }}
                className="flex justify-between cursor-pointer"
                key={recentQuery.id}
                value={recentQuery.id}
              >
                <span>{recentQuery.query}</span>
                <Cross2Icon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveRecent(recentQuery.id);
                  }}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
        {recent.length === 0 && (
          <div className="text-center py-8">No recent queries</div>
        )}
      </TabsContent>
      <TabsContent value="saved">
        <Command>
          <CommandList>
            {saved.map((savedQuery) => (
              <CommandItem
                onSelect={() => {
                  handleQueryChange(savedQuery.query);
                }}
                className="flex justify-between cursor-pointer w-full"
                key={savedQuery.id}
                value={savedQuery.id}
              >
                <span className="flex-1 min-w-0 overflow-ellipsis overflow-hidden">
                  {savedQuery.query}
                </span>
                <Cross2Icon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnsave(savedQuery.id);
                  }}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
        {saved.length === 0 && (
          <div className="text-center py-8">No saved queries</div>
        )}
      </TabsContent>
    </Tabs>
  );
}
