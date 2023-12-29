"use client";
import { useState, useCallback } from "react";
import { LiaEyeSolid, LiaEyeSlash } from "react-icons/lia";
import Swal from "sweetalert2";
import Select from "react-select";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

const AddUnit = ({ organization }) => {
  const { user } = useUser();

  const queryClient = useQueryClient();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHidePass, setIsHidePass] = useState(true);
  const [process, setProcess] = useState(null);
  const [selected, setSelected] = useState(null);
  const handleOnSubmit = useCallback(() => {
    if (userName === "") return setProcess("Vùi lòng nhập mã người dùng!");
    let pattern = new RegExp("^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$");
    if (!pattern.test(userName)) {
      return setProcess("Mã người dùng không đúng định dạng!");
    }
    if (email === "") return setProcess("Vùi lòng nhập email!");
    if (password.trim() === "") return setProcess("Vùi lòng nhập mật khẩu!");
    if (!selected) return setProcess("Vùi lòng chọn đơn vị!");

    Swal.fire({
      title: "Bạn có chắc chắn muốn tạo người dùng không?",
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
        const data = await fetch("/api/clerk", {
          method: "POST",
          body: JSON.stringify({
            userName,
            email,
            password,
            organization: selected.label,
          }),
        });

        if (data.ok) {
          queryClient.invalidateQueries(["ADMIN_LIST_USER"]);
          Swal.fire({ title: "Tạo người dùng thành công!", icon: "success" });
        } else Swal.fire({ title: "Tạo người dùng thất bại!", icon: "error" });
      },
    });
  }, [userName, password, selected, email]);
  return (
    <div className="flex flex-col p-[10px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setProcess(null);
          handleOnSubmit();
        }}
        className="flex flex-col gap-[20px] w-[40%]"
      >
        <div className="flex gap-[10px] w-full justify-center items-center">
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
          <h3 className="w-[40%]">Email: </h3>
          <input
            placeholder="Example@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-[60%] border-bordercl"
          />
        </div>
        <div className="flex gap-[10px] w-full justify-center items-center">
          <h3 className="w-[40%] text-left">Mật khẩu: </h3>
          <div className="w-[60%] flex justify-center">
            <input
              placeholder="Nhập mật khẩu"
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
        <div className="flex gap-[10px] w-full justify-center items-center">
          <h3 className="w-[40%]">Đơn vị: </h3>
          <Select
            isDisabled
            className="w-[60%] "
            placeholder="Chọn đơn vị"
            value={
              !user.publicMetadata.isAdmin
                ? Object.keys(organization)
                    .map((item, index) => ({
                      value: index,
                      label: item,
                    }))
                    .find(
                      (item) => item.label === user.publicMetadata.organization
                    )
                : selected
            }
            options={Object.keys(organization).map((item, index) => ({
              value: index,
              label: item,
            }))}
            onChange={setSelected}
          />
        </div>
        {process ? <p className="text-red-500">{process}</p> : <></>}
        <button className="btn w-fit border-bordercl self-center">
          Tạo người dùng
        </button>
      </form>
    </div>
  );
};

export default AddUnit;
