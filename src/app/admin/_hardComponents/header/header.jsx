import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({ setIsOpen, user }) => {
  return (
    <div className="bg-white w-full h-[10%] flex justify-between items-center">
      <div className="pl-[10px]">
        <RxHamburgerMenu
          size={35}
          className="cursor-pointer"
          onClick={() => setIsOpen((pre) => !pre)}
        />
      </div>
      <div className="flex flex-col p-[10px] gap-[5px]">
        <h3>
          {user?.publicMetadata.organization
            ? user.publicMetadata.organization
            : "Admin"}
        </h3>
      </div>
    </div>
  );
};

export default Header;
