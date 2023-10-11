import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { getOrganizaion } from "@/utils/admin/meilisearch";

export async function GET() {
  const user = await currentUser();

  if (user.id && user.publicMetadata.isAdmin) {
    let data = await getOrganizaion(process.env.ADMIN_API_KEY_LIB);
    return NextResponse.json({ data }, { status: 200 });
  }
  return NextResponse.json({ data: "Not Authorization!" }, { status: 400 });
}
