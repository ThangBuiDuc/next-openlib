import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideBarData } from "./sideBarData";
import NestedNav from "./nestedNav";
import { useState } from "react";

const SideBar = ({ isOpen }) => {
  const pathName = usePathname();
  const [rootData, setRootData] = useState(
    sideBarData.map((item) =>
      pathName.includes(item.path)
        ? { ...item, isChecked: true }
        : { ...item, isChecked: false }
    )
  );
  return (
    <div
      className={`w-[18%] h-screen flex flex-col bg-[#3C4B64] fixed transition-all duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-[-100%]"
      }`}
    >
      <div className="flex justify-center h-[10%] bg-[#303C54]">
        <Link
          href="/admin/dashboard"
          className=" text-[40px] self-center text-center font-medium "
        >
          <span className="text-[#00d5a2]">@</span>
          <span className="text-[#4d8cf5]">H</span>
          <span className="text-[#ea4335]">p</span>
          <span className="text-[#fbbc04]">s</span>
          <span className="text-[#4d8cf5]">t</span>
          <span className="text-[#3aab58]">i</span>
          <span className="text-[#eb4f42]">n</span>
        </Link>
      </div>
      {rootData.map((item) => {
        if (!item.subNav) {
          return (
            <Link
              key={item.id}
              className={`text-[#BDE0EC] w-full h-[8vh] items-center flex pl-[15px]  ${
                pathName === item.path ? "bg-[#46546C]" : "hover:bg-[#46546C]"
              }`}
              href={item.path}
            >
              <p>{item.title}</p>
            </Link>
          );
        }

        return (
          <NestedNav key={item.id} data={item} setRootData={setRootData} />
        );
      })}
      {/* <Link
        className={`text-[#BDE0EC] w-full h-[8%] items-center flex pl-[15px]  ${
          pathName === "/admin/dashboard"
            ? "bg-[#46546C]"
            : "hover:bg-[#46546C]"
        }`}
        href={"/admin/dashboard"}
      >
        <p>Tổng quan</p>
      </Link>

      <Link
        className={`text-[#BDE0EC] w-full h-[8%] items-center flex pl-[15px]  ${
          pathName === "/admin/manage-unit"
            ? "bg-[#46546C]"
            : "hover:bg-[#46546C]"
        }`}
        href={"/admin/manage-unit"}
      >
        <p>Quản trị thành viên</p>
      </Link>

      <Link
        className={`text-[#BDE0EC] w-full h-[8%] items-center flex pl-[15px]  ${
          pathName === "/admin/manage-documents"
            ? "bg-[#46546C]"
            : "hover:bg-[#46546C]"
        }`}
        href={"/admin/manage-documents"}
      >
        <p>Quản trị dữ liệu</p>
      </Link> */}
    </div>
  );
};

export default SideBar;
