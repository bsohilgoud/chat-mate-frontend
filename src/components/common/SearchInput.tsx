import React from "react";
import { CiSearch } from "react-icons/ci";

export const SearchInput = ({ onChange }) => {
  return (
    <div className="search-input flex align-items-center relative gap-2  br-10 bg-[var(--primary-color)] rounded-xl mt-2 px-3 py-2 focus-within:border-b-[.5px] focus-within:border-b-[var(--accent-color)]">
      <CiSearch className="size-8" />
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 outline-none "
        onChange={onChange}
      />
    </div>
  );
};
