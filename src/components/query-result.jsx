import { useEffect, useState } from "react";
import { parse } from "papaparse";
import { DownloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ReactTableVirtualized } from "@/components/ui/data-table-virtual";
import { useDataset } from "@/contexts/dataset-context";
import { DEFAULT_DATASETS } from "@/lib/constants";

import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export function QueryResult() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [, setError] = useState(false);

  const { currentDataset, query } = useDataset();

  const dataset = DEFAULT_DATASETS.find(
    (dataset) => dataset.id === currentDataset
  );

  useEffect(() => {
    queryClient
      .fetchQuery({
        queryKey: [dataset.id],
        queryFn: () => {
          return new Promise((resolve, reject) => {
            parse(dataset.uri, {
              download: true,
              header: true,
              skipEmptyLines: true,
              complete(result) {
                resolve({
                  data: result.data || [],
                  columns:
                    result.meta.fields?.map((field) => ({
                      header: field,
                      accessorKey: field,
                    })) || [],
                });
              },
              error(error) {
                reject(error);
              },
            });
          });
        },
      })
      .then((res) => {
        setData(res.data);
        setColumns(res.columns);
      })
      .catch(() => {
        setError(true);
      });
  }, [dataset, query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>{data.length} rows in total</div>
        <Button variant="outline">
          <DownloadIcon /> &nbsp;Export
        </Button>
      </div>
      {/* <DataTable columns={columns} data={data} /> */}

      <ReactTableVirtualized columns={columns} data={data} />
    </div>
  );
}
