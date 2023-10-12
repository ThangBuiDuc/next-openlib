import { currentUser } from "@clerk/nextjs";
import { getOrganizaion } from "@/utils/admin/meilisearch";
import Content from "./content";

const Page = async () => {
  const user = await currentUser();

  const organization = await getOrganizaion().then((res) => res.json());
  return (
    <Content
      publicMetadata={user.publicMetadata}
      organization={organization.facetDistribution.organization}
    />
  );
};

export default Page;
