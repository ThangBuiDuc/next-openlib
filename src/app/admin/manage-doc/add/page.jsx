import Content from "./content";
import { currentUser } from "@clerk/nextjs";
const Page = async () => {
  const user = await currentUser();
  return <Content publicMetadata={user.publicMetadata} />;
};

export default Page;
