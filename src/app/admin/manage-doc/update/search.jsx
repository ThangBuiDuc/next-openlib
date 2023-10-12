import { useInfiniteQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import UpdateDoc from "./updateDoc";
const HitItem = ({ hit, page, isRefetching, refetch }) => {
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

  const handleDelete = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xoá tài liệu không?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "Huỷ",
      confirmButtonText: "Xác nhận",
      showLoaderOnConfirm: true,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: () => !Swal.isLoading,
      preConfirm: async () => {
        const data = await fetch(`/api/meilisearch/doc?doc_id=${hit.uuid}`, {
          method: "DELETE",
        });

        if (data.ok) {
          Swal.fire({
            title: "Xoá tài liệu thành công!",
            icon: "success",
          });
        } else Swal.fire({ title: "Xoá tài liệu thất bại!", icon: "error" });
      },
    });
  };

  return (
    <>
      <div className="flex w-[100%] p-[10px] bg-white border-bordercl boder-[1px] transparent rounded-[3px] m-[0_0_3px] pd-[1rem] shadow-[0_2px_5px_0_#e3e5ec] drop-shadow-[0_1px_#fff]">
        <div className="flex flex-col w-[80%]">
          <div className="flex gap-[10px]">
            <div className="w-20%">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={hit.identifier_uri}
              >
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
                target="_blank"
                rel="noopener noreferrer"
                href={hit.identifier_uri}
                className="font-semibold text-[black] md:text-[20px] text-[13px]"
              >
                {hit.title}
              </a>
              <p className="md:text-[15px] text-[13px] mt-[5px]">
                {hit.author.join("; ")}
              </p>
              <p className="mt-[5px] md:text-[15px] text-[13px]">
                {hit.publisher}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[5px] flex flex-col w-[20%] justify-center items-center gap-[10px]">
          <button
            className="btn "
            onClick={() =>
              document.getElementById(`my_modal_${hit.uuid}`).showModal()
            }
            disabled={isRefetching}
          >
            {isRefetching ? (
              <span className="loading loading-infinity loading-lg"></span>
            ) : (
              "Chỉnh sửa"
            )}
          </button>
          <button
            className="btn "
            disabled={isRefetching}
            onClick={() => handleDelete()}
          >
            {isRefetching ? (
              <span className="loading loading-infinity loading-lg"></span>
            ) : (
              "Xoá"
            )}
          </button>
        </div>
      </div>
      <dialog id={`my_modal_${hit.uuid}`} className="modal">
        <div className="modal-box max-w-full w-[70%]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <UpdateDoc hit={hit} page={page} refetch={refetch} />
          </form>
        </div>
      </dialog>
    </>
  );
};

const Search = ({ query }) => {
  const fetchDocs = async (pageParam) => {
    return await fetch("/api/meilisearch/doc", {
      method: "POST",
      body: JSON.stringify({ q: query, hitsPerPage: 15, page: pageParam }),
    }).then((res) => res.json());
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: [`search${query}`],
    queryFn: ({ pageParam = 1 }) => fetchDocs(pageParam),
    getNextPageParam: (res) => {
      if (res.page < res.totalPages) return res.page + 1;
      else return undefined;
    },
  });
  return status === "loading" ? (
    <span className="loading loading-infinity loading-lg"></span>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <div className="flex flex-col gap-[10px] w-full">
      {data.pages.map((item, index) => {
        return (
          <Fragment key={index}>
            {item.hits.map((el) => (
              <Fragment key={el.uuid}>
                <HitItem
                  hit={el}
                  page={index}
                  isRefetching={isRefetching}
                  refetch={refetch}
                />
              </Fragment>
            ))}
          </Fragment>
        );
      })}
      <div className="flex justify-center">
        <button
          className="btn border-bordercl hover:border-bordercl"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <span className="loading loading-infinity loading-lg"></span>
          ) : hasNextPage ? (
            "Load More"
          ) : (
            "Nothing more to load"
          )}
        </button>
      </div>
      {/* <div className="flex justify-center">
        {isFetching && !isFetchingNextPage ? (
          <span className="loading loading-infinity loading-lg"></span>
        ) : null}
      </div> */}
    </div>
  );
};

export default Search;
