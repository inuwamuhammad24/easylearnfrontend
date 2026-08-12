import React, { useContext } from "react"
import StateContext from "../../../StateContext"
import { Link } from "react-router-dom"

function Welcome() {
  const appState = useContext(StateContext)

  return (
    <section
      className={`w-full transition-colors duration-300 ${appState.isDarkModeOn ? "bg-slate-900 text-white" : "bg-gradient-to-b from-blue-50/60 to-white text-slate-800"}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & CTAs */}
        <div className="md:col-span-7 space-y-6 text-left order-2 md:order-1">
          {/* Subtle Accent Badge */}
          <div className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-2xs">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
            </span>
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
              Next-Gen AI Learning Platform
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
          >
            Learn New Skills <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Anytime, Anywhere.
            </span>
          </h1>

          {/* Platform Subtext */}
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Upgrade your knowledge with highly interactive, adaptive online
            courses mapped by professional educators and backed by instant,
            socratic AI mentorship.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-4 items-center">
            <Link
              to="/courses"
              className="bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Browse Courses
            </Link>
            <Link
              to="/skill-trees"
              className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-7 py-3.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700/60 transition duration-200 cursor-pointer"
            >
              View Skill Trees
            </Link>
          </div>
        </div>

        {/* Right Column: Dynamic Graphic Container */}
        <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
          <div className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-full drop-shadow-xl transition-all duration-500 hover:scale-[1.02]">
            {appState.isDarkModeOn ? (
              <img
                src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1693167618/Untitled_1_ef9t4m.svg"
                alt="Smart learning layout illustration"
                className="w-full h-auto object-contain"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1667068110/education8_mjsqtm.svg"
                alt="Online learning workspace illustration"
                className="w-full h-auto object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Welcome
