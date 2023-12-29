import Content from "./content";
// import { currentUser } from "@clerk/nextjs";

const Page = async () => {
  // const user = await currentUser();
  // if (!user.publicMetadata.isAdmin)
  //   return (
  //     <div className="flex justify-center pt-[20px]">
  //       <h3>Tài khoản hiện tại không có quyền thực hiện chức năng này!</h3>
  //     </div>
  //   );

  return <Content />;
};

export default Page;
