import { useState } from "react";
import { BiSolidLogOut } from "react-icons/bi";
import {
  FaAnglesLeft,
  FaCirclePlus,
  FaCircleUser,
  FaIoxhost,
  FaMoneyCheck,
} from "react-icons/fa6";
import { NavLink } from "react-router-dom";
const SideNavBar = () => {
  const [open, setOpen] = useState(true);
  const menuItems = [
    { title: "Task List", icon: <FaMoneyCheck />, link: "/tasklist" },
    { title: "Add Task ", icon: <FaCirclePlus />, link: "/addtask" },
  ];

  return (
    <div>
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen border border-gray-300 relative p-5 flex flex-col justify-evenly `}
      >
        <FaAnglesLeft
          onClick={() => setOpen(!open)}
          style={{ padding: "6px" }}
          className={` ${
            !open && `rotate-180 `
          } text-3xl  bg-orange-400 absolute -right-3 top-3 cursor-pointer  rounded-full`}
        />
        {/* icon */}
        <div className="flex  items-center ">
          <div>
            <FaIoxhost className="text-gray-600 text-2xl" />
          </div>
          <h1 className={`${!open && "scale-0"} font-bold text-2xl`}>
            <span className="text-orange-500">Tasky</span>Mate
          </h1>
        </div>
        {/* user */}
        <div className=" flex items-center gap-5 cursor-pointer text-white bg-orange-500 hover:bg-orange-400  p-2 rounded-lg duration-200 ">
          <FaCircleUser />
          <span className={` ${!open && `hidden duration-200`} font-semibold`}>
            User
          </span>
        </div>
        {/* menu */}
        <div>
          <ul>
            {menuItems.map((item, index) => (
              <NavLink to={item.link} key={index}>
                <li className="flex items-center  gap-5 cursor-pointer hover:bg-orange-400 hover:text-white p-2 rounded-lg duration-200">
                  {item.icon}
                  <span
                    className={` ${
                      !open && `hidden duration-200`
                    } font-semibold`}
                  >
                    {item.title}
                  </span>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
        {/* logout */}
        <div className="flex items-center gap-5 cursor-pointer  hover:bg-orange-400  p-2 rounded-lg duration-200">
          <BiSolidLogOut className="text-2xl" />
          <span className={` ${!open && `hidden duration-200`} font-semibold`}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
