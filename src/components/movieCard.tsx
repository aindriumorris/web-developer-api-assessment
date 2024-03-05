import React from "react";
import { MovieType } from "@/types/globalTypes";

export const MovieCard = ({ movie }: { movie: MovieType }) => {
  const IMDBMOVIEURL = `https://www.imdb.com/title/${movie.imdbID}/`;

  return (
    <div className="flex flex-col relative cursor-pointer w-[400px] h-[690px] overflow-hidden p-[15px] border-[1px] gap-[32px]">
      <a
        href={IMDBMOVIEURL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white no-underline"
      >
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-[376px] h-[530px] hover:opacity-50"
        />
        <div className="h-[83px] w-[376px] gap-[35px] flex flex-col">
          <div className="px-[15px] h-[28px] font-oxanium font-normal text-[28px] leading-[28px]">
            {movie.Title}
          </div>
          <div className="flex flex-row justify-between items-center px-[15px]">
            <div className="font-oxanium font-normal text-[20px] leading-[20px]">
              {movie.imdbRating}
            </div>
            <div className="font-oxanium font-normal text-[20px] leading-[20px]">
              Released Date {movie.Released}
            </div>
          </div>
        </div>
        <div className="movie-info absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 flex flex-col justify-center items-center p-4 hover:opacity-100">
          <p>Released: {String(movie.Released)}</p>
          <p>Runtime: {movie.Runtime}</p>
          <div className="text-sm">
            <p>Director: {movie.Director}</p>
            <p>Writer: {movie.Writer}</p>
            <p>Actors: {movie.Actors}</p>
          </div>
          <p className="mt-2 text-xs">{movie.Plot}</p>
        </div>
      </a>
    </div>
  );
};

export default MovieCard;

/*


*/
