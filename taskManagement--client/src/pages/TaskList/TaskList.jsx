import { useEffect, useState } from "react";
import TopHeader from "../Shared/TopHeader";
import { TbCalendarFilled, TbProgressBolt } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const TaskList = () => {
  const [showTasks, setShowTasks] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/show-task`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setShowTasks(data);
      });
  }, [showTasks]);
  console.log(showTasks);
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/delete-task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
  };
  return (
    <div className="w-full">
      <TopHeader>{"See All Task Here"}</TopHeader>
      <h2 className="text-center font-bold text-3xl my-5">
        Total Task:{showTasks.length}
      </h2>
      <div className="md:p-10">
        <div className=" flex flex-col gap-5 justify-center items-center">
          {showTasks.map((showTask) => (
            <div
              key={showTask._id}
              className="card w-2/3 bg-base-200 shadow-xl border border-orange-200"
            >
              <div className="card-body">
                <h2 className="card-title">
                  {showTask.taskName}
                  <div className="badge bg-orange-300 badge-lg ">
                    {" "}
                    <TbProgressBolt /> {showTask.status}
                  </div>
                  <div className="badge  bg-blue-400 badge-lg">
                    {" "}
                    <TbCalendarFilled /> {showTask.date}
                  </div>
                </h2>
                <p>{showTask.description}</p>
                <div className="card-actions justify-end uppercase">
                  <button
                    onClick={() => handleDelete(showTask._id)}
                    className="badge badge-outline badge-lg bg-red-500 text-white cursor-pointer"
                  >
                    <MdDelete /> Delete
                  </button>
                  <Link to="/edittask">
                    <button className="badge badge-outline badge-lg bg-blue-500 text-white cursor-pointer ">
                      <BiEdit /> Edit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
