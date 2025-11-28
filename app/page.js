import NotesWrapper from "@/components/notes";
import SearchBar from "@/components/searchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen font-sans px-4  sm:px-12 sm:py-8 space-y-8 sm:space-y-12">
      <SearchBar />
      <h2 className="font-bold text-5xl sm:text-6xl">Notes</h2>
      <div className="mx-auto container">
        <NotesWrapper />
      </div>
    </div>
  );
}
