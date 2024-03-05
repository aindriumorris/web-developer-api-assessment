import { Title } from "@/components/movieListTitle";
import { MovieListController } from "@/components/movieListController";
import { MovieType } from "@/types/globalTypes";
import { getMoviesData } from "@/services/getMovieData";
import { getTopImdbIds } from "@/services/getTopImdbIds";

export default function Home({ movieData }: { movieData: MovieType[] }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-12 pb-2.5 px-2.5 gap-10">
      <Title text={"Latest Movie Reviews"} />
      <MovieListController movieData={movieData} />
    </main>
  );
}

export async function getStaticProps() {
  try {
    const topImdbIds = await getTopImdbIds();
    const movieData = await getMoviesData(topImdbIds);

    const sampleImdbIds = ["tt1160419", "tt1517268", "tt15398776"];

    return {
      props: { movieData },
      revalidate: 86400,
    };
  } catch (error) {
    console.error("Failed to load movies:", error);
    return {
      props: { topMoviesData: [], sampleMoviesData: [] },
    };
  }
}
