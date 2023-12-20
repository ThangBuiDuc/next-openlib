"use client";
import Link from "next/link";
import SearchBox from "./searchBox";
import { useClerk } from "@clerk/nextjs";

const Index = ({ fullName, publicMetadata }) => {
  const { signOut } = useClerk();
  return (
    <div className="md:flex-row flex-col flex border-b border-black">
      <div className=" flex justify-center p-[5px]">
        <Link
          href="/"
          className="h-auto text-[40px] md:text-[55px] self-auto text-left font-bold"
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
      <div className="flex w-full justify-center md:justify-normal md:w-[70%] items-center p-[5px]">
        <SearchBox />
        <img
          src="/iconSearch.svg"
          alt="Đây là icon search"
          className="rounded-[0px_40px_40px_0px] pr-[5px] bg-[#b0ddeb80] h-[34px] md:h-[55px]"
        />
      </div>
      {/* {!fullName && !publicMetadata ? (
        <></>
      ) : (
        <div className="flex justify-center flex-col">
          {Object.keys(publicMetadata).length > 0 ? (
            <>
              <h3>{publicMetadata.organization}</h3>
              <button onClick={() => signOut()}>Đăng xuất</button>
            </>
          ) : (
            <>
              <h3>{fullName}</h3>
              <button onClick={() => signOut()}>Đăng xuất</button>
            </>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Index;
