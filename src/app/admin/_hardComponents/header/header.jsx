import { RxHamburgerMenu } from "react-icons/rx";
import { useClerk } from "@clerk/clerk-react";

const Header = ({ setIsOpen, user }) => {
  const { signOut } = useClerk();
  return (
    <div className="bg-white w-full h-[10vh] flex justify-between items-center">
      <div className="pl-[10px]">
        <RxHamburgerMenu
          size={35}
          className="cursor-pointer"
          onClick={() => setIsOpen((pre) => !pre)}
        />
      </div>
      <div className="flex flex-col p-[10px] gap-[5px]">
        <h3>
          {user?.publicMetadata.organization &&
            user.publicMetadata.organization}
        </h3>
        <button onClick={() => signOut()}>Đăng xuất</button>
      </div>
    </div>
  );
};

export default Header;
