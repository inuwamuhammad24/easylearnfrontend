import React, { useContext, useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import NavigationMenus from "../../NavigationMenus"
import StateContext from "../../../StateContext"

// Complete rich mock schema to safely match item IDs during user click transitions
const MOCK_COURSE_DATA = {
  "js-1": {
    id: "js-1",
    title: "Learn JavaScript: Become a Full Stack Developer",
    subtitle:
      "Master JavaScript from absolute basics to advanced architectural patterns including asynchronous runtimes, APIs, and modern deployment models.",
    description:
      "JavaScript is the engine driving the entire modern web industry. This course breaks down complex mental concepts down into bite-sized milestones. You won't just watch videos—you will actively write scripts, configure endpoints, and validate memory scopes within our live interactive workspace panels.",
    author: "Inuwa Muhammad",
    institution: "University of Jos",
    authorBio:
      "Software Architect and best graduating Computer Science student. Specializes in building scalable MERN stack systems and RAG-driven AI platform nodes.",
    price: 1400,
    free: false,
    rating: "4.9",
    reviews: 412,
    learners: 3420,
    level: "Beginner to Advanced",
    duration: "24 hours total content",
    lecturesCount: 42,
    lastUpdated: "May 2026",
    modules: [
      {
        title: "Module 1: JavaScript Engine Fundamentals",
        lessons: [
          "Understanding Execution Context & Scopes",
          "The Call Stack and Memory Heap Matrix",
          "Variables, Data Types, and Garbage Collection",
        ],
      },
      {
        title: "Module 2: Asynchronous Event-Driven Architectures",
        lessons: [
          "Promises Deep-Dive & Error Catching",
          "Async/Await Structural Patterns",
          "The Event Loop, Microtask Queues, and Web APIs",
        ],
      },
      {
        title: "Module 3: Full-Stack Integration Pipelines",
        lessons: [
          "Configuring Fetch & Axios Middleware instances",
          "REST API Response Validation",
          "Building Local Persistent State Nodes",
        ],
      },
    ],
  },
  "ai-1": {
    id: "ai-1",
    title: "Building RAG AI Assistants with Node.js & Atlas",
    subtitle:
      "Architect smart, production-grade search engines by combining vector databases with large language models.",
    description:
      "Move past generic chatbot windows. Learn how to securely segment enterprise text data, calculate array embedding coordinates, and build fully grounded AI agents that bypass standard LLM token limits safely.",
    author: "Inuwa Muhammad",
    institution: "University of Jos",
    price: 2500,
    free: false,
    rating: "4.9",
    reviews: 188,
    learners: 1650,
    level: "Advanced",
    duration: "18 hours total content",
    lecturesCount: 28,
    lastUpdated: "April 2026",
    modules: [
      {
        title: "Module 1: Tokenization and Document Ingestion",
        lessons: [
          "Parsing Complex Text Structures",
          "Recursive Text Chunking Techniques",
        ],
      },
      {
        title: "Module 2: Vector Database Infrastructure",
        lessons: [
          "Setting up MongoDB Atlas Vector Search indices",
          "Cosine Similarity Formula Analysis",
        ],
      },
    ],
  },
}

function CourseDetails() {
  const appState = useContext(StateContext)
  const { courseId } = useParams() // Captures the exact ID variable string from the router link path

  const [course, setCourse] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("curriculum")

  useEffect(() => {
    // Falls back to standard ID matching if dynamic state is parsing
    const selectedCourse =
      MOCK_COURSE_DATA[courseId] || MOCK_COURSE_DATA["js-1"]
    setCourse(selectedCourse)

    // Simulate checking global enrollment arrays later
    if (courseId === "js-1") {
      setIsEnrolled(true) // Simulating an active student for the JS track
    }
  }, [courseId])

  if (!course) return null

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
        appState.isDarkModeOn
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      <NavigationMenus />

      {/* 1. HERO CONTEXT BANNER STRIP - Fluid layout background split */}
      <section
        className={`w-full border-b py-12 md:py-16 ${
          appState.isDarkModeOn
            ? "bg-slate-900 border-slate-800"
            : "bg-slate-900 text-slate-100 border-slate-950"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Hero Left Content Area */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-blue-400">
              <span className="bg-blue-500/10 px-2.5 py-1 rounded">
                Specialization Track
              </span>
              <span>•</span>
              <span className="text-slate-400">{course.level}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-medium">
              {course.subtitle}
            </p>

            {/* Core Course Meta Badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs font-bold text-slate-400">
              <span className="text-amber-400">
                ★ {course.rating}{" "}
                <span className="text-slate-500 font-medium">
                  ({course.reviews} ratings)
                </span>
              </span>
              <span>👥 {course.learners.toLocaleString()} active learners</span>
              <span>⏱ Updated {course.lastUpdated}</span>
            </div>
          </div>

          {/* Hero Right Action Sandbox Card Panel */}
          <div className="md:col-span-5 w-full">
            <div
              className={`rounded-2xl p-6 border shadow-2xl transition-all ${
                appState.isDarkModeOn
                  ? "bg-slate-950 border-slate-800"
                  : "bg-white text-slate-800 border-slate-200/60"
              }`}
            >
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Access Tier Pricing
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-3xl font-black ${course.free ? "text-emerald-500" : appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
                  >
                    {course.free ? "Free" : `₦${course.price.toLocaleString()}`}
                  </span>
                  {!course.free && (
                    <span className="text-xs line-through text-slate-400 font-medium">
                      ₦12,000
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs font-semibold text-slate-400 dark:text-slate-500 pt-2">
                  <div className="flex items-center gap-2">
                    ✔ Full lifetime workspace node access
                  </div>
                  <div className="flex items-center gap-2">
                    ✔ Interactive timeline code sandboxes included
                  </div>
                  <div className="flex items-center gap-2">
                    ✔ Verifiable skill tree micro-certificate nodes
                  </div>
                </div>

                {/* Conditional Enrollment Call To Action Branch */}
                {isEnrolled ? (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-blue-500">Your Progress</span>
                      <span className="text-slate-400">35% Completed</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full w-[35%]"></div>
                    </div>
                    <Link
                      to={`/classroom/${course.id}`}
                      className="block w-full pt-1"
                    >
                      <Link
                        to="/course/fsdfsdf/sfsdfs"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/10 active:scale-98 transition-all cursor-pointer text-sm"
                      >
                        Resume Learning Workspace
                      </Link>
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEnrolled(true)}
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/10 active:scale-98 transition-all cursor-pointer text-sm"
                  >
                    Enroll in This Curriculum
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABBED CONTENT VIEWPORTS SECTION - Curriculums left, Authors detail right */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT CHASSIS: Core course specs information drawer (8 Columns) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Minimalist View Toggler Ribbon */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-bold">
              <button
                onClick={() => setActiveTab("curriculum")}
                className={`pb-3 border-b-2 transition-all cursor-pointer ${activeTab === "curriculum" ? "border-blue-600 text-blue-500 font-black" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                Curriculum Structure
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`pb-3 border-b-2 transition-all cursor-pointer ${activeTab === "about" ? "border-blue-600 text-blue-500 font-black" : "border-transparent text-slate-400 hover:text-slate-200"}`}
              >
                About This Path
              </button>
            </div>

            {/* TAB FRAME 1: Curriculum Module Expansion Lists */}
            {activeTab === "curriculum" && (
              <div className="space-y-4">
                {course.modules.map((mod, index) => (
                  <div
                    key={index}
                    className={`border rounded-2xl p-5 transition-all ${
                      appState.isDarkModeOn
                        ? "bg-slate-900 border-slate-800"
                        : "bg-white border-slate-200/60 shadow-2xs"
                    }`}
                  >
                    <h3
                      className={`font-black text-base mb-4 flex items-center gap-3 ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-800"}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      {mod.title}
                    </h3>

                    <ul className="space-y-2.5 pl-9 border-l border-slate-100 dark:border-slate-800">
                      {mod.lessons.map((lesson, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-400 py-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <i className="fa-regular fa-play-circle text-slate-500"></i>
                            {lesson}
                          </span>
                          <span className="text-xs text-slate-500 font-medium font-mono">
                            15:40
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* TAB FRAME 2: Extended text descriptions info block */}
            {activeTab === "about" && (
              <div
                className={`p-6 rounded-2xl border text-sm sm:text-base leading-relaxed ${
                  appState.isDarkModeOn
                    ? "bg-slate-900/40 border-slate-800 text-slate-400"
                    : "bg-white border-slate-200/60 text-slate-600 shadow-2xs"
                }`}
              >
                <p>{course.description}</p>
              </div>
            )}
          </div>

          {/* RIGHT CHASSIS: Dedicated Instructor profile anchor (4 Columns) */}
          <aside
            className={`lg:col-span-4 p-6 rounded-2xl border sticky top-40 ${
              appState.isDarkModeOn
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-200/60 shadow-xs"
            }`}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Instructor Profile
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-black text-sm border border-blue-500/20 shadow-2xs">
                  IM
                </div>
                <div>
                  <h4
                    className={`font-black text-base ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
                  >
                    {course.author}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    {course.institution}
                  </p>
                </div>
              </div>

              <p
                className={`text-xs leading-relaxed font-medium pt-2 border-t border-slate-100 dark:border-slate-800/80 ${
                  appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {course.authorBio ||
                  "Platform content educator tracking curriculum compliance nodes directly inside our engineering workspaces."}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default CourseDetails
