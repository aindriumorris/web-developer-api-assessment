import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { uniq } from "lodash";
import { ImdbIdType, imdbIdSchema, urlSchema } from "@/types/globalTypes";

const IMDB_TOP_MOVIES_URL = "https://www.imdb.com/chart/top/";

export async function getTopImdbIds(): Promise<ImdbIdType[]> {
  try {
    const html = await fetchHTML(IMDB_TOP_MOVIES_URL);
    const { imdbIds } = parseAndValidateImdbIDs(html);

    if (imdbIds.length !== 250) {
      const errorMessage = `Expected 250 unique IMDb IDs, but found only ${imdbIds.length}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    return imdbIds;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function fetchHTML(url: string): Promise<string> {
  const result = urlSchema.safeParse(url);
  if (!result.success) {
    throw new Error(`Invalid URL: ${url}`);
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch page from ${url}`);
  return response.text();
}

function parseAndValidateImdbIDs(html: string): { imdbIds: ImdbIdType[] } {
  const $ = cheerio.load(html);
  let imdbIds: ImdbIdType[] = [];

  if ($("a.ipc-title-link-wrapper").length === 0) {
    throw new Error(
      "No elements found matching the class 'ipc-title-link-wrapper'."
    );
  }

  $("a.ipc-title-link-wrapper").each((_, element) => {
    const movieUrl = $(element).attr("href");
    if (!movieUrl) {
      console.error(`Href attribute not found in element:`, element);
      return;
    }

    const match = movieUrl.match(/\/title\/(tt\d{7,8})/);
    const imdbId = match ? match[1] : null;
    if (imdbId) {
      const validationResult = imdbIdSchema.safeParse(imdbId);
      if (validationResult.success) {
        imdbIds.push(imdbId);
      } else {
        console.error(
          `Invalid Title Id: ${imdbId} from ${movieUrl}`,
          validationResult.error.format()
        );
      }
    } else {
      console.error(`Title Id Not Found In URL: ${movieUrl}`);
    }
  });

  if (imdbIds.length === 0) {
    throw new Error(
      "No matching IMDb IDs were found. The page structure may have changed."
    );
  }

  imdbIds = uniq(imdbIds);
  return { imdbIds };
}
