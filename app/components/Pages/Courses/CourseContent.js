import React, { useContext, useState } from "react"
import { useImmer } from "use-immer"
import NavigationMenus from "../../NavigationMenus"
import StateContext from "../../../StateContext"

function Classroom() {
  const appState = useContext(StateContext)

  // Track active navigation targets natively
  const [activeLessonId, setActiveLessonId] = useState(1)
  const [activeRightTab, setActiveRightTab] = useState("ai") // Options: ai, details

  const courseIndex = [
    { id: 1, title: "State of Matter", duration: "14:20" },
    { id: 2, title: "Equilibrium Constant Patterns", duration: "18:45" },
    { id: 3, title: "Atomic Structure & Matrix", duration: "12:10" },
    { id: 4, title: "Nuclear Chemistry Kinetics", duration: "22:15" },
    { id: 5, title: "Quantum Numbers Layout", duration: "16:40" },
    { id: 6, title: "Thermodynamics Loops", duration: "25:30" },
    { id: 7, title: "Principles of Organic Extraction", duration: "19:10" },
  ]

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
        appState.isDarkModeOn
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      <NavigationMenus />

      {/* Primary Split Viewport Container Layout */}
      <main className="w-full px-4 sm:px-6 py-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-6 items-start">
          {/* COLUMN 1: LEFT SIDEBAR - Course Outline Navigation (3 Columns) */}
          <aside
            className={`md:col-span-3 h-[calc(100vh-120px)] sticky top-24 overflow-y-auto scrollbar-none rounded-2xl border p-5 flex flex-col ${
              appState.isDarkModeOn
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200/60 shadow-xs"
            }`}
          >
            <div className="pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-black tracking-wider uppercase text-blue-500">
                Course Index
              </span>
              <h2
                className={`text-xl font-black mt-0.5 ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                Chemistry Matrix
              </h2>
            </div>

            <nav className="flex-1 space-y-1">
              {courseIndex.map(lesson => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLessonId(lesson.id)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all group cursor-pointer ${
                    activeLessonId === lesson.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                      : appState.isDarkModeOn
                        ? "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                        : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] ${
                        activeLessonId === lesson.id
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      {lesson.id}
                    </span>
                    <span className="truncate">{lesson.title}</span>
                  </span>
                  <span
                    className={`text-[10px] font-mono ${activeLessonId === lesson.id ? "text-blue-100" : "text-slate-400"}`}
                  >
                    {lesson.duration}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* COLUMN 2: CENTER PANEL - Video Player & Lecture Markdown Text (6 Columns) */}
          <div className="md:col-span-9 lg:col-span-6 space-y-6">
            {/* Premium Video Container Chassis */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl shadow-slate-950/10 border border-slate-200/40 dark:border-slate-800 bg-black relative group">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/KCL8zqjXbME"
                title="States of Matter"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </div>

            {/* Title & Author Meta Box */}
            <div
              className={`p-6 rounded-2xl border ${
                appState.isDarkModeOn
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200/60 shadow-2xs"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1
                    className={`text-2xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
                  >
                    All About Matter
                  </h1>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-[10px]">
                        IM
                      </span>
                      Inuwa Muhammad
                    </span>
                    <span>•</span>
                    <span>Updated May 2026</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer">
                    ← Previous
                  </button>
                  <button className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition cursor-pointer">
                    Next Challenge →
                  </button>
                </div>
              </div>
            </div>

            {/* Lecture Content Markdown Body */}
            <article
              className={`p-6 sm:p-8 rounded-2xl border text-sm sm:text-base leading-relaxed space-y-6 ${
                appState.isDarkModeOn
                  ? "bg-slate-900 border-slate-800 text-slate-300"
                  : "bg-white border-slate-200/60 text-slate-600 shadow-2xs"
              }`}
            >
              <p>
                Matter is a substance made up of various types of particles that
                occupies physical space and has inertia. According to the
                principles of modern physics, the various types of particles
                each have a specific mass and size. The most familiar examples
                of material particles are the electron, the proton, and the
                neutron.
              </p>

              <div
                className={`p-5 rounded-xl border border-l-4 border-l-blue-500 font-medium ${
                  appState.isDarkModeOn
                    ? "bg-blue-950/20 border-slate-800 text-slate-200"
                    : "bg-blue-50/50 border-slate-100 text-slate-700"
                }`}
              >
                Fundamentally, matter is composed of elementary particles called
                quarks and leptons, both of which are considered elementary
                units in that they are not composed of smaller structures.
              </div>

              <p>
                Atoms are the building blocks of matter. A combination of atoms
                forms a molecule. Large groups of atoms and molecules form the
                bulk matter of day-to-day life in the physical world. There are
                more than 100 different kinds of atoms listed in the periodic
                table, with each kind constituting a unique chemical element.
              </p>

              {/* In-Text Diagram Block */}
              <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900/40">
                <img
                  src="https://nigerianscholars.com/assets/uploads/2018/02/River_valley_umair_mohsin_flickr.jpg"
                  alt="Molecular compound breakdown flowchart diagram"
                  className="w-full h-auto object-cover max-h-[300px] opacity-90"
                />
              </div>

              <p>
                Atoms and/or molecules in two or more elements can join together
                to form a compound. This compound, which is the basis of matter,
                may not resemble any of the original ingredients. For example,
                sodium and chlorine combine to form common salt (NaCl), which is
                harmless and highly stable.
              </p>
            </article>
          </div>

          {/* COLUMN 3: RIGHT SIDEBAR - Socratic AI Workspace Assistant Panel (3 Columns) */}
          <aside
            className={`hidden lg:flex lg:col-span-3 h-[calc(100vh-120px)] sticky top-24 overflow-y-auto scrollbar-none rounded-2xl border flex-col ${
              appState.isDarkModeOn
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200/60 shadow-xs"
            }`}
          >
            {/* Minimalist Header Tab Toggler */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveRightTab("ai")}
                className={`flex-1 py-4 text-center border-b-2 transition-all cursor-pointer ${activeRightTab === "ai" ? "border-blue-600 text-blue-500" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                🤖 Socratic AI
              </button>
              <button
                onClick={() => setActiveRightTab("details")}
                className={`flex-1 py-4 text-center border-b-2 transition-all cursor-pointer ${activeRightTab === "details" ? "border-blue-600 text-blue-500" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                📁 Sub-topics
              </button>
            </div>

            {/* TAB PROFILE 1: The Intelligent Socratic Prompt Workspace Window */}
            {activeRightTab === "ai" && (
              <div className="p-4 flex-1 flex flex-col justify-between h-full min-h-[300px]">
                <div className="space-y-3 flex-1 overflow-y-auto">
                  <div
                    className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      appState.isDarkModeOn
                        ? "bg-slate-950 border-slate-800 text-slate-300"
                        : "bg-slate-50 border-slate-200/60 text-slate-600"
                    }`}
                  >
                    <span className="font-bold text-blue-500 block mb-0.5">
                      AI Buddy
                    </span>
                    Hey Inuwa! I am tracking your learning path. Stuck on
                    Quarks, Leptons, or Molecular context nodes? Ask me a
                    conceptual question!
                  </div>
                </div>

                {/* Micro Input Form */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs ${
                      appState.isDarkModeOn
                        ? "bg-slate-950 border-slate-800"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Ask the Socratic Tutor..."
                      className="w-full bg-transparent focus:outline-none text-slate-300"
                    />
                    <button className="text-blue-500 font-bold hover:scale-105 transition cursor-pointer">
                      ▲
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB PROFILE 2: Supplementary lesson resource references layout */}
            {activeRightTab === "details" && (
              <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Lesson Navigation Matrix
                  </h4>
                  <div className="flex flex-col gap-1 text-xs font-semibold">
                    {[
                      "Change of State Overview",
                      "Video Explanation Link",
                      "Interactive Evaluation Quiz",
                    ].map((item, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="p-2.5 rounded-lg text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200"
                      >
                        • {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Classroom
