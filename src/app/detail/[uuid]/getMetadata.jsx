export const getMetadata = async (uuid) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/indexes/collection/documents/${uuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
      next: {
        revalidate: 300,
      },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }

  return data.json();
};
