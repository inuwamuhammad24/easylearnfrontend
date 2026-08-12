import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function NavigationMenus() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext)

  // React state handling for the mobile slide-out layout panel
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleThemeChange() {
    appDispatch({ type: "changeTheme" })
  }

  function handleSearchClick() {
    const searchContainer = document.querySelector(".searching-overlay")
    if (searchContainer) {
      searchContainer.style.display = "block"
    }
  }

  return (
    <>
      {/* 1. Header Background Track */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300 ${
          appState.isDarkModeOn
            ? "bg-slate-900/90 border-slate-800 text-slate-100"
            : "bg-white/90 border-slate-100 text-slate-800"
        }`}
      >
        {/* 2. Inner Container: Full horizontal layout strip tracking */}
        <div className="w-full px-8 h-20 flex items-center justify-between">
          {/* Text-Based Logo Setup (Mirrors the Footer Architecture perfectly) */}
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="block select-none transition-transform active:scale-95"
            >
              <span
                className={`font-black text-2xl tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                easy
                <span className="text-blue-600 dark:text-blue-400">learn</span>
              </span>
            </Link>
          </div>

          {/* Expanded Desktop Links Wrapper */}
          <nav className="hidden md:flex items-center gap-12 text-sm font-bold tracking-wide">
            <Link
              to="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Courses
            </Link>
            <Link
              to="/articles"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Articles
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              About Us
            </Link>

            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Contact Us
            </a>
          </nav>

          {/* Action Control Drawer Right Alignment block */}
          <div className="flex items-center gap-6">
            {/* Desktop Action Utilities */}
            <div className="hidden md:flex items-center gap-4 text-slate-400 dark:text-slate-500">
              <button
                onClick={handleSearchClick}
                className="p-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                aria-label="Search"
              >
                <i className="fas fa-search text-base"></i>
              </button>
              <button
                onClick={handleThemeChange}
                className="p-2 hover:text-blue-600 dark:hover:text-blue-400 text-xl transition-all duration-200 cursor-pointer"
                aria-label="Toggle Theme"
              >
                {appState.isDarkModeOn ? (
                  "☀️"
                ) : (
                  <i className="fa-solid fa-moon"></i>
                )}
              </button>
            </div>

            {/* Profile Sign-in Validation State links */}
            <div className="flex items-center gap-4">
              {appState.isLogin ? (
                <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <img
                    src="https://share.google/h5ByfPno2U67NFksi"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <Link to="/user/signup" className="hidden sm:block">
                  <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-md shadow-blue-600/10 hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                    Sign up
                  </button>
                </Link>
              )}

              {/* Mobile Interaction Trigger icon */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex flex-col gap-1.5 p-2 md:hidden relative z-50 cursor-pointer"
                aria-label="Toggle Menu"
              >
                <span
                  className={`w-6 h-0.5 transition-all duration-300 ${appState.isDarkModeOn ? "bg-white" : "bg-slate-800"} ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span
                  className={`w-6 h-0.5 transition-all duration-300 ${appState.isDarkModeOn ? "bg-white" : "bg-slate-800"} ${isMobileMenuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`w-6 h-0.5 transition-all duration-300 ${appState.isDarkModeOn ? "bg-white" : "bg-slate-800"} ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Side Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-72 max-w-sm border-l shadow-2xl p-6 transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          appState.isDarkModeOn
            ? "bg-slate-900 border-slate-800 text-slate-200"
            : "bg-white border-slate-200 text-slate-800"
        } ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="space-y-8 pt-16">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <img
                src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1668020901/user-icon-person-profile-sign-vector-avatar-user-icon-person-profile-sign-vector-avatar-illustration-124240309_lv7avr.jpg"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              {appState.isLogin ? (
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Inuwa Muh'd
                </h3>
              ) : (
                <Link
                  to="/instructor/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-bold text-blue-600 dark:text-blue-400"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>

          <nav className="flex flex-col gap-1 text-base font-bold">
            {[
              { path: "/", label: "Home", icon: "fa-house" },
              { path: "/courses", label: "Courses", icon: "fa-graduation-cap" },
              { path: "#", label: "Practice", icon: "fa-book" },
              { path: "#", label: "About Us", icon: "fa-info-circle" },
              { path: "#", label: "Contact Us", icon: "fa-headphones-simple" },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition group text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <i
                  className={`fa-solid ${link.icon} w-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}
                ></i>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
          <button
            onClick={() => {
              handleThemeChange()
              setIsMobileMenuOpen(false)
            }}
            className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-sm font-bold border border-slate-100 dark:border-slate-800 cursor-pointer"
          >
            <span className="text-slate-500">Interface Display</span>
            <span>{appState.isDarkModeOn ? "☀️ Light" : "🌙 Dark"}</span>
          </button>

          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-4 px-3 py-3 font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm"
          >
            <i className="fa-solid fa-right-to-bracket"></i>
            <span>Sign in to Account</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NavigationMenus
