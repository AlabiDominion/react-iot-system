import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const MobileDashboardView = () => {
    const [userName, setUserName] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
      const fill = localStorage.getItem("username")
      const user = document.querySelector(".user")
      user.textContent = "Hi,"+' '+fill
    }, []);


  return (
    <div>
        <div className="Dashboard">
        <h1 className='user'>welcome</h1>
        <div className="DashboardHeader">
          <p>Ready to take smart control over your home ?!</p>
          <img src="../cuate.png" alt="Dashboard picture" />
        </div>
        <h1>Rooms</h1>
        <Link to='/MobileViewControlRoom' className="Roomcard">
          <h2>Living Room</h2>
        </Link>
      </div>
    </div>
  )
}

export default MobileDashboardView
