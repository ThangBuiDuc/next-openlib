import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {
  createUser,
  deleteUser,
  getListUser,
  updateUser,
} from "@/utils/admin/clerk";

export async function GET() {
  const user = await currentUser();
  if (user.id && user.publicMetadata.isAdmin) {
    const res = await getListUser();

    if (!res.ok)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });
    return NextResponse.json({ result: await res.json() }, { status: 200 });
  } else
    return NextResponse.json({ result: "NOT Authorization!" }, { status: 401 });
}

export async function PATCH(req) {
  const { userId, userName, password } = await req.json();
  const user = await currentUser();
  if (user.id && user.publicMetadata.isAdmin) {
    const res = await updateUser(userId, userName, password);

    if (!res.ok)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });
    return NextResponse.json({ result: "Successfully!" }, { status: 200 });
  } else
    return NextResponse.json({ result: "NOT Authorization!" }, { status: 401 });
}

export async function POST(req) {
  const { userName, email, password, organization } = await req.json();
  const user = await currentUser();
  if (user.id && user.publicMetadata.isAdmin) {
    const res = await createUser(userName, email, password, organization);

    if (!res.ok)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });
    return NextResponse.json({ result: "Successfully!" }, { status: 200 });
  } else
    return NextResponse.json({ result: "NOT Authorization!" }, { status: 401 });
}

export async function DELETE(req) {
  const user = await currentUser();
  if (user.id && user.publicMetadata.isAdmin) {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const res = await deleteUser(userId);

    if (!res.ok)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });
    return NextResponse.json({ result: "Successfully!" }, { status: 200 });
  } else
    return NextResponse.json({ result: "NOT Authorization!" }, { status: 401 });
}
