import { createContext, useContext, useEffect, useReducer } from "react";

import { DEFAULT_DATASETS } from "@/lib/constants";

const DatasetContext = createContext(null);

const DatasetDispatchContext = createContext(null);

const initializer = () => {
  let localData = initialDatasets;
  try {
    localData = {
      ...localData,
      ...JSON.parse(localStorage.getItem("vite-dataset")),
    };
  } catch (e) {
    console.log(e);
  }
  return localData;
};

export function DatasetProvider({ children }) {
  const [dataset, dispatch] = useReducer(datasetReducer, initializer());

  useEffect(() => {
    localStorage.setItem("vite-dataset", JSON.stringify(dataset));
  }, [dataset]);

  return (
    <DatasetContext.Provider value={dataset}>
      <DatasetDispatchContext.Provider value={dispatch}>
        {children}
      </DatasetDispatchContext.Provider>
    </DatasetContext.Provider>
  );
}

export function useDataset() {
  return useContext(DatasetContext);
}

export function useDatasetDispatch() {
  return useContext(DatasetDispatchContext);
}

export const DATASET_ACTION = {
  DATASET_CHANGE: "dataset-change",
  QUERY_CHANGE: "query-change",
  RUN_QUERY: "run-query",
  SAVE_QUERY: "save-query",
  UNSAVE_QUERY: "unsave-query",
  ADD_RECENT_QUERY: "add-recent-query",
  REMOVE_RECENT_QUERY: "remove-recent-query",
};

function datasetReducer(dataset, action) {
  switch (action.type) {
    case DATASET_ACTION.DATASET_CHANGE: {
      return {
        ...dataset,
        currentDataset: action.payload,
      };
    }
    case DATASET_ACTION.QUERY_CHANGE: {
      if (!action.payload) return dataset;
      return {
        ...dataset,
        currentQuery: action.payload,
      };
    }
    case DATASET_ACTION.RUN_QUERY: {
      if (!dataset.currentQuery) return dataset;
      return {
        ...dataset,
        query: dataset.currentQuery,
      };
    }
    case DATASET_ACTION.SAVE_QUERY: {
      if (!dataset.currentQuery) return dataset;
      return {
        ...dataset,
        queries: {
          ...dataset.queries,
          [dataset.currentDataset]: {
            recent: dataset.queries[dataset.currentDataset].recent,
            saved: [
              { query: dataset.currentQuery, id: Date.now() },
              ...dataset.queries[dataset.currentDataset].saved,
            ],
          },
        },
      };
    }
    case DATASET_ACTION.UNSAVE_QUERY: {
      const index = dataset.queries[dataset.currentDataset].saved.findIndex(
        (saved) => saved.id === action.payload
      );
      if (index === -1) return { ...dataset };

      dataset.queries[dataset.currentDataset].saved.splice(index, 1);

      return {
        ...dataset,
        queries: {
          ...dataset.queries,
          [dataset.currentDataset]: {
            recent: dataset.queries[dataset.currentDataset].recent,
            saved: [...dataset.queries[dataset.currentDataset].saved],
          },
        },
      };
    }
    case DATASET_ACTION.ADD_RECENT_QUERY: {
      if (!dataset.query) return dataset;
      return {
        ...dataset,
        queries: {
          ...dataset.queries,
          [dataset.currentDataset]: {
            saved: dataset.queries[dataset.currentDataset].saved,
            recent: [
              { query: dataset.query, id: Date.now() },
              ...dataset.queries[dataset.currentDataset].recent,
            ],
          },
        },
      };
    }
    case DATASET_ACTION.REMOVE_RECENT_QUERY: {
      dataset.queries[dataset.currentDataset].recent.splice(action.payload, 1);

      const index = dataset.queries[dataset.currentDataset].recent.findIndex(
        (recent) => recent.id === action.payload
      );
      if (index === -1) return { ...dataset };

      dataset.queries[dataset.currentDataset].recent.splice(index, 1);

      return {
        ...dataset,
        queries: {
          ...dataset.queries,
          [dataset.currentDataset]: {
            saved: dataset.queries[dataset.currentDataset].saved,
            recent: [...dataset.queries[dataset.currentDataset].recent],
          },
        },
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialDatasets = {
  currentDataset: DEFAULT_DATASETS[0].id,
  queries: DEFAULT_DATASETS.reduce((acc, dataset) => {
    acc[dataset.id] = {
      saved: [],
      recent: [],
    };
    return acc;
  }, {}),
  currentQuery: "",
  query: "",
};
