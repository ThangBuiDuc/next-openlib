import Content from "./content";

export function generateMetadata({ searchParams }) {
  return {
    title: `${
      searchParams.query === "" ? "" : `${searchParams.query} - `
    }Tìm kiếm`,
    description: "Trang tìm kiếm tài liệu của hệ thống liên kết thư viện!",
  };
}
const Page = () => {
  return (
    <>
      <Content />
    </>
  );
};

export default Page;
