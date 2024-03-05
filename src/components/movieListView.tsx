import React, { useState } from "react";
import {
  MovieType,
  RatingRange,
  ReleaseYearRange,
  SortOrder,
} from "@/types/globalTypes";
import {
  calculateRatingRange,
  calculateReleaseDateRange,
} from "@/utils/helpers";
import { useSortedAndFilteredMovies } from "@/hooks/useMovieData";
import { MovieList } from "@/components/movieList";
import { MovieFilterDropdown, MovieSortDropdown } from "@/components/dropDown";

export const MovieListView = ({ movies }: { movies: MovieType[] }) => {
  const [releaseYearRange, setReleaseDateRange] = useState<ReleaseYearRange>(
    calculateReleaseDateRange(movies)
  );
  const [ratingRange, setRatingRange] = useState<RatingRange>(
    calculateRatingRange(movies)
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);

  const sortedAndFilteredMovies = useSortedAndFilteredMovies({
    movies,
    releaseYearRange,
    ratingRange,
    sortOrder,
  });

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-row gap-[30px]">
        <MovieFilterDropdown
          releaseDateRange={releaseYearRange}
          setReleaseDateRange={setReleaseDateRange}
          ratingRange={ratingRange}
          setRatingRange={setRatingRange}
        />
        <MovieSortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
      <MovieList movies={sortedAndFilteredMovies} />
    </div>
  );
};
