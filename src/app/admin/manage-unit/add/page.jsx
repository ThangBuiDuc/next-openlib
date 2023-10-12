import { currentUser } from "@clerk/nextjs";
import Content from "./content";
import { getOrganizaion } from "@/utils/admin/meilisearch";

const Page = async () => {
  const user = await currentUser();

  if (!user.publicMetadata.isAdmin)
    return (
      <div className="flex justify-center pt-[20px]">
        <h3>Tài khoản hiện tại không có quyền thực hiện chức năng này!</h3>
      </div>
    );

  const organization = await getOrganizaion().then((res) => res.json());

  return <Content organization={organization.facetDistribution.organization} />;
};

export default Page;
