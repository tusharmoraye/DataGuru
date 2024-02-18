import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectDatasetDialog } from "@/components/select-dataset-dialog";
import { useDataset } from "@/contexts/dataset-context";
import { QueryContainer } from "./query-container";
import { DEFAULT_DATASETS } from "@/lib/constants";

export function DatasetCard() {
  const { currentDataset } = useDataset();
  const dataset = DEFAULT_DATASETS.find(
    (dataset) => dataset.id === currentDataset
  );
  return (
    <Card>
      <CardHeader className="items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-normal">Dataset</CardTitle>
          <CardDescription>Manage your datasets and queries</CardDescription>
        </div>
        {/* <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          
        </div> */}
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex space-x-4 text-sm justify-between items-center">
          <h2 className="text-xl">{dataset.display}</h2>
          <div>
            <SelectDatasetDialog></SelectDatasetDialog>
          </div>
        </div>
        <QueryContainer />
      </CardContent>
    </Card>
  );
}
