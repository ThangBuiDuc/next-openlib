import { getMetadata } from "./getMetadata";
import Header from "./header";
import Content from "./content";

export async function generateMetadata({ params }) {
  const data = await getMetadata(params.uuid);
  return {
    title: data.title,
    authors: data.author.map((item) => ({ name: item })),
    keywords: data.subject,
    description: data.description,
    publisher: data.organization,
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "DC.creator": data.author.join(" ;"),
      "DCTERMS.dateAccepted": data.date_accessioned,
      "DCTERMS.available": data.date_available,
      "DC.identifier": data.identifier_other,
      "DC.identifier": data.identifier_uri,
      "DC.description": data.description,
      "DCTERMS.abstract": data.description_abstract,
      "DCTERMS.extent": data.format_extent,
      "DC.format": data.format_mimetype,
      "DC.language": data.language_iso,
      "DC.subject": data.subject.join(" ;"),
      "DC.title": data.title,
      "DC.type": data.type,
      citation_keywords: data.subject.join("; "),
      citation_title: data.title,
      citation_language: data.language_iso,
      citation_author: data.author.join(" ;"),
      citation_abstract_html_url: data.identifier_uri,
    },
  };
}

export default async function Page({ params }) {
  const data = await getMetadata(params.uuid);
  return (
    <div>
      <Header />
      {data && <Content content={data} />}
    </div>
  );
}
