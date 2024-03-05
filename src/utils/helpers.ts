import { z } from 'zod';
import { minBy, maxBy } from 'lodash';
import { MovieType, RatingRange, ReleaseYearRange, ratingRangeSchema, releaseYearRangeSchema } from '@/types/globalTypes';

export const calculateReleaseDateRange = (movies: MovieType[]): ReleaseYearRange => {

    const lowerYear = minBy(movies, 'Year');
    const upperYear = maxBy(movies, 'Year');
  
    const lower = lowerYear ? lowerYear.Year :1900;
  const upper = upperYear ? upperYear.Year : currentYear;

    const result = releaseYearRangeSchema.safeParse({
      lower: lower,
      upper: upper,
    });
  
    if (!result.success) {
        throw new Error("Failed to calculate a valid release date range.");
    }
  
    return result.data;
  };

  export const calculateRatingRange = (movies: MovieType[]): RatingRange => {
   
  const lowestRatedMovie = minBy(movies, 'imdbRating');
  const highestRatedMovie = maxBy(movies, 'imdbRating');

  const lower = lowestRatedMovie ? lowestRatedMovie.imdbRating : 0.0;
  const upper = highestRatedMovie ? highestRatedMovie.imdbRating : 9.9;
  
    const result = ratingRangeSchema.safeParse({
      lower,
      upper,
    });
  
    if (!result.success) {
      throw new Error("Failed to calculate a valid rating range.");
    }
  
    return result.data;
  };


  export function getYearFromTimestamp(timestamp: number): number {
    const date = new Date(timestamp);
    return date.getFullYear();
  }

  export const currentYear = new Date().getFullYear();