const NavMobile = ({ isOpen, setIsOpen }) => {
  const genericHamburgerLine = `h-1 w-7 my-1 rounded-full bg-black transition ease transform duration-300`;

  return (
    <>
      <div className="md:hidden fixed right-[5px] top-[5px] z-[99]">
        <button
          className="flex flex-col h-12 w-12 rounded justify-center items-center group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`${genericHamburgerLine} ${
              isOpen ? "rotate-45 translate-y-3 " : ""
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`${genericHamburgerLine} ${
              isOpen ? "-rotate-45 -translate-y-3 " : ""
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default NavMobile;
