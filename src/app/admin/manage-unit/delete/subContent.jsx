"use client";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const SubContent = ({ data, isRefetching }) => {
  const queryClient = useQueryClient();

  const handleOnClick = useCallback(() => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xoá người dùng không?",
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
        const res = await fetch(`/api/clerk?userId=${data.id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          queryClient.invalidateQueries(["ADMIN_LIST_USER"]);
          Swal.fire({
            title: "Xoá người dùng thành công!",
            icon: "success",
          });
        } else
          Swal.fire({
            title: "Xoá người dùng thất bại!",
            icon: "error",
          });
      },
    });
  }, []);
  return (
    <div className="flex flex-col gap-[20px] w-[80%]">
      <div className="flex gap-[10px] w-full justify-center items-center ">
        <h3 className="w-[40%] font-normal">Mã người dùng: </h3>
        <h3 className="w-[40%] ">{data.username}</h3>
      </div>
      {data.email_addresses.length > 0 ? (
        <div className="flex gap-[10px] w-full justify-center items-center ">
          <h3 className="w-[40%] font-normal">Email: </h3>
          <h3 className="w-[40%] ">{data.email_addresses[0].email_address}</h3>
        </div>
      ) : (
        <div className="flex gap-[10px] w-full justify-center items-center ">
          <h3 className="w-[40%] font-normal">Email: </h3>
          <h3 className="w-[40%] ">Null</h3>
        </div>
      )}
      {isRefetching ? (
        <span className="loading loading-spinner loading-lg self-center"></span>
      ) : data.public_metadata.isAdmin ? (
        <button className="btn w-fit border-bordercl self-center bg-bordercl cursor-not-allowed hover:bg-bordercl">
          Xoá
        </button>
      ) : (
        <button
          onClick={() => handleOnClick()}
          className="btn w-fit border-bordercl self-center hover:border-bordercl"
        >
          Xoá
        </button>
      )}
    </div>
  );
};

export default SubContent;
