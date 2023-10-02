import React from "react";
import { RefinementList } from "react-instantsearch";
import Numeric from "./numeric";

export default function Index() {
  return (
    <div className="mt-[30px] w-[20%] h-fit float-left [&>div+div]:mt-[10px] hidden md:block">
      {/* <label
        htmlFor="checkNav"
        style={{ width: "fit-content", height: "fit-content" }}
      >
        <FontAwesomeIcon icon={faXmark} style={{ fontSize: "30px" }} />
      </label> */}
      <div>
        <h2 className="text-left ml-[10px]">Đơn vị</h2>
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
        <h2 className="text-left ml-[10px]">Bộ sưu tập</h2>
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
        <h2 className="text-left ml-[10px]">Năm phát hành</h2>
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
