interface ErrorMessageProps {
  error: Error;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center gap-y-8 items-center text-center ">
      <h1 className="text-4xl font-black">Error: {error.message}</h1>
      <button
        onClick={handleReload}
        className="px-6 py-3 cursor-pointer bg-purple-600 text-white rounded-xl text-xl font-bold hover:bg-purple-700 transition-all ease-in-out duration-200"
      >
        Refresh Page
      </button>
    </div>
  );
}
