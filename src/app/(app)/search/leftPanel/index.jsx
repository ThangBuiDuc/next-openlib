import { RefinementList } from "react-instantsearch";
import Numeric from "./numeric";

export default function Index({ isOpen }) {
  return (
    <div
      className={`md:mt-[30px] md:w-[20%] md:float-left [&>div+div]:mt-[10px] md:static z-[3] top-0 bottom-0 left-0 right-0 bg-white ${
        isOpen ? "translate-x-[0%]" : "translate-x-[100%]"
      } duration-300 transition-all md:translate-x-0  fixed w-[100%] md:overflow-hidden overflow-x-auto pb-[10px] md:p-0`}
    >
      <div className="mt-[50px] md:mt-0">
        <h2 className="text-left pl-[5px]">Đơn vị</h2>
        <RefinementList
          attribute="organization"
          operator="or"
          showMore={false}
          limit={7}
          translations={{
            showMoreButtonText({ isShowingMore }) {
              return isShowingMore ? "Ẩn bớt" : "Xem thêm";
            },
          }}
          classNames={{
            list: "pl-[10px]",
            labelText: "ml-[5px]",
            count: "ml-[5px] bg-[#e9e9e9] pl-[5px] p-[0_6px] rounded-[10px]",
          }}
        />
      </div>
      <div>
        <h2 className="text-left pl-[5px]">Bộ sưu tập</h2>
        <RefinementList
          attribute="department"
          operator="or"
          showMore
          limit={5}
          translations={{
            showMoreButtonText({ isShowingMore }) {
              return isShowingMore ? "Ẩn bớt" : "Xem thêm";
            },
          }}
          classNames={{
            root: "pl-[10px]",
            labelText: "ml-[5px]",
            count: "ml-[5px] bg-[#e9e9e9] pl-[5px] p-[0_6px] rounded-[10px]",
            showMore:
              "mt-[10px] p-[3px] rounded-[10px] border-[1px] border-[#999999]",
          }}
        />
      </div>
      <div>
        <h2 className="text-left pl-[5px]">Năm phát hành</h2>
        <Numeric
          attribute="date_issued"
          items={[
            { label: "2000 - 2022", start: 2000, end: 2022 },
            { label: "1900 - 1999", start: 1990, end: 1999 },
            { label: "1877 - 1899", start: 1877, end: 1899 },
            { label: "All" },
          ]}
        />
      </div>
    </div>
  );
}
