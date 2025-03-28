import './animation.css';
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignupEntry from './pages/MobileSignupPage';
import MobileSignInPage from './pages/MobileSignInPage';
import MobileDashboard from './pages/MobileDashboard';
import MobileViewControlRoom from './pages/MobileViewControlRoom';
import Error404 from './pages/Error404';
import DesktopDashboard from './pages/DesktopDashboard';
import DesktopSignInPage from './pages/DesktopSignInPage';
import DesktopSignupPage from './pages/DesktopSignupPage';
import DesktopSettingsPage from './pages/DesktopSettingsPage';



function App() {
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div>
            {loading ? (
                <div className="loaderPage">
                    <div className="pyramid-loader">
                        <div className="wrapper">
                            <span className="side side1"></span>
                            <span className="side side2"></span>
                            <span className="side side3"></span>
                            <span className="side side4"></span>
                            <span className="shadow"></span>
                        </div>
                    </div>
                </div>
            ) : (
                isMobile ? (
                    <div id="content">
                        <BrowserRouter>
                            <Routes>
                                <Route index element={<SignupEntry />} />
                                <Route path='/SignupEntry' element={<SignupEntry />} />
                                <Route path='/MobileSignInPage' element={<MobileSignInPage />} />
                                <Route path='/MobileDashboard/*' element={<MobileDashboard />} />
                                <Route path='/MobileViewControlRoom' element={<MobileViewControlRoom />} />
                                <Route path='*' element={<Error404 />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                ) : (
                    <div id="desktop-content"> 
                        <BrowserRouter>
                            <Routes>
                                <Route index element={<DesktopSignupPage />} />
                                <Route path='/DesktopSignupPage' element={<DesktopSignupPage />} />
                                <Route path='/DesktopSignInPage' element={<DesktopSignInPage />} />
                                <Route path='/DesktopDashboard' element={<DesktopDashboard />} />
                                <Route path='/DesktopSettingsPage' element={<DesktopSettingsPage />} />
                                <Route path='*' element={<Error404 />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                )
            )}
        </div>
    );
}

export default App;
