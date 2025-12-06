"use client";

import { useMyContext } from "@/context/context";
import { Search } from "lucide-react";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useMyContext();
  return (
    <div className="flex items-center justify-between">
      <div className="max-w-md relative border border-gray-300 w-full p-2 rounded-lg sm:p-0 sm:rounded-none sm:border-none">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          id="search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="w-full  pl-10  rounded-lg  disabled:opacity-60 disabled:cursor-not-allowed outline-none"
        />
      </div>
      <img
        src="./logoText.png"
        className="sm:block hidden w-42 mix-blend-multiply"
        alt=""
      />
    </div>
  );
};

export default SearchBar;
