import moment from "moment/moment";
import { useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
const AddTask = () => {
  const state = ["Active", "In Progress", "Pending", "Complete"];
  const [statuses, setStatuses] = useState([state[0]]);
  return (
    <div className="w-full ">
      <div className="  h-[15%] bg-gradient-to-r from-orange-300 to-orange-400 text-white px-5">
        <div className="flex justify-between items-end ">
          <h1 className=" text-3xl ">Add Your Task</h1>
          <div className="flex justify-center items-center gap-3 font-semibold">
            <span>
              <FaCalendarDays />
            </span>
            {moment().format("Do-MMM -YYYY")}
          </div>
        </div>
      </div>
      <div
        className="flex flex-col  
                    items-center justify-center "
      >
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Task Name
              </label>
              <input
                className="  w-full bg-gray-200 text-gray-700 border border-orange-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
              />
            </div>
            <div className="w-full  px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Task Description
              </label>
              <textarea className="h-full min-h-[100px]  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date
              </label>
              <input
                className="  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                State
              </label>
              <div className="">
                <select value={statuses} className=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  {state.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* submit btn */}
          <div className="w-full ">
            <input type="submit" className="w-full uppercase   bg-orange-400 hover:bg-orange-500 text-white border  rounded py-3 px-4 cursor-pointer "></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

// background-color: ;
// background-image: linear-gradient();
// background-color: #;
// background-image: ;
// background-color: #;
// background-image: linear-gradient();
