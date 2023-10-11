"use client";
import { useState } from "react";
import Header from "./_hardComponents/header/header";
import SideBar from "./_hardComponents/sideBar/sideBar";
import { useUser } from "@clerk/nextjs";
import { sideBarData } from "./_hardComponents/sideBar/sideBarData";
import { usePathname } from "next/navigation";
const Layout = ({ children }) => {
  const pathName = usePathname();
  const breadCrumbs = sideBarData.find((item) => pathName.includes(item.path));
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex">
      <SideBar isOpen={isOpen} user={user} />
      <div
        className={`flex flex-col w-[82%] h-screen transition-all duration-300 ${
          isOpen ? "ml-[18%]" : "!w-[100%]"
        }`}
      >
        <Header setIsOpen={setIsOpen} user={user} />
        <div className="text-sm breadcrumbs h-[5%] pl-[10px] flex items-center border-t-bordercl border-[1px]">
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
        <div className="bg-[#EBEDEF] w-full h-[85%]">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
