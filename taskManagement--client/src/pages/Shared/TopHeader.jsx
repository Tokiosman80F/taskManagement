import moment from "moment/moment";
import { FaCalendarDays } from "react-icons/fa6";
const TopHeader = ({children}) => {
  return (
    <div className="h-[15%] bg-gradient-to-r from-orange-300 to-orange-400 text-white px-5">
      <div className="flex justify-between items-end ">
        <h1 className=" text-3xl ">{children}</h1>
        <div className="flex justify-center items-center gap-3 font-semibold">
          <span>
            <FaCalendarDays />
          </span>
          {moment().format("Do-MMM -YYYY")}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
