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

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
