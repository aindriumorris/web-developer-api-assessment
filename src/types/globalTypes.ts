import { z } from "zod";
import { currentYear } from "@/utils/helpers";

export type ImdbIdType = z.infer<typeof imdbIdSchema>;
export type MovieType = z.infer<typeof movieDataSchema>;
export type ReleaseYearRange = z.infer<typeof releaseYearRangeSchema>;
export type RatingRange = z.infer<typeof ratingRangeSchema>;

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

const MonthAbbrSchema = z.enum([
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]);

const monthMap: { [key: string]: number } = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

export const releaseDateSchema = z
  .string()
  .regex(/^\d{2} \w{3} \d{4}$/, "Invalid release date format")
  .transform((dateString) => {
    const [day, monthAbbr, year] = dateString.split(" ");
    const month = MonthAbbrSchema.parse(monthAbbr);
    const monthNumber = monthMap[month];
    const date = new Date(Number(year), monthNumber, Number(day));
    return date.toISOString();
  });

export const urlSchema = z.string().url();

export const ratingRangeSchema = z.object({
  lower: z
    .number()
    .min(0.0, "Rating must be at least 0.0")
    .max(9.9, "Rating cannot exceed 9.9"),
  upper: z
    .number()
    .min(0.0, "Rating must be at least 0.0")
    .max(9.9, "Rating cannot exceed 9.9"),
});

export const imdbRatingSchema = z
  .string()
  .regex(/^[0-9](\.\d)$/, "Invalid IMDb rating format")
  .transform((rating) => parseFloat(rating));

export const imdbIdSchema = z
  .string()
  .regex(/^tt\d{7,8}$/, "Invalid IMDb ID format");

export const releaseYearSchema = z
  .string()
  .regex(/^\d{4}$/, "Year must be a four-digit number")
  .transform((year) => parseInt(year, 10))
  .refine((year) => year >= 1900 && year <= currentYear, {
    message: `Year must be between 1900 and ${currentYear}`,
  });

const yearNumberSchema = z
  .number()
  .min(1900, "Year must be no earlier than 1900")
  .max(currentYear, `Year must be no later than ${currentYear}`);

export const releaseYearRangeSchema = z
  .object({
    lower: yearNumberSchema,
    upper: yearNumberSchema,
  })
  .refine((data) => data.upper >= data.lower, {
    message: "Upper year must be greater than or equal to lower year",
  });

const omdbMovieSchema = z.object({
  Title: z.string(),
  Year: releaseYearSchema,
  Rated: z.string(),
  Released: releaseDateSchema,
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Writer: z.string(),
  Actors: z.string(),
  Plot: z.string(),
  Language: z.string(),
  Country: z.string(),
  Awards: z.string(),
  Poster: z.string(),
  Ratings: z.array(
    z.object({
      Source: z.string(),
      Value: z.string(),
    })
  ),
  Metascore: z.string(),
  imdbRating: imdbRatingSchema,
  imdbVotes: z.string(),
  imdbID: imdbIdSchema,
  Type: z.string(),
  DVD: z.string().optional(),
  BoxOffice: z.string().optional(),
  Production: z.string().optional(),
  Website: z.string().url().optional(),
  Response: z.literal("True"),
});

export const movieDataSchema = omdbMovieSchema
  .pick({
    Title: true,
    Year: true,
    Rated: true,
    Released: true,
    Runtime: true,
    Director: true,
    Writer: true,
    Actors: true,
    Plot: true,
    Poster: true,
    imdbRating: true,
    imdbID: true,
  })
  .strip();
