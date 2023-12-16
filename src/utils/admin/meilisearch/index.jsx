export const getOrganizaion = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}indexes/collection/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.ADMIN_API_KEY_LIB}`,
      },
      body: JSON.stringify({ q: "", limit: 0, facets: ["organization"] }),
      next: {
        revalidate: 86400,
      },
    }
  );

  return res;
};

export const search = async (body, token) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}indexes/collection/search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...body }),
    }
  );

  return res;
};

export const addOrUpdateDoc = async (doc) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}indexes/collection/documents`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.ADMIN_API_KEY_LIB}`,
      },
      body: Array.isArray(doc)
        ? JSON.stringify(doc)
        : JSON.stringify([{ ...doc }]),
    }
  );

  return res;
};

export const deleteDoc = async (docId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}indexes/collection/${docId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.ADMIN_API_KEY_LIB}`,
      },
    }
  );

  return res;
};
