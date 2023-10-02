"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${encodeURI(query)}`);
    }
  };
  return (
    <input
      className="w-[85%] text-[15px] md:text-[20px] border-none outline-none rounded-[40px_0px_0px_40px] pl-[25px] pr-[25px] md:h-[55px] h-[34px] bg-[#b0ddeb80] "
      type="search"
      value={query}
      placeholder="Nhập thông tin tìm kiếm"
      onKeyDown={(e) => handleKeyPress(e)}
      onChange={(e) => {
        setQuery(e.currentTarget.value);
      }}
    />
  );
};

export default SearchBox;
