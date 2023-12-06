"use client";
import { useState } from "react";
import Header from "./_hardComponents/header/header";
import SideBar from "./_hardComponents/sideBar/sideBar";
import { useUser } from "@clerk/nextjs";
import { sideBarData } from "./_hardComponents/sideBar/sideBarData";
import { usePathname } from "next/navigation";

const LayoutClient = ({ children }) => {
  const pathName = usePathname();
  const breadCrumbs = sideBarData.find((item) => pathName.includes(item.path));
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex">
      <SideBar isOpen={isOpen} user={user} />
      <div
        className={`flex flex-col w-[82%] h-fit transition-all duration-300 ${
          isOpen ? "ml-[18%]" : "!w-[100%]"
        }`}
      >
        <div className="flex flex-col h-[16vh] sticky top-0 z-10">
          <Header setIsOpen={setIsOpen} user={user} />
          <div className="text-sm breadcrumbs pl-[10px] h-[6vh] flex bg-white items-center border-t-bordercl border-[1px]">
            {/* {breadCrumbs ? (
              <ul>
                <li>{breadCrumbs.title}</li>
                {breadCrumbs.subNav ? (
                  <li>
                    {
                      breadCrumbs.subNav.find((item) => item.path === pathName)
                        .title
                    }
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            ) : (
              <span className="loading loading-bars loading-sm"></span>
            )} */}
            <ul>
              <li>{breadCrumbs.title}</li>
              {breadCrumbs.subNav ? (
                <li>
                  {
                    breadCrumbs.subNav.find((item) => item.path === pathName)
                      .title
                  }
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
        <div className="bg-[#EBEDEF] w-full min-h-[84vh]">{children}</div>
      </div>
    </div>
  );
};

export default LayoutClient;
