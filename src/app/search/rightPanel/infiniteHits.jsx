"use client";
import { useEffect, useRef } from "react";
import { useInfiniteHits } from "react-instantsearch";

export default function Index({ hitComponent: HitComponent, ...props }) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);
  const sentinelRef = useRef(null);
  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  return (
    <div className="pb-[1px]">
      <ul className="flex flex-col gap-[10px] w-full pr-[5px]">
        {hits.map((hit) => (
          <li
            key={hit.objectID}
            className="border-solid transparent rounded-[3px] m-[0_0_3px] pd-[1rem] shadow-[0_2px_5px_0_#e3e5ec] drop-shadow-[0_1px_#fff]"
          >
            <HitComponent hit={hit} />
          </li>
        ))}
        {/* {isLastPage === false ? (
          <button onClick={() => showMore()}>Show More</button>
        ) : (
          ""
        )} */}
        <li ref={sentinelRef} aria-hidden="true" />
      </ul>
    </div>
  );
}
