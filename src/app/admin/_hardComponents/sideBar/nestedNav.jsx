"use client";
import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSpring, animated } from "@react-spring/web";
import { memo } from "react";
import useMeasure from "react-use-measure";

const NestedNav = ({ data, setRootData }) => {
  const pathName = usePathname();
  const [ref, { height }] = useMeasure();
  const style = useSpring({
    height: data.isChecked ? height : 0,
    config: { duration: 100 },
  });

  // useEffect(() => {
  //   animate({
  //     immediate: !ref.current,
  //     height: data.isChecked ? ref.current.offsetHeight : 0,
  //     config: {
  //       duration: 100,
  //     },
  //   });
  // }, [data.isChecked]);

  return (
    <>
      <button
        className={`text-[#BDE0EC] w-full h-[8vh] items-center justify-between flex pl-[15px] pr-[15px] hover:bg-[#46546C] ${
          data.isChecked ? "bg-[#303C50]" : ""
        }`}
        onClick={() => {
          setRootData((pre) =>
            pre.map((item) =>
              data.id === item.id
                ? { ...item, isChecked: item.isChecked ? false : true }
                : { ...item, isChecked: false }
            )
          );
        }}
      >
        {data.title}
        <AiOutlineRight
          className={`float-right !duration-100 transition-all ${
            data.isChecked ? "rotate-90" : ""
          }`}
        />
      </button>
      <animated.div style={style} className="overflow-hidden">
        <div
          ref={ref}
          className={`flex flex-col w-full ${
            data.isChecked ? "bg-[#303C50]" : ""
          }`}
        >
          {data.subNav.map((item, index) => {
            return (
              <Link
                key={index}
                className={`text-[#BDE0EC] w-full h-[8vh] items-center flex pl-[25px]  ${
                  pathName === item.path ? "bg-[#46546C]" : "hover:bg-[#46546C]"
                }`}
                href={item.path}
              >
                <p>{item.title}</p>
              </Link>
            );
          })}
        </div>
      </animated.div>
    </>
  );
};

export default memo(NestedNav);
