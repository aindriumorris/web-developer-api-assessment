import React from "react";
import { Select } from "@mantine/core";
import { SortOrder } from "@/types/globalTypes";

export const MovieListSort = ({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}) => {
  const handleSortOrderChange = (value: string | null) => {
    if (value === SortOrder.ASC || value === SortOrder.DESC) {
      setSortOrder(value);
    }
  };

  return (
    <Select
      value={sortOrder}
      onChange={handleSortOrderChange}
      data={[
        { value: SortOrder.ASC, label: "Alphabetically" },
        { value: SortOrder.DESC, label: "Reverse Alphabetically" },
      ]}
      style={{ width: "545px" }}
      styles={(theme) => ({
        input: {
          color: theme.white,
          backgroundColor: theme.black,
          border: "0px solid",
        },
        item: {
          color: theme.white,
          backgroundColor: theme.black,
          "&[data-hovered]": {
            backgroundColor: theme.white,
            color: theme.black,
          },
        },
        dropdown: {
          backgroundColor: theme.black,
          "&[data-hovered]": {
            backgroundColor: theme.white,
            color: theme.black,
          },
        },
      })}
    />
  );
};
