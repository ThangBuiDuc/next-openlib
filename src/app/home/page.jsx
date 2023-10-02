// import Image from "next/image";

// import RootLayout from '../layout'
import Logo from "./logo";
import Input from "./input";

export const metadata = {
  title: "Hệ thống liên kết thông tin Khoa học và Công nghệ Hải Phòng",
  description:
    "Hệ thống liên kết nguồn lực thông tin Khoa học và công nghệ thành phố Hải Phòng. Tập hợp tất cả những tài liệu số từ tập hợp các thư viện trên địa bàn thành phố Hải Phòng.",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return (
    <>
      <Logo />
      <Input />
      <div className="flex justify-center mt-[50px]">
        <img src="/home/unitLogo.png" alt="Đây là logo của trang web" />
      </div>
    </>
  );
}
