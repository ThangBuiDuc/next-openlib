"use client";
import { LiaEyeSolid, LiaEyeSlash } from "react-icons/lia";
import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Form = ({ data }) => {
  const queryClient = useQueryClient();
  const [process, setProcess] = useState(null);
  const [userName, setUserName] = useState(data.username);
  const [password, setPassword] = useState("");
  const [isHidePass, setIsHidePass] = useState(true);

  const handleOnSubmit = useCallback(() => {
    if (userName === "") return setProcess("Vùi lòng nhập mã người dùng!");
    let pattern = new RegExp("^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$");
    if (!pattern.test(userName)) {
      return setProcess("Mã người dùng không đúng định dạng!");
    }
    Swal.fire({
      title: "Bạn có chắc chắn muốn cập nhật người dùng không?",
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
        const res = await fetch("/api/clerk", {
          method: "PATCH",
          body: JSON.stringify({
            userId: data.id,
            userName,
            password: password.trim() === "" ? null : password.trim(),
          }),
        });

        if (res.ok) {
          queryClient.invalidateQueries(["ADMIN_LIST_USER"]);
          Swal.fire({
            title: "Cập nhật người dùng thành công!",
            icon: "success",
          });
        } else
          Swal.fire({
            title: "Cập nhật người dùng thất bại!",
            icon: "error",
          });
      },
    });
  }, [userName, password]);
  return (
    <form
      className="flex flex-col gap-[20px] w-[80%]"
      onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}
    >
      <div className="flex gap-[10px] w-full justify-center items-center ">
        <h3 className="w-[40%]">Mã người dùng: </h3>
        <input
          type="text"
          placeholder="Nhập mã người dùng"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="input input-bordered w-[60%] border-bordercl"
        />
      </div>
      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[40%] text-left">Mật khẩu: </h3>
        <div className="w-[60%] flex justify-center">
          <input
            placeholder="Để trống nếu không thay đổi"
            type={`${isHidePass ? "password" : "text"}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-[90%] border-bordercl"
          />
          <label className="swap swap-flip text-9xl w-[10%]">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              value={isHidePass}
              onChange={() => setIsHidePass((pre) => !pre)}
            />

            <div className="swap-on">
              <LiaEyeSolid size={20} />
            </div>
            <div className="swap-off">
              <LiaEyeSlash size={20} />
            </div>
          </label>
        </div>
      </div>

      {process ? <p className="text-red-500">{process}</p> : <></>}
      <button className="btn w-fit border-bordercl self-center hover:border-bordercl">
        Chỉnh sửa
      </button>
    </form>
  );
};

export default Form;
