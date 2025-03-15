import { Routes, Route } from "react-router-dom";
import MobileviewFooter from "../components/MobileviewFooter";
import MobileDashboardView from "../components/MobileDashboardView";
import MobileViewSettings from "../components/MobileViewSettings";

const MobileDashboard = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MobileDashboardView />} />  
                <Route path="MobileViewSettings" element={<MobileViewSettings />} />  
            </Routes>
            <MobileviewFooter />
        </div>
    );
};

export default MobileDashboard;
