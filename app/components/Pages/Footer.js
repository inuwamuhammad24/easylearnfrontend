import React, { useContext } from "react"
import StateContext from "../../StateContext"

export default function Footer() {
  const appState = useContext(StateContext)
  return (
    <>
      {/* Footer */}
      <footer
        className={`w-full py-16 mt-32 px-6 border-t transition-colors duration-300 ${
          appState.isDarkModeOn
            ? "bg-slate-950 border-slate-900 text-slate-500"
            : "bg-slate-900 text-slate-400 border-slate-800"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl text-white tracking-tight">
              easy<span className="text-blue-400">learn</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">
              | Smart Education
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-medium">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              FAQs
            </a>
          </div>
          <p className="text-slate-500 text-xs md:text-right">
            &copy; {new Date().getFullYear()} easylearn. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
