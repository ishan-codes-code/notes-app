import NotesWrapper from "@/components/notes";
import SearchBar from "@/components/searchBar";

export default function Home() {
  return (
    <div className="w-full h-full font-sans px-4 sm:px-12 sm:py-4 space-y-8">
      <SearchBar />

      <h2 className="font-bold text-5xl">Notes</h2>
      <div className="container">
        <NotesWrapper />
      </div>
    </div>
  );
}
