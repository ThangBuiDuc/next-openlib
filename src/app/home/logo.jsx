import Link from "next/link";

const Logo = () => {
  return (
    <>
      <div className="flex justify-center mt-[50px]">
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
      <div className="justify-center flex">
        <span className="w-[90%] md:text-[20px] mt-[15px] text-center">
          Hệ thống liên kết nguồn lực thông tin KH&CN TP Hải Phòng
        </span>
      </div>
    </>
  );
};

export default Logo;
