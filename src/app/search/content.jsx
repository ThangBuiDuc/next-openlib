"use client";
import Header from "./header";
import LeftPanel from "./leftPanel";
import RightPanel from "./rightPanel";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { Configure } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import NavMobile from "./navMobile";

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_HOST,
  process.env.NEXT_PUBLIC_API_KEY,
  {
    primaryKey: "uuid",
    keepZeroFacets: true,
  }
);

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <div className="flex flex-col">
      <InstantSearchNext indexName="collection" searchClient={searchClient}>
        <Configure
          hitsPerPage={9}
          attributesToSnippet={["description_abstract:50"]}
          snippetEllipsisText={"..."}
        />
        <NavMobile />
        <Header />
        <div className="flex gap-[20px] p-[5px] md:p-0">
          <LeftPanel />
          <RightPanel />
        </div>
      </InstantSearchNext>
    </div>
  );
}
