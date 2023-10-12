const Admin = ({ data }) => {
  return (
    <div className="flex flex-col p-[20px]">
      <div className="flex flex-col gap-[10px]">
        <h3>
          Tổng cộng số tài liệu của cả hệ thống:&nbsp;
          {data.reduce((total, item) => total + item.value, 0)}
        </h3>
        <div className="flex flex-col pl-[10px]">
          {data.map((item, index) => {
            return (
              <div key={index} className="flex items-center">
                <p>{item.key}:&nbsp;</p>
                <p className="font-semibold">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Unit = ({ data }) => {
  return (
    <div className="flex flex-col p-[20px]">
      <div className="flex flex-col pl-[10px]">
        <div className="flex items-center">
          <p>{data.key}:&nbsp;</p>
          <p className="font-semibold">{data.value}</p>
        </div>
      </div>
    </div>
  );
};

const Content = ({ publicMetadata, organization }) => {
  const data = Object.entries(organization).map(([key, value]) => ({
    key,
    value,
  }));
  return publicMetadata.isAdmin ? (
    <Admin data={data} />
  ) : (
    <Unit
      data={data.find((item) => item.key === publicMetadata.organization)}
    />
  );
};

export default Content;
