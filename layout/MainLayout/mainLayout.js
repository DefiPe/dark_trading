import SideNavBar from "@/components/sideNavBar";
import TopNavbar from "../TopLayout/topNavbar";

const MainLayout = ({ children })=> {
    return (
        <>
            <SideNavBar />
            <TopNavbar/>
            {children}
            
        </>
    );
}

export default MainLayout;