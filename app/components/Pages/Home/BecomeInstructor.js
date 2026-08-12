import React, { useContext } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import StateContext from "../../../StateContext"

const BecomeInstructor = () => {
  const appState = useContext(StateContext)

  return (
    <section className="max-w-6xl mx-auto mt-32 px-6 mb-20">
      <div
        className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
          appState.isDarkModeOn
            ? "bg-slate-900 border-slate-800 shadow-xl shadow-black/40"
            : "bg-white border-slate-100 shadow-xl shadow-slate-200/50"
        }`}
      >
        <div className="grid md:grid-cols-2 items-center">
          {/* Left Side: Illustration Panel (Slides in from LEFT) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`relative h-64 md:h-full min-h-[400px] flex items-center justify-center p-10 transition-colors duration-300 ${
              appState.isDarkModeOn ? "bg-slate-800/40" : "bg-slate-100/50"
            }`}
          >
            <img
              src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1764972373/teacher_auh48n.svg"
              alt="Instructor teaching"
              className="w-full h-full max-h-[320px] object-contain drop-shadow-md"
            />
          </motion.div>

          {/* Right Side: Informational copy (Slides in from RIGHT) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="p-8 md:p-12 lg:p-16"
          >
            <h2
              className={`text-3xl font-extrabold tracking-tight mb-4 ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
            >
              Become an Instructor
            </h2>
            <p
              className={`mb-8 text-base sm:text-lg leading-relaxed ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
            >
              Instructors from around the world teach millions of students on{" "}
              <span className="font-semibold text-blue-500">easylearn</span>. We
              provide the tools, visual skill maps, and structured environments
              to help you share what you love.
            </p>

            {/* Premium Checked Feature List */}
            <ul className="space-y-4 mb-8">
              {[
                "Earn revenue by sharing your industrial expertise",
                "Inspire global students with adaptive learning paths",
                "Join a growing community of technical experts",
              ].map((text, index) => (
                <li key={index} className="flex items-start">
                  <div
                    className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-1 text-xs ${
                      appState.isDarkModeOn
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span
                    className={`ml-3 font-medium text-sm sm:text-base ${appState.isDarkModeOn ? "text-slate-300" : "text-slate-700"}`}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Cohesive CTA Action Link */}
            <Link to="/instructor/signup" className="block w-full sm:w-max">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-600/10 hover:-translate-y-0.5 active:scale-98 transition-all duration-200 cursor-pointer text-center text-sm">
                Start Teaching Today
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BecomeInstructor
