import { useNumericMenu } from "react-instantsearch";

export default function Numeric(props) {
  const { items, refine, createURL } = useNumericMenu(props);

  return (
    <ul className="flex flex-col mt-[10px] ml-[10px] gap-[10px]">
      {items.map((item) => (
        <li key={item.value}>
          <a
            href={createURL(item.value)}
            className={`${
              item.isRefined ? "bg-[#e9e9e9]" : ""
            } p-[3px] rounded-[10px] border-[1px] border-[#999999]`}
            onClick={(event) => {
              event.preventDefault();
              refine(item.value);
            }}
          >
            {item.label === "All" ? "Tất cả" : item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
