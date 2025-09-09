import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

import Loading from "./Loading"

function NavigationMenus() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  function handleClick() {
    const navlines = document.querySelectorAll(".mnav")
    const navContainer = document.querySelector(".mobile-nav-menus")
    navlines[0].classList.toggle("n1open")
    navlines[1].classList.toggle("n2open")
    navlines[2].classList.toggle("n3open")
    navContainer.classList.toggle("openNav")
  }

  function handleThemeChange() {
    // let scheme = document.querySelector("html")
    // if (scheme.style.colorScheme == "light") {
    //   scheme.style.background = "#1b1b1b"
    //   scheme.style.colorScheme = "dark"
    // } else {
    //   scheme.style.background = "#fff"
    //   scheme.style.colorScheme = "light"
    // }
    appDispatch({ type: "changeTheme" })
  }

  function handleSearchClick() {
    const searchContainer = document.querySelector(".searching-overlay")
    searchContainer.style.display = "block"
    searchContainer.style.animate = "550ms ease drop-search"
  }

  return (
    <>
      <div className={appState.isDarkModeOn ? "header background-dark header-border-dark flex items-center justify-round px-6 top-0 shadow-sm border-b-black" : "header flex bg-white items-center justify-round px-6 top-0 shadow-sm border-b-[#f1f1f1]"}>
        <div className="logo">
          <div className="logo-img">
            <Link to="/">{appState.isDarkModeOn ? <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/w_200/v1722723842/dan473tr0golzep6x3c_sjfgkr.svg" alt="Logo" /> : <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/c_crop,w_200,h_100,g_auto/v1691789500/EasyLearnLigthMode_cf3fuh.png" alt="logo" />}</Link>
          </div>
        </div>
        {/* <!-- desktop navgation bar --> */}
        <div className="nav-bar">
          <div className="nav">
            <ul>
              <Link to="/">
                <li style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Home</li>
              </Link>
              <Link to="/courses">
                <li style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Courses</li>
              </Link>
              <a to="#">
                <li style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Practice</li>
              </a>
              <a to="#">
                <li style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>About Us</li>
              </a>
              <a to="#">
                <li style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Contact Us</li>
              </a>
              <li onClick={handleSearchClick} style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}} className="search-icon">
                <i className="fas fa-search"></i>
              </li>
              <li style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}} className="search-icon" onClick={handleThemeChange}>
                {appState.isDarkModeOn ? <i style={{ fontSize: "25px" }}>&#9788;</i> : <i className="fa-solid fa-moon"></i>}
              </li>
            </ul>
          </div>

          <div className="login">
            <li style={appState.isDarkModeOn ? { color: "#f1f1f1" } : { color: "#1b1b1b" }} className="search-icon">
              <i className="fas fa-search"></i>
            </li>
            <li style={appState.isDarkModeOn ? { color: "#f1f1f1" } : { color: "#1b1b1b" }} className="search-icon" onClick={handleThemeChange}>
              {appState.isDarkModeOn ? <i style={{ fontSize: "25px", position: "relative", top: "-5px" }}>&#9788;</i> : <i class="fa-solid fa-moon"></i>}
            </li>
            <div className="mnavlogin">
              {appState.isLogin ? (
                <div className="profile-pic-container">
                  <div>
                    <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1668020901/user-icon-person-profile-sign-vector-avatar-user-icon-person-profile-sign-vector-avatar-illustration-124240309_lv7avr.jpg" alt="Profile" />
                  </div>
                </div>
              ) : (
                <Link to="/instructor/signup">
                  <button>Join us</button>
                </Link>
              )}

              {/* Three navigation lines for mobile phones */}
              <div onClick={handleClick} className="mobile-menu">
                <div style={appState.isDarkModeOn ? { background: "#f1f1f1" } : {}} className="n1 mnav"></div>
                <div style={appState.isDarkModeOn ? { background: "#f1f1f1" } : {}} className="n2 mnav"></div>
                <div style={appState.isDarkModeOn ? { background: "#f1f1f1" } : {}} className="n3 mnav"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-nav-menus" style={appState.isDarkModeOn ? { borderRight: "2px solid #000" } : { background: "#fff", borderRight: "2px solid #ccc" }}>
          <div className="nav-mobile">
            <div className="sidebar-profile">
              <div className="sidebar-profile-pic-container">
                <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1668020901/user-icon-person-profile-sign-vector-avatar-user-icon-person-profile-sign-vector-avatar-illustration-124240309_lv7avr.jpg" alt="img" />
              </div>
              <div className="sidebar-profile-name">{appState.isLogin ? <h3>Inuwa Muh'd</h3> : <a href="/instructor/signup">Join Us</a>}</div>
            </div>
            <ul className="first-ul">
              <Link style={appState.isDarkModeOn ? {} : { color: "#1b1b1b" }} to="/">
                <i className="fa-solid fa-house"></i>
                <li>Home</li>
              </Link>
              <Link style={appState.isDarkModeOn ? {} : { color: "#1b1b1b" }} to="/courses">
                <i className="fa-solid fa-graduation-cap"></i>
                <li>Courses</li>
              </Link>
              <Link style={appState.isDarkModeOn ? {} : { color: "#1b1b1b" }} to="#">
                <i className="fa-solid fa-book"></i>
                <li>Practice</li>
              </Link>
              <Link style={appState.isDarkModeOn ? {} : { color: "#1b1b1b" }} to="#">
                <i className="fa-solid fa-info"></i>
                <li>About Us</li>
              </Link>
              <Link style={appState.isDarkModeOn ? {} : { color: "#1b1b1b" }} to="#">
                <i className="fa-solid fa-headphones-simple"></i>
                <li>Contact Us</li>
              </Link>
            </ul>
            <ul>
              <Link style={appState.isDarkModeOn ? {} : { color: "#1b1b1b" }} to="#">
                <i class="fa-solid fa-gear"></i>
                <li>Settings</li>
              </Link>
              <Link style={appState.isDarkModeOn ? {} : { color: "#1b1b1b" }} to="/login">
                <i className="fa-solid fa-right-to-bracket"></i>
                <li>Sign in</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavigationMenus
