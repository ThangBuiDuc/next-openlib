"use client";

import { useState } from "react";
import Search from "./search";

const Content = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="w-full flex flex-col items-center p-[20px] gap-[20px]">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        placeholder="Nhập vào nội dung tìm kiếm"
        className="input input-bordered w-[70%]"
      />
      <Search query={query} />
    </div>
  );
};

export default Content;
