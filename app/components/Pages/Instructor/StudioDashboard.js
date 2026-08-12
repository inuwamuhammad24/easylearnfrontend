import React, { useContext, useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Axios from "axios"
import NavigationMenus from "../../NavigationMenus"
import StateContext from "../../../StateContext"
import Toast from "../../shared/Toast"

function StudioDashboard() {
  const appState = useContext(StateContext)
  const { id } = useParams() // ← Grabs ID parameters straight from the active router link context

  const [activeTab, setActiveTab] = useState("courses")
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Primary operational state database containers
  const [instructorProfile, setInstructorProfile] = useState(null)
  const [courses, setCourses] = useState([])
  const [articles, setArticles] = useState([])

  // Asynchronous content fetch pipeline orchestration layer
  const fetchDashboardMetrics = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      // Direct integration endpoint hit passing your BSON string keys safely
      const response = await Axios.post(
        `${appState.backendURL}/user/dashboard-data`,
        { userId: id },
      )

      if (response.data && response.data.status === "success") {
        setInstructorProfile(response.data.profile)
        setCourses(response.data.courses || [])
        setArticles(response.data.articles || [])
      } else {
        setIsError(true)
        setErrorMessage(
          "Failed to parse instructor data schemas cleanly from the database tracking logs.",
        )
      }
    } catch (err) {
      setIsError(true)
      const errorMsg = err.response
        ? "The studio gateway denied authorization access parameters."
        : "Connection timeout. Verify local API link line rules."
      setErrorMessage(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  // Hook handles automated remote execution sequences strictly on asset mounting shifts
  useEffect(() => {
    if (id) {
      fetchDashboardMetrics()
    }
  }, [id])

  // --- RENDERING SUBSYSTEM: HARDWARE-ACCELERATED SHIMMER SKELETON LOADER GRID ---
  if (isLoading) {
    return (
      <div
        className={`min-h-screen font-sans antialiased pb-24 ${appState.isDarkModeOn ? "bg-slate-950" : "bg-slate-50"}`}
      >
        <NavigationMenus />

        {/* Banner Skeleton */}
        <div
          className={`w-full border-b animate-pulse py-12 ${appState.isDarkModeOn ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3 w-2/3">
              <div className="h-4 w-28 bg-slate-700/50 rounded-md" />
              <div className="h-8 w-64 bg-slate-700/50 rounded-xl" />
              <div className="h-3 w-96 bg-slate-700/50 rounded-md" />
            </div>
            <div className="h-10 w-36 bg-slate-700/50 rounded-xl shrink-0" />
          </div>
        </div>

        {/* Metrics Blocks Skeleton */}
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-12 animate-pulse">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div
                key={n}
                className={`p-6 rounded-2xl border ${appState.isDarkModeOn ? "bg-slate-900 border-slate-800/60" : "bg-white border-slate-200/60"}`}
              >
                <div className="h-3 w-20 bg-slate-700/40 rounded-md mb-3" />
                <div className="h-7 w-24 bg-slate-700/50 rounded-lg mb-2" />
                <div className="h-2.5 w-16 bg-slate-700/40 rounded-md" />
              </div>
            ))}
          </div>

          {/* List Row Skeletons */}
          <div className="space-y-4">
            <div className="h-4 w-48 bg-slate-700/40 rounded-md" />
            {[1, 2].map(n => (
              <div
                key={n}
                className={`p-6 rounded-2xl border flex justify-between items-center ${appState.isDarkModeOn ? "bg-slate-900 border-slate-800/60" : "bg-white border-slate-200/60"}`}
              >
                <div className="space-y-2 w-1/2">
                  <div className="h-3 w-16 bg-slate-700/40 rounded-md" />
                  <div className="h-4 w-full bg-slate-700/50 rounded-md" />
                </div>
                <div className="h-8 w-20 bg-slate-700/50 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
        appState.isDarkModeOn
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      <NavigationMenus />

      {/* REUSABLE STACK COMPONENT TOAST LISTENER */}
      <Toast
        isVisible={isError}
        type="error"
        message={errorMessage}
        onClose={() => setIsError(false)}
      />

      {/* ERROR HANDLER FALLBACK VIEWPORT ACTION CARD */}
      {isError && !instructorProfile && (
        <div className="max-w-md mx-auto mt-24 p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-center space-y-4">
          <p className="text-sm font-semibold text-rose-400">
            Failed to securely retrieve data parameters for studio ID: {id}
          </p>
          <button
            onClick={fetchDashboardMetrics}
            className="px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer"
          >
            🔄 Retry Handshake Loop
          </button>
        </div>
      )}

      {instructorProfile && (
        <>
          {/* 1. DASHBOARD OVERVIEW HUB HERO STREAM BANNER */}
          <section
            className={`w-full border-b ${appState.isDarkModeOn ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
          >
            <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black tracking-widest uppercase bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-md">
                  Instructor Central Studio
                </span>
                <h1
                  className={`text-2xl sm:text-3xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
                >
                  Welcome Back, {instructorProfile.firstName}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-slate-400">
                  Manage your engineering paths, view active tracking analytics,
                  and compose knowledge articles.
                </p>
              </div>

              {/* Quick Setup Action Controls Trigger Box Row */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link to="/article/create-article">
                  <button className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer">
                    ✍ Write Article
                  </button>
                </Link>
                <Link to="/course/create-course">
                  <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/10 transition-all cursor-pointer hover:-translate-y-0.5">
                    🚀 Create New Course
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* 2. SYSTEM METRICS MATRIX GRID */}
          <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  label: "Total Learners Enrolled",
                  value: (
                    instructorProfile.totalLearners || 0
                  ).toLocaleString(),
                  sub: "Active profiles",
                  icon: "👥",
                },
                {
                  label: "Gross Studio Income",
                  value: `₦${(instructorProfile.wallet?.balance || 0).toLocaleString()}`,
                  sub: "Cleared payout balances",
                  icon: "💳",
                },
                {
                  label: "Average Evaluation",
                  value: `${instructorProfile.rating || "5.0"} / 5.0`,
                  sub: "Across all courses",
                  icon: "★",
                },
                {
                  label: "Knowledge Articles",
                  value: articles.length,
                  sub: "Published on index feeds",
                  icon: "📄",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-2xl border transition-all ${
                    appState.isDarkModeOn
                      ? "bg-slate-900 border-slate-800/80 shadow-md shadow-black/10"
                      : "bg-white border-slate-200/50 shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide leading-tight">
                      {card.label}
                    </span>
                    <span className="text-sm">{card.icon}</span>
                  </div>
                  <div
                    className={`text-xl sm:text-2xl font-black ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
                  >
                    {card.value}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">
                    {card.sub}
                  </p>
                </div>
              ))}
            </section>

            {/* 3. ASSET SEGMENT CONTROLLERS TABBED MATRICES */}
            <section className="space-y-6">
              <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab("courses")}
                  className={`pb-3 border-b-2 transition-all cursor-pointer ${activeTab === "courses" ? "border-blue-600 text-blue-500 font-black" : "border-transparent text-slate-400 hover:text-slate-200"}`}
                >
                  My Curricula Assets ({courses.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("articles")}
                  className={`pb-3 border-b-2 transition-all cursor-pointer ${activeTab === "articles" ? "border-blue-600 text-blue-500 font-black" : "border-transparent text-slate-400 hover:text-slate-200"}`}
                >
                  Published Tech Papers ({articles.length})
                </button>
              </div>

              {/* TAB AREA 1: Course list mapping */}
              {activeTab === "courses" && (
                <div className="space-y-4">
                  {courses.length === 0 ? (
                    <p className="text-slate-400 text-xs italic">
                      You have not initialized any course matrices inside this
                      workspace channel yet.
                    </p>
                  ) : (
                    courses.map(course => (
                      <div
                        key={course._id}
                        className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-blue-500/20 ${
                          appState.isDarkModeOn
                            ? "bg-slate-900 border-slate-800/80"
                            : "bg-white border-slate-200/60 shadow-2xs"
                        }`}
                      >
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2 text-[10px] font-bold">
                            <span className="px-2 py-0.5 rounded border uppercase bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                              Live
                            </span>
                            <span className="text-slate-400 font-medium">
                              {course.category}
                            </span>
                          </div>
                          <h3
                            className={`text-sm sm:text-base font-bold ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
                          >
                            {course.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-6 sm:gap-10 text-xs font-bold text-slate-400 whitespace-nowrap self-end sm:self-center">
                          <div>
                            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                              Learners
                            </p>
                            <p
                              className={`text-sm font-black mt-0.5 ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-800"}`}
                            >
                              {course.learnersCount || 0}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                              Price
                            </p>
                            <p
                              className={`text-sm font-black mt-0.5 ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-800"}`}
                            >
                              ₦{(course.price || 0).toLocaleString()}
                            </p>
                          </div>
                          <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] hover:text-blue-500 hover:border-blue-500/30 transition cursor-pointer font-bold bg-slate-50 dark:bg-slate-950">
                            Manage
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB AREA 2: Articles list mapping */}
              {activeTab === "articles" && (
                <div className="space-y-4">
                  {articles.length === 0 ? (
                    <p className="text-slate-400 text-xs italic">
                      You have not composed any technical documents inside this
                      workspace channel yet.
                    </p>
                  ) : (
                    articles.map(article => (
                      <div
                        key={article._id}
                        className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-blue-500/20 ${
                          appState.isDarkModeOn
                            ? "bg-slate-900 border-slate-800/80"
                            : "bg-white border-slate-200/60 shadow-2xs"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-bold">
                            <span className="bg-blue-500/5 text-blue-400 px-2 py-0.5 rounded border border-blue-500/10 uppercase tracking-wide">
                              {article.category}
                            </span>
                            <span className="text-slate-400 font-medium">
                              Released {article.date || "Just now"}
                            </span>
                          </div>
                          <h3
                            className={`text-sm sm:text-base font-bold ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
                          >
                            {article.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-6 text-xs font-bold text-slate-400 whitespace-nowrap self-end sm:self-center">
                          <div>
                            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                              Upvotes
                            </p>
                            <p
                              className={`text-sm font-black mt-0.5 ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-800"}`}
                            >
                              ❤️ {article.likes || 0}
                            </p>
                          </div>
                          <Link
                            to={`/article/${article._id}`}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 hover:text-blue-500 transition font-bold bg-slate-50 dark:bg-slate-950"
                          >
                            View Live
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  )
}

export default StudioDashboard
