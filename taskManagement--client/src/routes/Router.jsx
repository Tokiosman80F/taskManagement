import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import TaskList from "../pages/TaskList/TaskList";
import AddTask from "../pages/AddTask/AddTask";
import EditTask from "../pages/EditTask/EditTask";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <TaskList />,
      },
      {
        path:"/tasklist",
        element:<TaskList/>
      },
      {
        path: "/addtask",
        element: <AddTask />,
      },
      {
        path:"/edittask",
        element:<EditTask/>
      }
    ],
  },
]);
