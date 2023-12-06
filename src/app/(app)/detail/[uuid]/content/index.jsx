// import BorrowBtn from "./borrowBtn";
import Img from "./img";
// import { SignInButton } from "@clerk/nextjs";

const Index = ({ content, publicMetadata, auth }) => {
  return (
    <div className="p-[10px] md:p-[50px] w-full h-fit">
      <div>
        <p className="text-[15px] md:text-[18px] font-semibold">
          {content.title}
        </p>
        <div className="mt-[20px] md:flex-row flex-col flex gap-[20px]">
          <Img
            bitstreams={content.bitstreams != null ? content.bitstreams : ""}
            organization={content.organization}
          />
          <div className="gap-[10px] md:gap-0 flex flex-col justify-around">
            <div className="flex gap-[5px]">
              <p className="font-semibold text-[15px] md:text-[18px]">Name:</p>
              <p className="text-[15px] md:text-[18px]">
                {content.identifier_other == null
                  ? "Null"
                  : content.identifier_other}
              </p>
            </div>

            <div className="flex gap-[5px]">
              <p className="font-semibold text-[15px] md:text-[18px]">Size:</p>
              <p className="text-[15px] md:text-[18px]">
                {content.size == null ? "Null" : content.size}
              </p>
            </div>

            <div className="flex gap-[5px]">
              <p className="font-semibold text-[15px] md:text-[18px]">
                Format:
              </p>
              <p className="text-[15px] md:text-[18px]">
                {content.format_mimetype == null
                  ? "Null"
                  : content.format_mimetype}
              </p>
            </div>
          </div>
          {/* {auth ? (
            Object.keys(publicMetadata).length === 0 && <BorrowBtn />
          ) : (
            <SignInButton>
              <button className="btn self-center">Mượn sách</button>
            </SignInButton>
          )} */}
        </div>

        <div className="flex flex-col gap-[20px] w-full mt-[50px] md:mt-[100px]">
          <div className="flex">
            <p className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]">
              dc.contributor.author
            </p>
            <p className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]">
              {content.author.join(" ; ")}
            </p>
            <p className="w-[10%] text-right hidden md:block">en_US</p>
          </div>

          <div className="flex">
            <p
              className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]"
              style={{ color: "#0083C2" }}
            >
              dc.date.accessioned
            </p>
            <p
              className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]"
              style={{ color: "#0083C2" }}
            >
              {content.date_accessioned}
            </p>
          </div>

          <div className="flex">
            <p className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]">
              dc.date.available
            </p>
            <p className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]">
              {content.date_available}
            </p>
          </div>

          <div className="flex">
            <p
              className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]"
              style={{ color: "#0083C2" }}
            >
              dc.date.issued
            </p>
            <p
              className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]"
              style={{ color: "#0083C2" }}
            >
              {content.date_issued}
            </p>
            <p
              className="w-[10%] text-right hidden md:block"
              style={{ color: "#0083C2" }}
            >
              en_US
            </p>
          </div>

          <div className="flex">
            <p className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]">
              dc.identifier.other
            </p>
            <p className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]">
              {content.identifier_other}
            </p>
            <p className="w-[10%] text-right hidden md:block">en_US</p>
          </div>

          <div className="flex">
            <p
              className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]"
              style={{ color: "#0083C2" }}
            >
              dc.identifier.uri
            </p>
            <a
              className="w-[55%] md:w-[70%] md:text-[18px] text-[13px] "
              href={content.identifier_uri}
            >
              <p className="text-blue-600 truncate">{content.identifier_uri}</p>
            </a>
            <p
              className="w-[10%] text-right hidden md:block"
              style={{ color: "#0083C2" }}
            >
              en_US
            </p>
          </div>

          <div className="flex">
            <p className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]">
              dc.description.abstract
            </p>
            <p className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]">
              {content.description_abstract}
            </p>
            <p className="w-[10%] text-right hidden md:block">en_US</p>
          </div>

          <div className="flex">
            <p
              className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]"
              style={{ color: "#0083C2" }}
            >
              dc.format.extent
            </p>
            <p
              className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]"
              style={{ color: "#0083C2" }}
            >
              {content.format_extent}
            </p>
            <p
              className="w-[10%] text-right hidden md:block"
              style={{ color: "#0083C2" }}
            >
              en_US
            </p>
          </div>

          <div className="flex">
            <p className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]">
              dc.format.mimetype
            </p>
            <p className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]">
              {content.format_mimetype}
            </p>
          </div>

          <div className="flex">
            <p
              className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]"
              style={{ color: "#0083C2" }}
            >
              dc.language.iso
            </p>
            <p
              className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]"
              style={{ color: "#0083C2" }}
            >
              {content.language_iso}
            </p>
          </div>

          <div className="flex">
            <p className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]">
              dc.publisher
            </p>
            <p className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]">
              {content.publisher}
            </p>
            <p className="w-[10%] text-right hidden md:block">en_US</p>
          </div>

          <div className="flex">
            <p
              className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]"
              style={{ color: "#0083C2" }}
            >
              dc.subject
            </p>
            <p
              className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]"
              style={{ color: "#0083C2" }}
            >
              {content.subject[0]}
            </p>
            <p
              className="w-[10%] text-right hidden md:block"
              style={{ color: "#0083C2" }}
            >
              en_US
            </p>
          </div>

          <div className="flex">
            <p className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]">
              dc.title
            </p>
            <p className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]">
              {content.title}
            </p>
            <p className="w-[10%] text-right hidden md:block">en_US</p>
          </div>

          <div className="flex">
            <p
              className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]"
              style={{ color: "#0083C2" }}
            >
              dc.type
            </p>
            <p
              className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]"
              style={{ color: "#0083C2" }}
            >
              {content.type}
            </p>
            <p
              className="w-[10%] text-right hidden md:block"
              style={{ color: "#0083C2" }}
            >
              en_US
            </p>
          </div>

          <div className="flex">
            <p className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]">
              dc.size
            </p>
            <p className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]">
              {content.size}
            </p>
            <p className="w-[10%] text-right hidden md:block">en_US</p>
          </div>

          <div className="flex">
            <p
              className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]"
              style={{ color: "#0083C2" }}
            >
              dc.departmenpt
            </p>
            <p
              className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]"
              style={{ color: "#0083C2" }}
            >
              {content.department}
            </p>
            <p
              className="w-[10%] text-right hidden md:block"
              style={{ color: "#0083C2" }}
            >
              en_US
            </p>
          </div>

          <div className="flex">
            <p className="text-[13px] md:text-[18px] w-[45%] md:w-[20%]">
              dc.organization
            </p>
            <p className="w-[55%] md:w-[70%] md:text-[18px] text-[13px]">
              {content.organization}
            </p>
            <p className="w-[10%] text-right hidden md:block">en_US</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
