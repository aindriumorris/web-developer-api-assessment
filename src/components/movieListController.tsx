import React from "react";
import { MovieListView } from "@/components/movieListView";
import { MovieType } from "@/types/globalTypes";

export const MovieListController = ({
  movieData,
}: {
  movieData: MovieType[];
}) => {
  return (
    <div className="flex justify-center mb-4">
      <MovieListView movies={movieData} />
    </div>
  );
};
