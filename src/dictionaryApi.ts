export default async function getDictionary(): Promise<any> {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/hello`
    );

    if (!response.ok) {
      throw new Error(`Something went wrong`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching dictionary data:", error);
    return null;
  }
}
