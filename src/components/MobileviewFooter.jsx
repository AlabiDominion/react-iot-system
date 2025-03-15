import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MobileviewFooter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);

    useEffect(() => {
        setActiveTab(location.pathname); // Update active tab when location changes
    }, [location]);

    const handleNavigation = (path) => {
        if (location.pathname !== path) {
            setActiveTab(path); 
            navigate(path); // Navigate to new page
        }
    };

    return (
        <footer className="mobileview-footer">
            <div className="navigation">
                <ul>
                    <li
                        className={`list ${activeTab === "/MobileDashboard" ? "active" : ""}`}
                        onClick={() => handleNavigation("/MobileDashboard")}
                    >
                        <div className="a">
                            <span className="icon">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                            <span className="text" >Home</span>
                        </div>
                        
                    </li>
                    <li
                        className={`list ${activeTab === "/MobileDashboard/MobileViewSettings" ? "active" : ""}`}
                        onClick={() => handleNavigation("/MobileDashboard/MobileViewSettings")}
                    >
                        <div className="a">
                            <span className="icon">
                                <ion-icon name="settings-outline"></ion-icon>
                            </span>
                            <span className="text">Settings</span>
                        </div>
                        
                    </li>
                    <div className="indicator"></div>
                </ul>
            </div>
        </footer>
    );
};

export default MobileviewFooter;
