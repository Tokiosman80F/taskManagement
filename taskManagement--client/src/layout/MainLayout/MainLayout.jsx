import { Outlet } from "react-router-dom";
import SideNavBar from "../../pages/SideNavBar/SideNavBar";


const MainLayout = () => {
    return (
        <div className="flex ">
            <SideNavBar></SideNavBar>
           {<Outlet></Outlet>}
        </div>
    );
};

export default MainLayout;