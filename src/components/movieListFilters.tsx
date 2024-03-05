import React, { useRef } from "react";
import { RatingRange, ReleaseYearRange } from "@/types/globalTypes";
import Slider from "@mui/material/Slider";

export const MovieListFilters = ({
  releaseDateRange,
  setReleaseDateRange,
  ratingRange,
  setRatingRange,
  minYear,
  maxYear,
  minRating,
  maxRating,
}: {
  releaseDateRange: ReleaseYearRange;
  setReleaseDateRange: React.Dispatch<React.SetStateAction<ReleaseYearRange>>;
  ratingRange: RatingRange;
  setRatingRange: React.Dispatch<React.SetStateAction<RatingRange>>;
  minYear: number;
  maxYear: number;
  minRating: number;
  maxRating: number;
}) => {
  const releaseYearMarks = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => ({
      value: minYear + i,
      label: (minYear + i).toString(),
    })
  );

  const imdbRatingMarks = Array.from({ length: 11 }, (_, i) => ({
    value: i,
    label: i.toString(),
  }));

  const handleRatingChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setRatingRange({ lower: newValue[0], upper: newValue[1] });
    }
  };
  const handleReleaseYearChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue)) {
      setReleaseDateRange({ lower: newValue[0], upper: newValue[1] });
    }
  };

  return (
    <div className="flex flex-col w-[545px] gap-[40px]">
      <div>
        <h2 className="text-white">Filter by Rating</h2>
        <Slider
          value={[ratingRange.lower, ratingRange.upper]}
          onChange={handleRatingChange}
          valueLabelDisplay="auto"
          min={minRating}
          max={maxRating}
          step={0.1}
          marks={imdbRatingMarks}
          sx={{
            color: "white",
            "& .MuiSlider-thumb": {
              color: "white",
            },
            "& .MuiSlider-rail": {
              color: "#bfbfbf",
            },
            "& .MuiSlider-mark": {
              color: "white",
            },
            "& .MuiSlider-markLabel": {
              color: "white",
            },
          }}
        />
      </div>
      <div>
        <h2 className="text-white">Filter by Year of Release</h2>
        <Slider
          value={[releaseDateRange.lower, releaseDateRange.upper]}
          onChange={handleReleaseYearChange}
          valueLabelDisplay="auto"
          aria-labelledby="year-range-slider"
          min={minYear}
          max={maxYear}
          step={1}
          marks={releaseYearMarks}
          sx={{
            color: "white",
            "& .MuiSlider-thumb": {
              color: "white",
            },
            "& .MuiSlider-rail": {
              color: "#bfbfbf",
            },
            "& .MuiSlider-mark": {
              color: "white",
            },
            "& .MuiSlider-markLabel": {
              color: "white",
            },
          }}
        />
      </div>
    </div>
  );
};
