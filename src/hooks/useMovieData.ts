import { useMemo } from "react";
import { filter, orderBy } from "lodash";
import {
  MovieType,
  SortOrder,
  RatingRange,
  ReleaseYearRange,
} from "@/types/globalTypes";

export function useSortedAndFilteredMovies({
  movies,
  releaseYearRange,
  ratingRange,
  sortOrder,
}: {
  movies: MovieType[];
  releaseYearRange: ReleaseYearRange;
  ratingRange: RatingRange;
  sortOrder: SortOrder;
}): MovieType[] {
  const filteredMovies = useFilteredMovies({
    movies,
    releaseYearRange,
    ratingRange,
  });
  const sortedMovies = useSortedMovies({ movies: filteredMovies, sortOrder });
  return sortedMovies;
}

function useFilteredMovies({
  movies,
  releaseYearRange,
  ratingRange,
}: {
  movies: MovieType[];
  releaseYearRange: ReleaseYearRange;
  ratingRange: RatingRange;
}): MovieType[] {
  return useMemo(() => {
    return filter(movies, (movie) => {
      const year = movie.Year;
      const rating = movie.imdbRating;
      return (
        year >= releaseYearRange.lower &&
        year <= releaseYearRange.upper &&
        rating >= ratingRange.lower &&
        rating <= ratingRange.upper
      );
    });
  }, [movies, releaseYearRange, ratingRange]);
}

function useSortedMovies({
  movies,
  sortOrder,
}: {
  movies: MovieType[];
  sortOrder: SortOrder;
}): MovieType[] {
  return useMemo(() => {
    const order = sortOrder === SortOrder.ASC ? "asc" : "desc";
    return orderBy(movies, ["Title"], [order]);
  }, [movies, sortOrder]);
}
