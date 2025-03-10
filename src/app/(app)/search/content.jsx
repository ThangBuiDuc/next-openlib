"use client";
import { useEffect, useState } from "react";
import Header from "./header";
import LeftPanel from "./leftPanel";
import RightPanel from "./rightPanel";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { Configure } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import NavMobile from "./navMobile";
import ScrollToTop from "react-scroll-to-top";
import { BsArrowUpSquareFill } from "react-icons/bs";
import { createContext } from "react";

export const searchClientContext = createContext(null);

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_HOST,
  process.env.NEXT_PUBLIC_API_KEY,
  {
    primaryKey: "uuid",
    keepZeroFacets: true,
  }
);

export const dynamic = "force-dynamic";

export default function SearchPage({ fullName, publicMetadata }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(1);

  useEffect(() => {
    const handleWidthChage = () => {
      window.innerWidth > 768 && setIsOpen(false);
    };

    window.addEventListener("resize", handleWidthChage);

    return () => {
      window.removeEventListener("resize", handleWidthChage);
    };
  }, []);

  return (
    <searchClientContext.Provider value={searchClient}>
      <div className="flex flex-col">
        <InstantSearchNext indexName="collection" searchClient={searchClient}>
          <Configure
            hitsPerPage={9}
            attributesToSnippet={["description_abstract:50"]}
            snippetEllipsisText={"..."}
          />
          <ScrollToTop
            component={<BsArrowUpSquareFill size={30} />}
            smooth
            style={{ width: 30, height: 30 }}
            className="!right-[20px] md:!right-[40px] !bottom-[20px] md:!bottom-[40px]"
          />
          <NavMobile isOpen={isOpen} setIsOpen={setIsOpen} />
          <Header fullName={fullName} publicMetadata={publicMetadata} />
          <div className="flex gap-[20px] p-[5px] md:p-0">
            <LeftPanel isOpen={isOpen} setIsOpen={setIsOpen} />
            <RightPanel />
          </div>
        </InstantSearchNext>
      </div>
    </searchClientContext.Provider>
  );
}
