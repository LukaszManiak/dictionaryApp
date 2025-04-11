export default function ErrorMessage({ error }: any) {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-center text-6xl font-black">
      Error: {error.message}
    </div>
  );
}
