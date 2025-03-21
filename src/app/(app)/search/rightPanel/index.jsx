import InfiniteHits from "./infiniteHits";
import Link from "next/link";
import { Highlight } from "react-instantsearch";
import Stats from "./customStats";
import { click } from "@/utils/admin/meilisearch";

export default function Index() {
  return (
    <div className="w-full md:w-[80%] ">
      <Stats />
      <InfiniteHits hitComponent={Hit} />
    </div>
  );
}

function Hit({ hit, index }) {
  const handleError = (e, organization) => {
    switch (organization.trim()) {
      case "Trường Đại học Quản Lý và Công Nghệ Hải Phòng": {
        e.target.src = "/imgWhenError/hpu.png";
        break;
      }
      case "Trung tâm Thông tin Khoa học và Công nghệ thành phố Hải Phòng": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/hpstin.png";
        break;
      }
      case "Viện Nghiên Cứu Hải Sản": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/vienhaisan.png";
        break;
      }
      case "Trường Đại học Hàng Hải Việt Nam": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/vimaru.png";
        break;
      }
      case "Trường Đại học Hải Phòng": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/dhhp.png";
        break;
      }
      case "Trường Đại học Y Dược Hải Phòng": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/yDuocHP.png";
        break;
      }
      case "Viện Y Học Biển": {
        e.target.style.objectFit = "contain";
        e.target.src = "/imgWhenError/vinimam.png";
        break;
      }
      default:
        console.log("error");
    }
  };

  const fallBackThumbnail = (organization) => {
    var src;
    switch (organization.trim()) {
      case "Trường Đại học Quản Lý và Công Nghệ Hải Phòng": {
        src = "/imgWhenError/hpu.png";
        break;
      }
      case "Trung tâm Thông tin Khoa học và Công nghệ thành phố Hải Phòng": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/hpstin.png";
        break;
      }
      case "Viện Nghiên Cứu Hải Sản": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/vienhaisan.png";
        break;
      }
      case "Trường Đại học Hàng Hải Việt Nam": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/vimaru.png";
        break;
      }
      case "Trường Đại học Hải Phòng": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/dhhp.png";
        break;
      }
      case "Trường Đại học Y Dược Hải Phòng": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/yDuocHP.png";
        break;
      }
      case "Viện Y Học Biển": {
        // e.target.style.objectFit = "contain";
        src = "/imgWhenError/vinimam.png";
        break;
      }
      default:
        console.log("error");
    }
    return src;
  };

  return (
    <div
      className="flex w-[100%] p-[10px] flex-col md:flex-row"
      onClick={() =>
        click({
          eventType: "click",
          eventName: `Search ${hit.title} Result Clicked`,
          indexUid: "collection",
          objectID: hit.uuid,
          position: index,
        })
      }
    >
      <div className="flex w-full md:w-[80%] gap-[10px]">
        <div className="w-20%">
          <a href={hit.identifier_uri}>
            <img
              src={
                hit.bitstreams
                  ? hit.bitstreams
                  : fallBackThumbnail(hit.organization)
              }
              className="object-cover"
              //   id="img_result"
              onError={(e) => handleError(e, hit.organization)}
              alt="thumbnail book"
              width={124}
              height={165}
            />
          </a>
        </div>
        <div className="w-[80%]">
          <a
            href={hit.identifier_uri}
            className="font-semibold text-[black] md:text-[20px] text-[13px]"
          >
            <Highlight attribute="title" hit={hit} />
          </a>
          <p className="md:text-[15px] text-[13px] mt-[5px]">
            <Highlight
              attribute="author"
              classNames={{ root: "text-[#808394]" }}
              hit={hit}
              separator="; "
            />
          </p>
          <p className="mt-[5px] md:text-[15px] text-[13px] text-[black]">
            <Highlight attribute="description_abstract" hit={hit} />
          </p>
          <p className="mt-[5px]  md:text-[15px] text-[13px]">
            <Highlight
              classNames={{ root: "text-[#808394]" }}
              attribute="publisher"
              hit={hit}
            />
          </p>
        </div>
      </div>
      <div className="mt-[5px] flex md:w-[20%] justify-center md:justify-end">
        <Link
          className="text-blue-600 text-[13px] md:text-[15px] h-fit"
          href={`/detail/${hit.uuid}`}
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
