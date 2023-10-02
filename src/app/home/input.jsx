"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
/* RENDER SEARCH BOX */

function Input() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      router.push(`/search?query=${encodeURI(e.target.value)}`);
    }
  };

  return (
    <div className="flex justify-center mt-[15px]">
      <Image
        src="/iconSearch.svg"
        alt="Đây là icon search"
        className="rounded-[40px_0px_0px_40px] pl-[15px] bg-[#b0ddeb80]"
        width={50}
        height={50}
      />
      <input
        className="w-[70%] h-[44px] text-[15px] md:text-[20px] md:h-[50px] pl-[15px] pr-[20px] bg-[#b0ddeb80] rounded-[0px_40px_40px_0px] border-none outline-none"
        placeholder="Nhập vào thông tin tìm kiếm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}

export default Input;
