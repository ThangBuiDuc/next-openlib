import { useState, memo } from "react";
import Swal from "sweetalert2";

const UpdateDoc = ({ hit, page, refetch }) => {
  const [process, setProcess] = useState(null);
  const [doc, setDoc] = useState({
    ...hit,
    author: hit.author && hit.author.join(" || "),
    subject: hit.subject && hit.subject.join(" || "),
    is_shared: hit?.is_shared ? true : false,
  });

  const handleOnClick = () => {
    if (
      doc.title.trim() === "" ||
      doc.author.trim() === "" ||
      doc.date_issued === null ||
      doc.date_issued.toString().trim() === "" ||
      doc.description_abstract.trim() === "" ||
      doc.identifier_uri.trim() === "" ||
      doc.subject.trim() === ""
    ) {
      setProcess("Vui lòng nhập đủ những trường bắt buộc");
    } else {
      Swal.fire({
        title: "Bạn có chắc chắn muốn chỉnh sửa tài liệu không?",
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
              uuid: doc.uuid,
              title: doc.title.trim(),
              advisor:
                !doc.advisor || doc.advisor.trim() === ""
                  ? null
                  : doc.advisor.trim(),
              author: doc.author.trim() === "" ? null : doc.author.split("||"),
              editor:
                !doc.editor || doc.editor.trim() === ""
                  ? null
                  : doc.editor.trim(),
              date_accessioned:
                !doc.date_accessioned || doc.date_accessioned.trim() === ""
                  ? null
                  : doc.date_accessioned.trim(),
              date_available:
                !doc.date_available || doc.date_available.trim() === ""
                  ? null
                  : doc.date_available.trim(),
              date_issued:
                doc.date_issued.toString().trim() === ""
                  ? null
                  : doc.date_issued.toString().trim(),
              department:
                !doc.department || doc.department.trim() === ""
                  ? null
                  : doc.department.trim(),
              description_abstract:
                doc.description_abstract.trim() === ""
                  ? null
                  : doc.description_abstract.trim(),
              description_provenance:
                !doc.description_provenance ||
                doc.description_provenance.trim() === ""
                  ? null
                  : doc.description_provenance.trim(),
              description:
                !doc.description || doc.description.trim() === ""
                  ? null
                  : doc.description.trim(),
              format_extent:
                !doc.format_extent || doc.format_extent.trim() === ""
                  ? null
                  : doc.format_extent.trim(),
              format_mimetype:
                !doc.format_mimetype || doc.format_mimetype.trim() === ""
                  ? null
                  : doc.format_mimetype.trim(),
              identifier_citation:
                !doc.identifier_citation ||
                doc.identifier_citation.trim() === ""
                  ? null
                  : doc.identifier_citation.trim(),
              identifier_issn:
                !doc.identifier_issn || doc.identifier_issn.trim() === ""
                  ? null
                  : doc.identifier_issn.trim(),
              identifier_other:
                !doc.identifier_other || doc.identifier_other.trim() === ""
                  ? null
                  : doc.identifier_other.trim(),
              identifier_uri:
                !doc.identifier_uri || doc.identifier_uri.trim() === ""
                  ? null
                  : doc.identifier_uri.trim(),
              language_iso:
                !doc.language_iso || doc.language_iso.trim() === ""
                  ? null
                  : doc.language_iso.trim(),
              publisher:
                !doc.publisher || doc.publisher.trim() === ""
                  ? null
                  : doc.publisher.trim(),
              relation_ispartofseries:
                !doc.relation_ispartofseries ||
                doc.relation_ispartofseries.trim() === ""
                  ? null
                  : doc.relation_ispartofseries.trim(),
              relation_isversionof:
                !doc.relation_isversionof ||
                doc.relation_isversionof.trim() === ""
                  ? null
                  : doc.relation_isversionof.trim(),
              rights:
                !doc.rights || doc.rights.trim() === ""
                  ? null
                  : doc.rights.trim(),
              size:
                !doc.size || doc.size.trim() === "" ? null : doc.size.trim(),
              subject:
                !doc.subject || doc.subject.trim() === ""
                  ? null
                  : doc.subject.split("||"),
              title_alternative:
                !doc.title_alternative || doc.title_alternative.trim() === ""
                  ? null
                  : doc.title_alternative.trim(),
              type:
                !doc.type || doc.type.trim() === "" ? null : doc.type.trim(),
              organization: doc.organization,
              bitstreams:
                !doc.bitstreams || doc.bitstreams.trim() === ""
                  ? null
                  : doc.bitstreams.trim(),
              is_shared: doc.is_shared,
            }),
          });

          if (data.ok) {
            refetch({ refetchPage: (p, index) => index === page });
            Swal.fire({
              title: "Chỉnh sửa tài liệu thành công!",
              icon: "success",
            });
          } else
            Swal.fire({ title: "Chỉnh sửa tài liệu thất bại!", icon: "error" });
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-[20px] w-[80%]">
      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">
          Title<span className="text-red-600">*</span>:{" "}
        </h3>

        <div className="indicator w-[70%]">
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
        <h3 className="w-[30%]">
          Author<span className="text-red-600">*</span>:{" "}
        </h3>
        <div className="indicator w-[70%]">
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
          value={doc.date_accessioned}
          onChange={(e) =>
            setDoc((pre) => ({ ...pre, date_accessioned: e.target.value }))
          }
          className="input input-bordered w-[70%] border-bordercl"
        />
      </div>

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">Date_available: </h3>
        <input
          type="text"
          value={doc.date_available}
          onChange={(e) =>
            setDoc((pre) => ({ ...pre, date_available: e.target.value }))
          }
          className="input input-bordered w-[70%] border-bordercl"
        />
      </div>

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">
          Date_issued<span className="text-red-600">*</span>:{" "}
        </h3>
        <div className="indicator w-[70%]">
          <input
            type="text"
            placeholder="2023"
            value={doc.date_issued}
            onChange={(e) =>
              setDoc((pre) => ({ ...pre, date_issued: e.target.value }))
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
        <h3 className="w-[30%]">
          Description_abstract<span className="text-red-600">*</span>:{" "}
        </h3>
        <div className="indicator w-[70%]">
          <input
            type="text"
            value={doc.description_abstract}
            placeholder="Tóm tắt"
            onChange={(e) =>
              setDoc((pre) => ({
                ...pre,
                description_abstract: e.target.value,
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
          value={doc.description_provenance}
          onChange={(e) =>
            setDoc((pre) => ({
              ...pre,
              description_provenance: e.target.value,
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
          value={doc.format_mimetype}
          onChange={(e) =>
            setDoc((pre) => ({ ...pre, format_mimetype: e.target.value }))
          }
          className="input input-bordered w-[70%] border-bordercl"
        />
      </div>

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">Identifier_citation: </h3>
        <input
          type="text"
          value={doc.identifier_citation}
          onChange={(e) =>
            setDoc((pre) => ({
              ...pre,
              identifier_citation: e.target.value,
            }))
          }
          className="input input-bordered w-[70%] border-bordercl"
        />
      </div>

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">Identifier_issn: </h3>
        <input
          type="text"
          value={doc.identifier_issn}
          onChange={(e) =>
            setDoc((pre) => ({ ...pre, identifier_issn: e.target.value }))
          }
          className="input input-bordered w-[70%] border-bordercl"
        />
      </div>

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">Identifier_other: </h3>
        <input
          type="text"
          value={doc.identifier_other}
          onChange={(e) =>
            setDoc((pre) => ({ ...pre, identifier_other: e.target.value }))
          }
          className="input input-bordered w-[70%] border-bordercl"
        />
      </div>

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">
          Identifier_uri<span className="text-red-600">*</span>:{" "}
        </h3>
        <div className="indicator w-[70%]">
          <input
            type="text"
            value={doc.identifier_uri}
            placeholder="Đường dẫn của tài liệu"
            onChange={(e) =>
              setDoc((pre) => ({ ...pre, identifier_uri: e.target.value }))
            }
            className="input input-bordered w-full border-bordercl"
          />
        </div>
      </div>

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">Language_iso: </h3>
        <input
          type="text"
          value={doc.language_iso}
          onChange={(e) =>
            setDoc((pre) => ({ ...pre, language_iso: e.target.value }))
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
          value={doc.relation_ispartofseries}
          onChange={(e) =>
            setDoc((pre) => ({
              ...pre,
              relation_ispartofseries: e.target.value,
            }))
          }
          className="input input-bordered w-[70%] border-bordercl"
        />
      </div>

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">Relation_isversionof: </h3>
        <input
          type="text"
          value={doc.relation_isversionof}
          onChange={(e) =>
            setDoc((pre) => ({
              ...pre,
              relation_isversionof: e.target.value,
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
          onChange={(e) => setDoc((pre) => ({ ...pre, size: e.target.value }))}
          className="input input-bordered w-[70%] border-bordercl"
        />
      </div>

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">
          Subject<span className="text-red-600">*</span>:{" "}
        </h3>
        <div className="indicator w-[70%]">
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
          value={doc.title_alternative}
          onChange={(e) =>
            setDoc((pre) => ({ ...pre, title_alternative: e.target.value }))
          }
          className="input input-bordered w-[70%] border-bordercl"
        />
      </div>

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">Type: </h3>
        <input
          type="text"
          value={doc.type}
          onChange={(e) => setDoc((pre) => ({ ...pre, type: e.target.value }))}
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

      <div className="flex gap-[10px] w-full justify-center items-center">
        <h3 className="w-[30%]">Organization: </h3>
        <input
          type="text"
          value={doc.organization}
          className="input input-bordered w-[70%] border-bordercl "
          disabled
        />
      </div>

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
        Lưu
      </button>
    </div>
  );
};

export default memo(UpdateDoc);
