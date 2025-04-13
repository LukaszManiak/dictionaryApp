import "./App.css";
import { useQuery } from "@tanstack/react-query";
import getDictionary from "./dictionaryApi";
import LoadingMessage from "./components/LoadingMessage";
import ErrorMessage from "./components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

type Inputs = {
  dictionaryRequired: string;
};

export type DictionaryDefinition = {
  word: string;
  phonetic?: string;
  synonyms?: string[];
  sourceUrls?: string[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
      synonyms?: string[];
      antonyms?: string[];
    }[];
  }[];
};

function App() {
  const [searchTerm, setSearchTerm] = useState("dictionary");
  const [darkMode, setDarkMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["dictionary", searchTerm],
    queryFn: () => getDictionary(searchTerm),
  });

  const onSubmit = (formData: Inputs) => {
    setSearchTerm(formData.dictionaryRequired);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (isPending) return <LoadingMessage />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <main className="w-full xl:w-1/2 flex flex-col gap-y-6 p-12 xl:p-8 mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-4xl font-bold tracking-widest">Dicto</p>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full bg-[var(--primary)] px-4 py-2 text-background cursor-pointer"
        >
          Mode
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex gap-2">
        <input
          {...register("dictionaryRequired", { required: true })}
          type="text"
          placeholder="Find your word"
          className="rounded-full text-[var(--text)] border-2 border-[var(--accent)] px-6 py-2 flex-1 "
        />
        <button
          type="submit"
          className="bg-[var(--accent)] text-[var(--background)] rounded-full px-4 py-2 cursor-pointer"
        >
          Search
        </button>
      </form>
      {errors.dictionaryRequired && (
        <span className="text-red-500">This field is required!</span>
      )}

      <h1 className="text-6xl font-bold tracking-wider">{data?.[0]?.word}</h1>
      <h2 className="text-4xl text-purple-400">{data?.[0]?.phonetic}</h2>

      {data?.[0].meanings.map((m, i) => (
        <div className="gap-y-4 flex flex-col" key={i}>
          <p className="font-bold text-2xl">{m.partOfSpeech}</p>
          <p className="font-bold text-3xl">Meaning</p>
          <ul className="list-disc list-inside ">
            {m.definitions.map((def, defInd) => (
              <li key={defInd}>
                {def.definition}

                {def.example && (
                  <p className="text-sm italic text-gray-500">
                    Example: “{def.example}”
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <span className="text-gray-500">
        Source{" "}
        {data?.[0].sourceUrls?.map((url, i) => (
          <a
            key={i}
            className="text-purple-300 break-words block"
            target="_blank"
            href={url}
            rel="noopener noreferrer"
          >
            {url}
          </a>
        ))}
      </span>
    </main>
  );
}

export default App;
