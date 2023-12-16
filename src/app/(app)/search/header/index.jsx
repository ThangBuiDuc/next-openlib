import Link from "next/link";
import CustomSearchBox from "./searchBox";
import Autocomplete from "./autoComplete";
import { useClerk } from "@clerk/nextjs";
// import Image from "next/image.js";
export default function Index({ fullName, publicMetadata }) {
  const { signOut } = useClerk();
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
        <Autocomplete
          placeholder="Nhập vào thông tin tìm kiếm"
          detachedMediaQuery="none"
          openOnFocus
        />
      </div>
      {!fullName && !publicMetadata ? (
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
      )}
    </div>
  );
}
