import React, { useContext, useEffect, useState } from "react"
import Axios from "axios"
import { useImmer } from "use-immer"
import Loading from "../../Loading"
import StateContext from "../../../StateContext"

// Premium mock data layer supporting immediate interface parsing before network connection
const MOCK_COURSES = [
  {
    id: 1,
    name: "Introduction to MongoDB & MERN Stack",
    description:
      "Master scalable document databases and learn to connect clean endpoints to client side apps.",
    author: "Inuwa Muhammad",
    institution: "University of Jos",
    students: 1420,
    date: "May 2026",
    free: true,
    readTime: "8 hrs",
  },
  {
    id: 2,
    name: "Building RAG AI Assistants with Node.js",
    description:
      "Integrate large language models into your custom software using smart search indices.",
    author: "Inuwa Muhammad",
    institution: "University of Jos",
    students: 890,
    date: "Apr 2026",
    free: true,
    readTime: "12 hrs",
  },
  {
    id: 3,
    name: "Advanced React & Interactive Workspaces",
    description:
      "Learn layout tracking state architectures, clean hook management, and rapid Tailwind compilation features.",
    author: "Inuwa Muhammad",
    institution: "University of Jos",
    students: 2310,
    date: "Mar 2026",
    free: false,
    readTime: "15 hrs",
  },
  {
    id: 4,
    name: "Full-Stack Express API Security Routing",
    description:
      "Secure your payment integrations and verify middleware histories efficiently.",
    author: "Inuwa Muhammad",
    institution: "University of Jos",
    students: 654,
    date: "Feb 2026",
    free: true,
    readTime: "6 hrs",
  },
  {
    id: 5,
    name: "Data Science & Matrix Analysis with Pandas",
    description:
      "Deep dive into data analysis, filtering pipelines, and statistical plotting arrays.",
    author: "Inuwa Muhammad",
    institution: "University of Jos",
    students: 1105,
    date: "Jan 2026",
    free: false,
    readTime: "10 hrs",
  },
]

function TopicsYouMayLike() {
  const appState = useContext(StateContext)
  const [currentShift, setCurrentShift] = useState(0)

  const [state, setState] = useImmer({
    courses: [],
    isLoading: true,
  })

  // Dynamic calculation of cards displayed on viewport grid
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3
    if (window.innerWidth >= 1024) return 3
    if (window.innerWidth >= 640) return 2
    return 1
  }

  useEffect(() => {
    let isMounted = true
    async function fetchCourses() {
      try {
        const response = await Axios.get("http://localhost:8000")
        if (isMounted && response.data?.length) {
          setState(draft => {
            draft.courses = response.data
            draft.isLoading = false
          })
        }
      } catch (err) {
        if (isMounted) {
          setState(draft => {
            draft.courses = MOCK_COURSES
            draft.isLoading = false
          })
        }
      }
    }
    fetchCourses()
    return () => {
      isMounted = false
    }
  }, [])

  // Auto-slide loop engine
  useEffect(() => {
    if (!state.courses.length || state.isLoading) return

    const intervalId = setInterval(() => {
      handleForward()
    }, 6000)

    return () => clearInterval(intervalId)
  }, [state.courses.length, currentShift, state.isLoading])

  const handleForward = () => {
    const visibleCount = getVisibleCount()
    const maxShift = Math.max(0, state.courses.length - visibleCount)
    setCurrentShift(prev => (prev >= maxShift ? 0 : prev + 1))
  }

  const handleBackward = () => {
    setCurrentShift(prev => (prev <= 0 ? 0 : prev - 1))
  }

  if (state.isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 flex justify-center items-center">
        <Loading />
      </div>
    )
  }

  return (
    <section className="max-w-6xl mx-auto mt-28 px-6 relative">
      {/* Title Layout */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h2
            className={`text-3xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
          >
            Recommended For You
          </h2>
          <p
            className={`text-sm mt-1.5 ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
          >
            Tailored study directions based on your chosen specialization
            criteria.
          </p>
        </div>

        {/* Carousel Sliders Navigation */}
        <div className="flex items-center gap-2 self-end">
          <button
            onClick={handleBackward}
            disabled={currentShift === 0}
            className={`w-11 h-11 rounded-xl border flex items-center justify-center text-lg font-bold transition-all duration-300 ${
              currentShift === 0
                ? "opacity-20 cursor-not-allowed border-slate-200 dark:border-slate-800 text-slate-400"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 hover:shadow-md active:scale-95 cursor-pointer"
            }`}
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <button
            onClick={handleForward}
            className="w-11 h-11 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-lg font-bold text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 hover:shadow-md active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <i className="fa-solid fa-chevron-right text-sm"></i>
          </button>
        </div>
      </div>

      {/* Main Track Window */}
      <div className="w-full overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) will-change-transform"
          style={{
            transform: `translateX(calc(-${currentShift} * (100% / ${getVisibleCount()})))`,
          }}
        >
          {state.courses.map(item => (
            <div
              key={item.id}
              className="shrink-0 w-full sm:w-1/2 lg:w-1/3 px-3"
            >
              <div
                className={`h-full border p-6 rounded-2xl flex flex-col justify-between min-h-[310px] transition-all duration-300 relative group cursor-pointer ${
                  appState.isDarkModeOn
                    ? "bg-slate-900 border-slate-800/80 shadow-lg shadow-black/30 hover:border-blue-500/40 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-black/50"
                    : "bg-white border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:border-blue-200"
                }`}
              >
                {/* Upper Badge Area */}
                <div className="flex items-center justify-between w-full mb-4">
                  <span
                    className={`text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md border uppercase ${
                      item.free
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    }`}
                  >
                    {item.free ? "Free Course" : "Premium Content"}
                  </span>

                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <i className="fa-regular fa-clock text-xs"></i>{" "}
                    {item.readTime || "10 hrs"}
                  </span>
                </div>

                {/* Typography Stack */}
                <div className="space-y-2 flex-1">
                  <h3
                    className={`text-lg font-bold tracking-tight line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors duration-200 ${
                      appState.isDarkModeOn ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed line-clamp-3 ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {/* Minimalist Profile Initials Badge */}
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                      IM
                    </div>
                    <div>
                      <p
                        className={`text-xs font-extrabold tracking-wide ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-700"}`}
                      >
                        {item.author}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {item.institution}
                      </p>
                    </div>
                  </div>

                  {/* Operational Metrics Counter row */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold pt-1">
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/40 px-2 py-1 rounded-md">
                      <i className="fa-solid fa-graduation-cap text-slate-400 dark:text-slate-500"></i>
                      <span>{item.students.toLocaleString()} learners</span>
                    </div>
                    <span className="text-slate-400/80 font-medium text-[10px]">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopicsYouMayLike
