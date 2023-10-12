"use client";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";

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
  });

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
    <div className="flex flex-col gap-[20px] p-[10px]">
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
          });
        }}
        className="btn w-fit border-bordercl self-center"
      >
        Làm mới
      </button>
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
  );
};

export default Content;
