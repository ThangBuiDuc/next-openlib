import { auth } from "@clerk/nextjs";
import Content from "./content";
import { redirect } from "next/navigation";

export default function SignIn() {
  const { userId } = auth();
  if (userId) redirect("/admin");
  return <Content />;
}
