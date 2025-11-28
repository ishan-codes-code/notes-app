import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div>
      <div className="max-w-md relative border border-gray-300 w-full p-2 rounded-lg sm:p-0 sm:rounded-none sm:border-none">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          id="search"
          type="search"
          placeholder="Search"
          className="w-full  pl-10  rounded-lg  disabled:opacity-60 disabled:cursor-not-allowed outline-none"
        />
      </div>
    </div>
  );
};

export default SearchBar;
