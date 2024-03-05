import axios from "axios";
import { compact, map } from "lodash";
import { ImdbIdType, MovieType, movieDataSchema } from "@/types/globalTypes";

const OMDB_API_KEY = process.env.OMDB_API_KEY;

export async function getMoviesData(
  imdbIds: ImdbIdType[]
): Promise<MovieType[]> {
  const movies = await Promise.all(
    map(imdbIds, async (id: ImdbIdType) => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/`, {
          params: {
            i: id,
            apikey: OMDB_API_KEY,
          },
          timeout: 10000,
        });

        const movieData = response.data;
        console.log(movieData);
        const parseResult = movieDataSchema.safeParse(movieData);
        if (!parseResult.success) {
          console.error(
            `Validation failed for movie with ID: ${id}`,
            parseResult.error.format()
          );
          return null;
        }

        return parseResult.data;
      } catch (error) {
        console.error(`Error processing movie with ID: ${id}`, error);
        return null;
      }
    })
  );

  return compact(movies);
}
