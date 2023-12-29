"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SubContent from "./subContent";
import { useUser } from "@clerk/nextjs";

const Content = () => {
  const { user } = useUser();
  const [listUser, setListUser] = useState(null);
  const data = useQuery({
    queryKey: ["ADMIN_LIST_USER"],
    queryFn: async () => {
      return await fetch(`/api/clerk`, {
        method: "GET",
      }).then((res) => res.json());
    },
  });
  console.log(data);
  useEffect(() => {
    if (data.data)
      setListUser(
        !user.publicMetadata.isAdmin
          ? data.data.result
              .map((item) => ({
                ...item,
                isChecked: false,
              }))
              .filter(
                (item) =>
                  item.public_metadata.organization ===
                  user.publicMetadata.organization
              )
          : data.data.result.map((item) => ({
              ...item,
              isChecked: false,
            }))
      );
  }, [data.data]);

  if (data.isFetching && data.isLoading) {
    return (
      <div className="flex flex-col p-[10px] gap-[10px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    listUser && (
      <div className="flex flex-col p-[10px] gap-[10px]">
        {listUser.map((item) => (
          <div key={item.id} className="collapse collapse-arrow bg-base-300">
            <input
              type="radio"
              name="my-accordion-2"
              value={item.isChecked}
              onChange={() =>
                setListUser((pre) =>
                  pre.map((el) =>
                    el.id === item.id
                      ? { ...el, isChecked: true }
                      : { ...el, isChecked: false }
                  )
                )
              }
            />
            <div className="collapse-title text-xl font-medium">
              {item.public_metadata.organization}
            </div>
            <div className="collapse-content ">
              <SubContent data={item} isRefetching={data.isRefetching} />
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Content;
