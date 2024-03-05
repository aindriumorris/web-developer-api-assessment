import React, { useRef } from "react";
import { Menu, Text, Button, Flex } from "@mantine/core";
import { MovieListFilters } from "./movieListFilters"; // Import your filter component
import { RatingRange, ReleaseYearRange, SortOrder } from "@/types/globalTypes";
import { MovieListSort } from "./movieListSort"; // Import your sort component

export const MovieFilterDropdown = ({
  releaseDateRange,
  setReleaseDateRange,
  ratingRange,
  setRatingRange,
}: {
  releaseDateRange: ReleaseYearRange;
  setReleaseDateRange: React.Dispatch<React.SetStateAction<ReleaseYearRange>>;
  ratingRange: RatingRange;
  setRatingRange: React.Dispatch<React.SetStateAction<RatingRange>>;
}) => {
  const minYear = useRef(releaseDateRange.lower).current;
  const maxYear = useRef(releaseDateRange.upper).current;

  const minRating = useRef(ratingRange.lower).current;
  const maxRating = useRef(ratingRange.upper).current;

  return (
    <div>
      <Menu>
        <Menu.Target>
          <Button
            style={{
              width: "595px",
              height: "36px",
              padding: "10px 20px",
              borderRadius: "100px",
              border: "1px solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: "16px",
                lineHeight: "16px",
                fontWeight: "400",
              }}
            >
              Filter Movies By
            </Text>
          </Button>
        </Menu.Target>
        <Menu.Dropdown
          style={{
            backgroundColor: "black",
            padding: "10px",
          }}
        >
          <Menu.Item>
            <MovieListFilters
              releaseDateRange={releaseDateRange}
              setReleaseDateRange={setReleaseDateRange}
              ratingRange={ratingRange}
              setRatingRange={setRatingRange}
              minYear={minYear}
              maxYear={maxYear}
              minRating={minRating}
              maxRating={maxRating}
            />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export const MovieSortDropdown = ({
  sortOrder,
  setSortOrder,
}: {
  sortOrder: SortOrder;
  setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
}) => {
  return (
    <div>
      <Menu>
        <Menu.Target>
          <Button
            style={{
              width: "595px",
              height: "36px",
              padding: "10px 20px",
              borderRadius: "100px",
              border: "1px solid",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: "16px",
                lineHeight: "16px",
                fontWeight: "400",
              }}
            >
              Sort Results
            </Text>
          </Button>
        </Menu.Target>
        <Menu.Dropdown
          style={{
            backgroundColor: "black",
            padding: "10px",
          }}
        >
          <MovieListSort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
