import { useState } from "react";
import TopHeader from "../Shared/TopHeader";
import Swal from "sweetalert2";

const AddTask = () => {
  const state = ["Active", "In Progress", "Pending", "Complete"];
  const [statuses, setStatuses] = useState([]);
  const handleSelect = (e) => {
    setStatuses(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const taskName = form.taskName.value;
    const description = form.description.value;
    const date = form.date.value;
    const state = form.state.value;
    const taskDetail = { taskName, description, date, state };
    console.log(taskDetail);
    if (state === "Choose ur status") {
      Swal.fire({
        title: "select the state",
        text: "update the state",
        icon: "error"
      });
      return
    }
    fetch("https://task-management-server-kr0lz32ua-tokiosman0135-gmailcom.vercel.app//upload-task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(taskDetail),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 2300,
          });
          form.reset();
        }
      });
  };

  return (
    <div className="w-full ">
      <TopHeader>{`Add Your Tasks`}</TopHeader>
      <div
        className="flex flex-col  
                    items-center justify-center "
      >
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Task Name
              </label>
              <input
                required
                className=" w-full bg-gray-200 text-gray-700 border border-orange-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name="taskName"
              />
            </div>
            <div className="w-full  px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Task Description
              </label>
              <textarea
                required
                name="description"
                className="h-full min-h-[100px]  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Date
              </label>
              <input
                required
                name="date"
                className="  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="date"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                State
              </label>
              <div>
                <select
                  required
                  name="state"
                  onChange={handleSelect}
                  value={statuses}
                  className=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option selected>Choose ur status</option>
                  {state.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* submit btn */}
          <div className="w-full ">
            <input
              type="submit"
              className="w-full uppercase   bg-orange-400 hover:bg-orange-500 text-white border  rounded py-3 px-4 cursor-pointer "
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;

