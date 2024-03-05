import React from "react";
import MovieCard from "@/components/movieCard"; // Make sure to import your MovieCard component
import { MovieType } from "@/types/globalTypes";

export const MovieList = ({ movies }: { movies: MovieType[] }) => {
  return (
    <div className="w-[1220px] mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};
