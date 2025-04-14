import { DictionaryDefinition } from "./App";

export default async function getDictionary(
  word: string
): Promise<DictionaryDefinition[] | null> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) {
      throw new Error(
        `Something went wrong. Please refresh the page and try again.`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dictionary data:", error);
    throw error;
  }
}
