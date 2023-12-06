import { useState, useEffect, useCallback } from "react";
// import { useSearchBox } from "react-instantsearch";
import { useSearchBox } from "react-instantsearch-hooks-web";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Tìm kiếm",
// };

export default function SearchBox() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(
    searchParams.get("query") ? decodeURI(searchParams.get("query")) : ""
  );
  const { refine } = useSearchBox();

  useEffect(() => {
    refine(decodeURI(searchParams.get("query")));
  }, []);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    refine(query);
    router.push(pathName + "?" + createQueryString("query", query));
  }, [query]);

  return (
    <>
      <input
        className="w-[85%] text-[15px] md:text-[20px] border-none outline-none rounded-[40px_0px_0px_40px] pl-[25px] pr-[25px] md:h-[55px] h-[34px] bg-[#b0ddeb80]"
        type="search"
        value={query}
        placeholder="Nhập thông tin tìm kiếm"
        onChange={(e) => {
          setQuery(e.currentTarget.value);
        }}
      />
    </>
  );
}
