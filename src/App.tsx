import "./App.css";
import { useQuery } from "@tanstack/react-query";

import getDictionary from "./dictionaryApi";

function App() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["dictionary"],
    queryFn: getDictionary,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return <div className="text-3xl text-red-400 ">{data[0].word}</div>;
}

export default App;
