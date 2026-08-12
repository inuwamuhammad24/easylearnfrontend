import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavigationMenus from "../../NavigationMenus"
import StateContext from "../../../StateContext"

function CreateCourse() {
  const appState = useContext(StateContext)
  const navigate = useNavigate()

  // Step wizard tracking state node
  const [activeStep, setActiveStep] = useState(1)

  // Core Schema Data Form Fields
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Computer Science")
  const [level, setLevel] = useState("Beginner")
  const [description, setDescription] = useState("")
  const [priceType, setPriceType] = useState("free") // Options: free, premium
  const [price, setPrice] = useState("")

  // Dynamic Curriculum Builder Array States
  const [curriculum, setCurriculum] = useState([
    {
      moduleTitle: "Module 1: Getting Started Foundations",
      lessons: ["Course Overview & Environment Setup"],
    },
  ])
  const [newModuleTitle, setNewModuleTitle] = useState("")
  const [newLessonText, setNewLessonText] = useState("")
  const [activeModuleTarget, setActiveModuleTarget] = useState(0)

  const categories = [
    "Computer Science",
    "JavaScript",
    "Python",
    "Programming",
    "Mathematics",
    "Physics",
    "Chemistry",
  ]

  // In-Memory structural modifiers for the course outlines array
  const handleAddNewModule = () => {
    if (!newModuleTitle.trim()) return
    setCurriculum([
      ...curriculum,
      { moduleTitle: newModuleTitle.trim(), lessons: [] },
    ])
    setActiveModuleTarget(curriculum.length)
    setNewModuleTitle("")
  }

  const handleAddNewLesson = () => {
    if (!newLessonText.trim()) return
    const updated = [...curriculum]
    updated[activeModuleTarget].lessons.push(newLessonText.trim())
    setCurriculum(updated)
    setNewLessonText("")
  }

  const handlePublishSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert(
        "Validation Error: Please step back and complete the Course Title and Description fields.",
      )
      return
    }

    alert(
      "Success! Your curriculum structure has been uploaded and created in your studio dashboard index.",
    )
    navigate("/instructor/studio")
  }

  return (
    <div
      className={`min-h-screen font-sans antialiased pb-24 transition-colors duration-300 ${
        appState.isDarkModeOn
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      <NavigationMenus />

      {/* 1. ARCHITECT HEADER WIZARD LANDMARK TIMELINE */}
      <header
        className={`w-full border-b ${appState.isDarkModeOn ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
      >
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h1
              className={`text-xl font-black ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
            >
              Course Creation Studio
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Design and structure your educational learning pathway.
            </p>
          </div>

          {/* Timeline Node Steps Tracker Layout */}
          <div className="flex items-center gap-2 text-xs font-bold font-mono">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center border-2 transition-all ${
                    activeStep === step
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : activeStep > step
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                        : appState.isDarkModeOn
                          ? "bg-slate-950 border-slate-800 text-slate-500"
                          : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  {step}
                </span>
                {step < 3 && (
                  <span className="text-slate-700 dark:text-slate-800 font-normal">
                    ──
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 2. CORE SYSTEM SPLIT STEP COMPONENT INJECTION VIEWPORTS */}
      <main className="max-w-3xl mx-auto px-6 mt-12">
        <div
          className={`p-6 sm:p-8 rounded-3xl border ${
            appState.isDarkModeOn
              ? "bg-slate-900 border-slate-800/80 shadow-xl shadow-black/20"
              : "bg-white border-slate-200/50 shadow-xs"
          }`}
        >
          {/* STEP FRAME 1: CORE METADATA SCHEMAS */}
          {activeStep === 1 && (
            <div className="space-y-5">
              <h2
                className={`text-lg font-black pb-2 border-b border-slate-100 dark:border-slate-800/60 ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                Phase 1: Course Blueprint Details
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  Course Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Advanced Python Optimization & Data Vector Pipelines"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border font-bold focus:outline-none transition-all ${
                    appState.isDarkModeOn
                      ? "bg-slate-950 border-slate-800 focus:border-blue-500/50 text-white"
                      : "bg-slate-50 border-slate-200 focus:border-blue-400"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    Target Field Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border font-bold focus:outline-none cursor-pointer ${
                      appState.isDarkModeOn
                        ? "bg-slate-950 border-slate-800 text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    {categories.map((cat, i) => (
                      <option key={i} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    Target Difficulty Rank
                  </label>
                  <select
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                    className={`w-full px-4 py-3 text-sm rounded-xl border font-bold focus:outline-none cursor-pointer ${
                      appState.isDarkModeOn
                        ? "bg-slate-950 border-slate-800 text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    {[
                      "Beginner",
                      "Intermediate",
                      "Advanced",
                      "All Skill Tiers",
                    ].map((lvl, i) => (
                      <option key={i} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  Course Extended Summary Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Outline the absolute learning goals, technical requirements, and target outcomes for prospective students..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none leading-relaxed resize-none ${
                    appState.isDarkModeOn
                      ? "bg-slate-950 border-slate-800 focus:border-blue-500/50 text-slate-300"
                      : "bg-slate-50 border-slate-200 focus:border-blue-400"
                  }`}
                />
              </div>
            </div>
          )}

          {/* STEP FRAME 2: PRICING CONFIGURATIONS */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <h2
                className={`text-lg font-black pb-2 border-b border-slate-100 dark:border-slate-800/60 ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                Phase 2: Pricing Matrix Setup
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {["free", "premium"].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPriceType(type)}
                    className={`p-5 rounded-2xl border flex flex-col gap-2 text-left cursor-pointer transition-all ${
                      priceType === type
                        ? "border-blue-600 bg-blue-600/5 font-black text-blue-500"
                        : appState.isDarkModeOn
                          ? "bg-slate-950 border-slate-800 text-slate-400"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="text-sm font-bold uppercase tracking-wider">
                      {type === "free" ? "🔓 Open Tier" : "💎 Premium Paid"}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {type === "free"
                        ? "Available instantly for all platform students."
                        : "Requires enrollment fee settlement token."}
                    </span>
                  </button>
                ))}
              </div>

              {priceType === "premium" && (
                <div className="space-y-1.5 pt-2 animate-fadeIn">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    Tuition Cost Price (Nigerian Naira - ₦)
                  </label>
                  <div
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${
                      appState.isDarkModeOn
                        ? "bg-slate-950 border-slate-800"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <span className="font-mono text-sm font-black text-slate-400">
                      ₦
                    </span>
                    <input
                      type="number"
                      placeholder="e.g., 2500"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      className="w-full bg-transparent text-sm font-bold focus:outline-none dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP FRAME 3: CURRICULUM ARCHITECT BUILDER */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <h2
                className={`text-lg font-black pb-2 border-b border-slate-100 dark:border-slate-800/60 ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                Phase 3: Curriculum Node Assembly
              </h2>

              {/* Layout Split: Input Adders left, Live array preview right */}
              <div className="grid md:grid-cols-12 gap-6">
                {/* Curriculum Input Injectors Sidebar (5 Columns) */}
                <div className="md:col-span-5 space-y-5 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800/80 pb-6 md:pb-0 md:pr-4">
                  {/* Module Builder */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Add New Module
                    </label>
                    <input
                      type="text"
                      placeholder="Module name..."
                      value={newModuleTitle}
                      onChange={e => setNewModuleTitle(e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${appState.isDarkModeOn ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200"}`}
                    />
                    <button
                      type="button"
                      onClick={handleAddNewModule}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-1.5 px-3 rounded-lg text-xs cursor-pointer transition-all"
                    >
                      + Insert Module Container
                    </button>
                  </div>

                  {/* Lesson Builder (Hooks directly into active module target index) */}
                  {curriculum.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/40">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Target Container Module
                      </label>
                      <select
                        value={activeModuleTarget}
                        onChange={e =>
                          setActiveModuleTarget(Number(e.target.value))
                        }
                        className={`w-full px-2 py-1.5 text-xs font-semibold rounded-lg border ${appState.isDarkModeOn ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200"}`}
                      >
                        {curriculum.map((mod, i) => (
                          <option key={i} value={i}>
                            {mod.moduleTitle}
                          </option>
                        ))}
                      </select>

                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block pt-2">
                        Add Lecture Node
                      </label>
                      <input
                        type="text"
                        placeholder="Lecture video/text title..."
                        value={newLessonText}
                        onChange={e => setNewLessonText(e.target.value)}
                        className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none ${appState.isDarkModeOn ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200"}`}
                      />
                      <button
                        type="button"
                        onClick={handleAddNewLesson}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg text-xs cursor-pointer transition-all"
                      >
                        + Inject Lecture Node
                      </button>
                    </div>
                  )}
                </div>

                {/* Array Manifest Preview Track Box (7 Columns) */}
                <div className="md:col-span-7 space-y-3 max-h-[340px] overflow-y-auto pr-1 scrollbar-none select-none">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Live Curriculum Manifest
                  </label>
                  {curriculum.map((mod, mIdx) => (
                    <div
                      key={mIdx}
                      className={`p-3.5 rounded-xl border text-xs font-semibold ${
                        activeModuleTarget === mIdx
                          ? "border-blue-500/40 bg-blue-500/[0.02]"
                          : "border-slate-100 dark:border-slate-800 bg-slate-950/20"
                      }`}
                    >
                      <p
                        className={`font-black tracking-tight flex items-center justify-between ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-800"}`}
                      >
                        <span>📁 {mod.moduleTitle}</span>
                        {activeModuleTarget === mIdx && (
                          <span className="text-[9px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-widest">
                            Active Target
                          </span>
                        )}
                      </p>
                      <ul className="mt-2 pl-4 space-y-1.5 text-slate-400 border-l border-slate-100 dark:border-slate-800 font-medium text-[11px]">
                        {mod.lessons.length === 0 ? (
                          <li className="italic text-slate-500">
                            No lecture items inside this block yet...
                          </li>
                        ) : (
                          mod.lessons.map((les, lIdx) => (
                            <li key={lIdx}>• {les}</li>
                          ))
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LOWER STUDIO INTERFACE FOOTER NAVIGATION ROW */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              disabled={activeStep === 1}
              onClick={() => setActiveStep(prev => prev - 1)}
              className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer disabled:opacity-30"
            >
              ← Back
            </button>

            {activeStep < 3 ? (
              <button
                type="button"
                onClick={() => setActiveStep(prev => prev + 1)}
                className="px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-950 hover:opacity-90 transition cursor-pointer shadow-sm font-mono"
              >
                Continue Phase →
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublishSubmit}
                className="px-5 py-2.5 text-xs font-black rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/10 transition cursor-pointer hover:-translate-y-0.5"
              >
                Finalize & Build Course
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CreateCourse
