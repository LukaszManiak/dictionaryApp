import "./App.css";
import { useQuery } from "@tanstack/react-query";
import getDictionary from "./dictionaryApi";
import LoadingMessage from "./components/LoadingMessage";
import ErrorMessage from "./components/ErrorMessage";
import { useForm } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  dictionaryRequired: string;
};

function App() {
  const [searchTerm, setSearchTerm] = useState("dictionary");

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

  if (isPending) return <LoadingMessage />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <main className="w-1/2 flex flex-col gap-y-4 p-6 mx-auto">
      <div className="flex justify-between items-center">
        <p className="text-4xl font-bold tracking-widest">Dicto</p>
        <button className="rounded-full bg-accent text-background">Mode</button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex gap-2">
        <input
          {...register("dictionaryRequired", { required: true })}
          type="text"
          placeholder="Find your word"
          className="rounded-full p-2 flex-1 bg-gray-100"
        />
        <button
          type="submit"
          className="bg-purple-400 rounded-full px-4 py-2 cursor-pointer"
        >
          Search
        </button>
      </form>
      {errors.dictionaryRequired && (
        <span className="text-red-500">This field is required!</span>
      )}

      <h1 className="text-6xl font-bold tracking-wider">{data?.[0]?.word}</h1>
      <h2 className="text-4xl text-purple-400">{data?.[0]?.phonetic}</h2>

      {data?.[0].meanings.map((m, i: number) => {
        return (
          <div key={i}>
            <p>{m.partOfSpeech}</p>
            <p>Meaning</p>
            <ul className="list-disc list-inside">
              {m.definitions.map((def, defInd: number) => (
                <li key={defInd}>{def.definition}</li>
              ))}
            </ul>
            <p>{m.synonyms}</p>
          </div>
        );
      })}

      <span className="text-gray-500">
        Source{" "}
        <a target="_blank" href={data?.[0].sourceUrls}>
          {data?.[0].sourceUrls}
        </a>
      </span>
    </main>
  );
}

export default App;
