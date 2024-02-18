import { StarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DATASET_ACTION,
  useDataset,
  useDatasetDispatch,
} from "@/contexts/dataset-context";
import { useState } from "react";

export function QueryEditor() {
  const { currentQuery, currentDataset } = useDataset();
  const dispatch = useDatasetDispatch();
  const [selectedDataset, setSelectedDataset] = useState(currentDataset);

  const handleRunQuery = () => {
    dispatch({
      type: DATASET_ACTION.DATASET_CHANGE,
      payload: selectedDataset,
    });
    dispatch({
      type: DATASET_ACTION.RUN_QUERY,
    });
    dispatch({
      type: DATASET_ACTION.ADD_RECENT_QUERY,
    });
  };
  const handleSaveQuery = () => {
    dispatch({
      type: DATASET_ACTION.SAVE_QUERY,
    });
  };
  const handleQueryChange = (value) => {
    dispatch({
      type: DATASET_ACTION.QUERY_CHANGE,
      payload: value,
    });
  };
  const handlePresetQueries = (dataset, query) => {
    setSelectedDataset(dataset);
    dispatch({
      type: DATASET_ACTION.QUERY_CHANGE,
      payload: query,
    });
  };
  return (
    <div className="grid w-full gap-2">
      <p>Sample queries</p>
      <div className="flex gap-4 flex-wrap">
        <Button
          variant="secondary"
          onClick={() => handlePresetQueries("orders", "SELECT * from orders")}
        >
          Get all orders
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            handlePresetQueries("employees", "SELECT * from employees")
          }
        >
          Get all employees
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            handlePresetQueries("order_details", "SELECT * from order_details")
          }
        >
          Get all order details
        </Button>
      </div>
      <Textarea
        placeholder="Type your query here."
        className="resize-none"
        value={currentQuery}
        onInput={(e) => handleQueryChange(e.target.value)}
      />
      <div className="flex gap-4 ml-auto">
        <Button onClick={handleRunQuery}>Run</Button>
        <Button onClick={handleSaveQuery} variant="outline">
          <StarIcon /> &nbsp;Save
        </Button>
        <Button variant="destructive" onClick={() => handleQueryChange("")}>
          Clear
        </Button>
      </div>
    </div>
  );
}
