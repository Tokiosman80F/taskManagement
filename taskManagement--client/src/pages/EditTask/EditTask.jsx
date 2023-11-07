import { useState } from "react";
import TopHeader from "../Shared/TopHeader";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const data = useLoaderData();
  const { _id, taskName, description, date } = data;
  console.log("the data  =>", data);
  // use navigate
  const navigate = useNavigate();
  const state = ["Active", "In Progress", "Pending", "Complete"];
  const [statuses, setStatuses] = useState([state[0]]);
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
    fetch(`http://localhost:3000/update-task/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(taskDetail),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire(
            {
              position: "center",
              icon: "success",
              title: "Task Edited 😀",
              showConfirmButton: false,
              timer: 2300,
            },
            navigate("/tasklist")
          );
          form.reset();
        } else {
          Swal.fire({
            position: "center",
            icon: "info",
            title: "Already Edited ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="w-full">
      <TopHeader>{"Edit Task"}</TopHeader>
      <h2 className="text-center font-bold text-3xl my-5">Update Your Task</h2>
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
                defaultValue={taskName}
              />
            </div>
            <div className="w-full  px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Task Description
              </label>
              <textarea
                defaultValue={description}
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
                defaultValue={date}
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
                  defaultValue={state}
                  required
                  name="state"
                  onChange={handleSelect}
                  value={statuses}
                  className=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                
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
              value="Update"
              className="w-full uppercase   bg-orange-400 hover:bg-orange-500 text-white border  rounded py-3 px-4 cursor-pointer "
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
