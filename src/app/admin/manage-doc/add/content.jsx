"use client";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as Excel from "exceljs";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { CSVLink } from "react-csv";
import * as xlsx from "xlsx";

const csvFile = [
  [
    "title",
    "advisor",
    "author",
    "editor",
    "date_accessioned",
    "date_available",
    "date_issued",
    "department",
    "description_abstract",
    "description_provenance",
    "description",
    "format_extent",
    "format_mimetype",
    "identifier_citation",
    "identifier_issn",
    "identifier_other",
    "identifier_uri",
    "language_iso",
    "publisher",
    "relation_ispartofseries",
    "relation_isversionof",
    "rights",
    "size",
    "subject",
    "title_alternative",
    "type",
    "organization",
    "bitstreams",
    "is_shared",
  ],
];

const ImportData = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [file, setFile] = useState();
  const [isConfirmed, setIsComfirmed] = useState(false);

  useEffect(() => {
    if (file) {
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "text/csv"
      ) {
        setIsComfirmed(true);
      }
    }
  }, [file]);

  const handleOnClick = useCallback(() => {
    if (file.name.substring(file.name.length - 3) === "csv") {
      Papa.parse(file, {
        header: true,
        complete: async (result) => {
          const data = await fetch("/api/meilisearch/doc", {
            method: "PUT",
            body: JSON.stringify(result.data),
          });

          if (data.ok) {
            Swal.fire({
              title: "Thêm mới tài liệu thành công!",
              icon: "success",
            });
          } else
            Swal.fire({ title: "Thêm mới tài liệu thất bại!", icon: "error" });
        },
      });
    }

    if (file.name.substring(file.name.length - 4) === "xlsx") {
      const reader = new FileReader();

      reader.onload = async function (e) {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "binary" });

        // Assuming the first sheet is the one you want to convert
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert sheet data to JSON
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        const res = await fetch("/api/meilisearch/doc", {
          method: "PUT",
          body: JSON.stringify(jsonData),
        });

        if (res.ok) {
          Swal.fire({
            title: "Thêm mới tài liệu thành công!",
            icon: "success",
          });
        } else
          Swal.fire({ title: "Thêm mới tài liệu thất bại!", icon: "error" });
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  // application / vnd.openxmlformats - officedocument.spreadsheetml.sheet;
  //  text/csv

  return (
    <dialog id="import_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex gap-2 flex-col">
          <h3 className="font-bold text-lg">Nhập file tài liệu!</h3>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".xlsx,.csv"
          />
          {isConfirmed ? (
            isFetching ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <button
                className="btn w-fit self-center border-bordercl"
                onClick={() => handleOnClick()}
              >
                Nhập
              </button>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
    </dialog>
  );
};

const Content = ({ publicMetadata }) => {
  const [process, setProcess] = useState(null);
  const [doc, setDoc] = useState({
    title: "",
    advisor: "",
    author: "",
    editor: "",
    dateAccessioned: "",
    dateAvailable: "",
    dateIssued: "",
    department: "",
    descriptionAbstract: "",
    descriptionProvenance: "",
    description: "",
    formatExtent: "",
    formatMimetype: "",
    identifierCitation: "",
    identifierIssn: "",
    identifierOther: "",
    identifierUri: "",
    languageIso: "",
    publisher: "",
    relationIspartofseries: "",
    relationIsversionof: "",
    rights: "",
    size: "",
    subject: "",
    titleAlternative: "",
    type: "",
    bitstreams: "",
    organization: publicMetadata.isAdmin ? "" : publicMetadata.organization,
    is_shared: false,
  });

  const handleDownload = useCallback(async (type) => {
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet("importData");
    sheet.addRow([
      "title",
      "advisor",
      "author",
      "editor",
      "date_accessioned",
      "date_available",
      "date_issued",
      "department",
      "description_abstract",
      "description_provenance",
      "description",
      "format_extent",
      "format_mimetype",
      "identifier_citation",
      "identifier_issn",
      "identifier_other",
      "identifier_uri",
      "language_iso",
      "publisher",
      "relation_ispartofseries",
      "relation_isversionof",
      "rights",
      "size",
      "subject",
      "title_alternative",
      "type",
      "organization",
      "bitstreams",
      "is_shared",
    ]);

    const buf = await workbook.xlsx.writeBuffer();

    saveAs(new Blob([buf]), `importData.xlsx`);
  }, []);

  const handleOnClick = useCallback(() => {
    if (
      doc.title.trim() === "" ||
      doc.author.trim() === "" ||
      doc.dateIssued.trim() === "" ||
      doc.descriptionAbstract.trim() === "" ||
      doc.identifierUri.trim() === "" ||
      doc.subject.trim() === ""
    ) {
      return setProcess("Vui lòng nhập đủ những trường bắt buộc");
    }

    if (publicMetadata.isAdmin && doc.organization.trim() === "") {
      return setProcess("Vui lòng nhập đủ những trường bắt buộc");
    }

    Swal.fire({
      title: "Bạn có chắc chắn muốn thêm mới tài liệu không??",
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
        const data = await fetch("/api/meilisearch/doc", {
          method: "PUT",
          body: JSON.stringify({
            title: doc.title.trim(),
            advisor: doc.advisor.trim() === "" ? null : doc.advisor.trim(),
            author: doc.author.trim() === "" ? null : doc.author.split("||"),
            editor: doc.editor.trim() === "" ? null : doc.editor.trim(),
            date_accessioned:
              doc.dateAccessioned.trim() === ""
                ? null
                : doc.dateAccessioned.trim(),
            date_available:
              doc.dateAvailable.trim() === "" ? null : doc.dateAvailable.trim(),
            date_issued:
              doc.dateIssued.trim() === "" ? null : doc.dateIssued.trim(),
            department:
              doc.department.trim() === "" ? null : doc.department.trim(),
            description_abstract:
              doc.descriptionAbstract.trim() === ""
                ? null
                : doc.descriptionAbstract.trim(),
            description_provenance:
              doc.descriptionProvenance.trim() === ""
                ? null
                : doc.descriptionProvenance.trim(),
            description:
              doc.description.trim() === "" ? null : doc.description.trim(),
            format_extent:
              doc.formatExtent.trim() === "" ? null : doc.formatExtent.trim(),
            format_mimetype:
              doc.formatMimetype.trim() === ""
                ? null
                : doc.formatMimetype.trim(),
            identifier_citation:
              doc.identifierCitation.trim() === ""
                ? null
                : doc.identifierCitation.trim(),
            identifier_issn:
              doc.identifierIssn.trim() === ""
                ? null
                : doc.identifierIssn.trim(),
            identifier_other:
              doc.identifierOther.trim() === ""
                ? null
                : doc.identifierOther.trim(),
            identifier_uri:
              doc.identifierUri.trim() === "" ? null : doc.identifierUri.trim(),
            language_iso:
              doc.languageIso.trim() === "" ? null : doc.languageIso.trim(),
            publisher:
              doc.publisher.trim() === "" ? null : doc.publisher.trim(),
            relation_ispartofseries:
              doc.relationIspartofseries.trim() === ""
                ? null
                : doc.relationIspartofseries.trim(),
            relation_isversionof:
              doc.relationIsversionof.trim() === ""
                ? null
                : doc.relationIsversionof.trim(),
            rights: doc.rights.trim() === "" ? null : doc.rights.trim(),
            size: doc.size.trim() === "" ? null : doc.size.trim(),
            subject: doc.subject.trim() === "" ? null : doc.subject.split("||"),
            title_alternative:
              doc.titleAlternative.trim() === ""
                ? null
                : doc.titleAlternative.trim(),
            type: doc.type.trim() === "" ? null : doc.type.trim(),
            organization: publicMetadata.isAdmin
              ? doc.organization
              : publicMetadata.organization,
            bitstreams:
              doc.bitstreams.trim() === "" ? null : doc.bitstreams.trim(),
            is_shared: doc.is_shared,
          }),
        });

        if (data.ok) {
          setDoc({
            title: "",
            advisor: "",
            author: "",
            editor: "",
            dateAccessioned: "",
            dateAvailable: "",
            dateIssued: "",
            department: "",
            descriptionAbstract: "",
            descriptionProvenance: "",
            description: "",
            formatExtent: "",
            formatMimetype: "",
            identifierCitation: "",
            identifierIssn: "",
            identifierOther: "",
            identifierUri: "",
            languageIso: "",
            publisher: "",
            relationIspartofseries: "",
            relationIsversionof: "",
            rights: "",
            size: "",
            subject: "",
            titleAlternative: "",
            type: "",
            bitstreams: "",
            organization: publicMetadata.isAdmin
              ? ""
              : publicMetadata.organization,
            is_shared: false,
          });
          Swal.fire({
            title: "Thêm mới tài liệu thành công!",
            icon: "success",
          });
        } else
          Swal.fire({ title: "Thêm mới tài liệu thất bại!", icon: "error" });
      },
    });
  }, [doc]);

  return (
    <>
      <div className="flex flex-col gap-[20px] p-[10px]">
        <div className="justify-between flex">
          <button
            onClick={() => {
              setDoc({
                title: "",
                advisor: "",
                author: "",
                editor: "",
                dateAccessioned: "",
                dateAvailable: "",
                dateIssued: "",
                department: "",
                descriptionAbstract: "",
                descriptionProvenance: "",
                description: "",
                formatExtent: "",
                formatMimetype: "",
                identifierCitation: "",
                identifierIssn: "",
                identifierOther: "",
                identifierUri: "",
                languageIso: "",
                publisher: "",
                relationIspartofseries: "",
                relationIsversionof: "",
                rights: "",
                size: "",
                subject: "",
                titleAlternative: "",
                type: "",
                bitstreams: "",
                organization: "",
                is_shared: false,
              });
            }}
            className="btn w-fit border-bordercl self-center"
          >
            Làm mới
          </button>
          <div className="flex gap-2">
            <details className="dropdown ">
              <summary className="btn border-bordercl">Tải mẫu</summary>
              <ul className="p-2 shadow menu dropdown-content z-[11] bg-base-100 rounded-box w-52 ">
                <li onClick={() => handleDownload()}>
                  <a>XLSX</a>
                </li>
                <li>
                  <CSVLink data={csvFile} filename="importData.csv">
                    CSV
                  </CSVLink>
                </li>
              </ul>
            </details>
            <button
              className="btn w-fit border-bordercl"
              onClick={() =>
                document.getElementById("import_modal").showModal()
              }
            >
              Nhập tài liệu
            </button>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col gap-[20px] w-[80%]"
        >
          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Title: </h3>

            <div className="indicator w-[70%]">
              <span className="indicator-item badge">Bắt buộc</span>
              <input
                type="text"
                value={doc.title}
                onChange={(e) =>
                  setDoc((pre) => ({ ...pre, title: e.target.value }))
                }
                className="input input-bordered w-full border-bordercl"
              />
            </div>
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Advisor: </h3>
            <input
              type="text"
              value={doc.advisor}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, advisor: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Author: </h3>
            <div className="indicator w-[70%]">
              <span className="indicator-item badge">Bắt buộc</span>
              <input
                type="text"
                placeholder="Lò Văn Chiến || Bùi Thị Ngọc"
                value={doc.author}
                onChange={(e) =>
                  setDoc((pre) => ({ ...pre, author: e.target.value }))
                }
                className="input input-bordered w-full border-bordercl"
              />
            </div>
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Editor: </h3>
            <input
              type="text"
              value={doc.editor}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, editor: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Date_accessioned: </h3>
            <input
              type="text"
              value={doc.dateAccessioned}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, dateAccessioned: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Date_available: </h3>
            <input
              type="text"
              value={doc.dateAvailable}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, dateAvailable: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Date_issued: </h3>
            <div className="indicator w-[70%]">
              <span className="indicator-item badge">Bắt buộc</span>
              <input
                type="text"
                placeholder="2023"
                value={doc.dateIssued}
                onChange={(e) =>
                  setDoc((pre) => ({ ...pre, dateIssued: e.target.value }))
                }
                className="input input-bordered w-full border-bordercl"
              />
            </div>
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Department: </h3>
            <input
              type="text"
              value={doc.department}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, department: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Description_abstract: </h3>
            <div className="indicator w-[70%]">
              <span className="indicator-item badge">Bắt buộc</span>
              <input
                type="text"
                value={doc.descriptionAbstract}
                placeholder="Tóm tắt"
                onChange={(e) =>
                  setDoc((pre) => ({
                    ...pre,
                    descriptionAbstract: e.target.value,
                  }))
                }
                className="input input-bordered w-full border-bordercl"
              />
            </div>
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Description_provenance: </h3>
            <input
              type="text"
              value={doc.descriptionProvenance}
              onChange={(e) =>
                setDoc((pre) => ({
                  ...pre,
                  descriptionProvenance: e.target.value,
                }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Description: </h3>
            <input
              type="text"
              value={doc.description}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, description: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Format_mimetype: </h3>
            <input
              type="text"
              value={doc.formatMimetype}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, formatMimetype: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Identifier_citation: </h3>
            <input
              type="text"
              value={doc.identifierCitation}
              onChange={(e) =>
                setDoc((pre) => ({
                  ...pre,
                  identifierCitation: e.target.value,
                }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Identifier_issn: </h3>
            <input
              type="text"
              value={doc.identifierIssn}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, identifierIssn: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Identifier_other: </h3>
            <input
              type="text"
              value={doc.identifierOther}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, identifierOther: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Identifier_uri: </h3>
            <div className="indicator w-[70%]">
              <span className="indicator-item badge">Bắt buộc</span>
              <input
                type="text"
                value={doc.identifierUri}
                placeholder="Đường dẫn của tài liệu"
                onChange={(e) =>
                  setDoc((pre) => ({ ...pre, identifierUri: e.target.value }))
                }
                className="input input-bordered w-full border-bordercl"
              />
            </div>
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Language_iso: </h3>
            <input
              type="text"
              value={doc.languageIso}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, languageIso: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Publisher: </h3>
            <input
              placeholder="Nhà xuất bản"
              type="text"
              value={doc.publisher}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, publisher: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Relation_ispartofseries: </h3>
            <input
              type="text"
              value={doc.relationIspartofseries}
              onChange={(e) =>
                setDoc((pre) => ({
                  ...pre,
                  relationIspartofseries: e.target.value,
                }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Relation_isversionof: </h3>
            <input
              type="text"
              value={doc.relationIsversionof}
              onChange={(e) =>
                setDoc((pre) => ({
                  ...pre,
                  relationIsversionof: e.target.value,
                }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Rights: </h3>
            <input
              type="text"
              value={doc.rights}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, rights: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Size: </h3>
            <input
              type="text"
              value={doc.size}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, size: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Subject: </h3>
            <div className="indicator w-[70%]">
              <span className="indicator-item badge">Bắt buộc</span>
              <input
                type="text"
                placeholder="Trồng trọt || Chăn nuôi || Văn học"
                value={doc.subject}
                onChange={(e) =>
                  setDoc((pre) => ({ ...pre, subject: e.target.value }))
                }
                className="input input-bordered w-full border-bordercl"
              />
            </div>
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Title_alternative: </h3>
            <input
              type="text"
              value={doc.titleAlternative}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, titleAlternative: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Type: </h3>
            <input
              type="text"
              value={doc.type}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, type: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Bitstreams: </h3>
            <input
              type="text"
              value={doc.bitstreams}
              onChange={(e) =>
                setDoc((pre) => ({ ...pre, bitstreams: e.target.value }))
              }
              className="input input-bordered w-[70%] border-bordercl"
            />
          </div>

          {publicMetadata.isAdmin ? (
            <div className="flex gap-[10px] w-full justify-center items-center">
              <h3 className="w-[30%]">Organization: </h3>
              <div className="indicator w-[70%]">
                <span className="indicator-item badge">Bắt buộc</span>
                <input
                  type="text"
                  value={doc.organization}
                  onChange={(e) =>
                    setDoc((pre) => ({ ...pre, organization: e.target.value }))
                  }
                  className="input input-bordered w-full border-bordercl"
                />
              </div>
            </div>
          ) : (
            <div className="flex gap-[10px] w-full justify-center items-center">
              <h3 className="w-[30%]">Organization: </h3>
              <input
                type="text"
                value={doc.organization}
                className="input input-bordered w-[70%] border-bordercl "
                disabled
              />
            </div>
          )}
          <div className="flex gap-[10px] w-full justify-center items-center">
            <h3 className="w-[30%]">Is_shared: </h3>
            <div className="w-[70%]">
              <input
                type="checkbox"
                value={doc.is_shared}
                onChange={(e) =>
                  setDoc((pre) => ({ ...pre, is_shared: e.target.value }))
                }
                className="checkbox"
              />
            </div>
          </div>
          {process ? <p className="text-red-500">{process}</p> : <></>}
          <button
            onClick={() => {
              setProcess(null);
              handleOnClick();
            }}
            className="btn w-fit border-bordercl self-center"
          >
            Thêm mới
          </button>
        </form>
      </div>
      {/* MODAL IMPORT DATA */}
      <ImportData />
    </>
  );
};

export default Content;
