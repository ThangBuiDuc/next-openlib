import Content from "./content";
import { currentUser } from "@clerk/nextjs";
export function generateMetadata({ searchParams }) {
  return {
    title: `${
      searchParams.query === "" ? "" : `${searchParams.query} - `
    }Tìm kiếm`,
    description: "Trang tìm kiếm tài liệu của hệ thống liên kết thư viện!",
  };
}
const Page = async () => {
  const user = await currentUser();
  if (user?.id)
    return (
      <Content
        fullName={`${user.firstName} ${user.lastName}`}
        publicMetadata={user.publicMetadata}
      />
    );

  return <Content />;
};

export default Page;
