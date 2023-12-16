import LayoutClient from "./layoutClient";
import { currentUser } from "@clerk/nextjs";
import { notFound } from "next/navigation";
const Layout = async ({ children }) => {
  const user = await currentUser();
  if (Object.keys(user.publicMetadata).length === 0) return notFound();
  return <LayoutClient>{children}</LayoutClient>;
};

export default Layout;
