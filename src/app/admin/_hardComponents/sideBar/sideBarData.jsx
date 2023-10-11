export const sideBarData = [
  {
    id: 1,
    title: "Tổng quan",
    path: "/admin/dashboard",
    subNav: null,
  },
  {
    id: 2,
    title: "Quản trị thành viên",
    path: "/admin/manage-unit",
    subNav: [
      {
        title: "Thêm mới",
        path: "/admin/manage-unit/add",
      },
      {
        title: "Chỉnh sửa",
        path: "/admin/manage-unit/update",
      },
      {
        title: "Xoá",
        path: "/admin/manage-unit/delete",
      },
    ],
  },
  {
    id: 3,
    title: "Quản trị dữ liệu",
    path: "/admin/manage-doc",
    subNav: [
      {
        title: "Thêm mới",
        path: "/admin/manage-doc/add",
      },
      {
        title: "Chỉnh sửa",
        path: "/admin/manage-doc/update",
      },
      {
        title: "Xoá",
        path: "/admin/manage-doc/delete",
      },
    ],
  },
];
