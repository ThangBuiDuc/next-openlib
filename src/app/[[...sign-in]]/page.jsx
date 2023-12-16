import { auth } from "@clerk/nextjs";
import Content from "./content";
import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  const { userId } = auth();
  if (userId) redirect("/");
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
}
