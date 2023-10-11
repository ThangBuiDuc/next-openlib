import Link from "next/link";
import CustomSearchBox from "./searchBox";
// import Image from "next/image.js";
export default function Index() {
  return (
    <div className="flex-col md:flex-row flex border-b-[1px] border-solid border-black top-0 left-0 p-[10px] float-left gap-[10px] w-full">
      <div className="flex justify-center">
        <Link
          href="/"
          className=" text-[40px] md:text-[55px] self-auto text-left font-medium "
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
      <div className="flex w-full md:w-[70%] justify-center md:justify-normal items-center">
        <CustomSearchBox />
        <img
          src="/iconSearch.svg"
          alt="Đây là icon search"
          className="rounded-[0px_40px_40px_0px] pr-[5px] bg-[#b0ddeb80] h-[34px] md:h-[55px]"
        />
      </div>
    </div>
  );
}
