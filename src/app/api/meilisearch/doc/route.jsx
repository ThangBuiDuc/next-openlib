import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { addOrUpdateDoc, deleteDoc, search } from "@/utils/admin/meilisearch";
import { v4 as uuidv4 } from "uuid";
const jwt = require("jsonwebtoken");

export async function POST(req) {
  const user = await currentUser();
  const body = await req.json();

  if (user.id && user.publicMetadata.isAdmin) {
    let data = await search(body, process.env.ADMIN_API_KEY_LIB);
    if (!data.ok)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });
    return NextResponse.json(await data.json(), { status: 200 });
  }

  if (user.id && !user.publicMetadata.isAdmin) {
    const tokenPayload = {
      searchRules: {
        collection: {
          filter: `organization = '${user.publicMetadata.organization}'`,
        },
      },
      apiKeyUid: process.env.ADMIN_API_KEY_UID_LIB,
      exp: parseInt(Date.now() / 1000) + 60,
    };

    const token = jwt.sign(tokenPayload, process.env.ADMIN_API_KEY_LIB, {
      algorithm: "HS256",
    });

    let data = await search(body, token);

    if (!data.ok)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });
    return NextResponse.json(await data.json(), { status: 200 });
  }
  return NextResponse.json({ data: "Not Authorization!" }, { status: 400 });
}

export async function PUT(req) {
  const user = await currentUser();
  const doc = await req.json();

  if (user.id && user.publicMetadata.isAdmin) {
    let data = await addOrUpdateDoc({
      ...doc,
      uuid: doc.uuid ? doc.uuid : uuidv4(),
    });
    if (!data.ok)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });
    return NextResponse.json({ result: "Successfully!" }, { status: 200 });
  }

  if (user.id && !user.publicMetadata.isAdmin) {
    if (user.publicMetadata.organization !== doc.organization)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });

    let data = await addOrUpdateDoc({
      ...doc,
      uuid: doc.uuid ? doc.uuid : uuidv4(),
    });

    if (!data.ok)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });
    return NextResponse.json({ result: "Successfully!" }, { status: 200 });
  }
  return NextResponse.json({ data: "Not Authorization!" }, { status: 400 });
}

export async function DELETE(req) {
  const user = await currentUser();
  const doc = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const docId = searchParams.get("doc_id");
  if (user.id && user.publicMetadata.isAdmin) {
    let data = await deleteDoc(docId);
    if (!data.ok)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });
    return NextResponse.json({ result: "Successfully!" }, { status: 200 });
  }

  if (user.id && !user.publicMetadata.isAdmin) {
    if (user.publicMetadata.organization !== doc.organization)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });

    let data = await deleteDoc(docId);

    if (!data.ok)
      return NextResponse.json({ result: "Failed!" }, { status: 400 });
    return NextResponse.json({ result: "Successfully!" }, { status: 200 });
  }
  return NextResponse.json({ data: "Not Authorization!" }, { status: 400 });
}
