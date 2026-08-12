import React, { useContext, useRef, useState } from "react"
import NavigationMenus from "../../NavigationMenus"
import { Link } from "react-router-dom"
import StateContext from "../../../StateContext"
import Footer from "../Footer"

function CoursesHome() {
  const appState = useContext(StateContext)
  const scrollTrackRef = useRef(null)

  const [activeCategory, setActiveCategory] = useState("All Courses")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedPrice, setSelectedPrice] = useState("All")

  const categories = [
    "All Courses",
    "Computer Science",
    "JavaScript",
    "Python",
    "Programming",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Electronics",
    "Video Editing",
  ]

  const handleScroll = direction => {
    if (scrollTrackRef.current) {
      const offset = direction === "forward" ? 240 : -240
      scrollTrackRef.current.scrollBy({ left: offset, behavior: "smooth" })
    }
  }

  const catalogCourses = [
    {
      id: "js-1",
      title: "Learn JavaScript: Become a Full Stack Developer",
      author: "Inuwa Muhammad",
      price: 1400,
      free: false,
      img: "https://res.cloudinary.com/dlbtbf6vy/image/upload/v1667768764/pexels-josh-sorenson-1714208_tz2hhu.jpg",
      rating: "4.9",
      reviews: 412,
      learners: 3420,
      lectures: 42,
      level: "Beginner",
      category: "JavaScript",
    },
    {
      id: "ai-1",
      title: "Building RAG AI Assistants with Node.js & Atlas",
      author: "Inuwa Muhammad",
      price: 2500,
      free: false,
      img: "https://res.cloudinary.com/dlbtbf6vy/image/upload/v1609528311/samples/imagecon-group.jpg",
      rating: "4.9",
      reviews: 188,
      learners: 1650,
      lectures: 28,
      level: "Advanced",
      category: "Computer Science",
    },
    {
      id: "chem-1",
      title: "Chemistry for Secondary School and University",
      author: "S.M Habibullah",
      price: 2500,
      free: false,
      img: "https://res.cloudinary.com/dlbtbf6vy/image/upload/v1621103592/chemistry_nbcqbk.jpg",
      rating: "4.7",
      reviews: 94,
      learners: 1840,
      lectures: 35,
      level: "Intermediate",
      category: "Chemistry",
    },
    {
      id: "math-1",
      title: "Understanding Foundation Engineering Mathematics",
      author: "Ahmad Ismail",
      price: 0,
      free: true,
      img: "https://res.cloudinary.com/dlbtbf6vy/image/upload/v1609528305/samples/people/smiling-man.jpg",
      rating: "4.5",
      reviews: 213,
      learners: 980,
      lectures: 18,
      level: "Beginner",
      category: "Mathematics",
    },
    {
      id: "bio-1",
      title: "Practical Biology: Anatomy of a Plant Matrix",
      author: "Sadeeq S.Q",
      price: 1000,
      free: false,
      img: "https://res.cloudinary.com/dlbtbf6vy/image/upload/v1621103593/img1_etecqq.jpg",
      rating: "4.6",
      reviews: 62,
      learners: 1205,
      lectures: 22,
      level: "Intermediate",
      category: "Biology",
    },
    {
      id: "cs-1",
      title: "Introduction to Computer Science Fundamentals",
      author: "S.Q Jan Wuya",
      price: 0,
      free: true,
      img: "https://res.cloudinary.com/dlbtbf6vy/image/upload/v1709672315/campus_zh20p7.jpg",
      rating: "4.8",
      reviews: 840,
      learners: 5130,
      lectures: 15,
      level: "Beginner",
      category: "Computer Science",
    },
  ]

  const filteredCourses = catalogCourses.filter(course => {
    const matchesCategory =
      activeCategory === "All Courses" || course.category === activeCategory
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel =
      selectedLevel === "All Levels" || course.level === selectedLevel
    const matchesPrice =
      selectedPrice === "All" ||
      (selectedPrice === "Free" && course.free) ||
      (selectedPrice === "Paid" && !course.free)
    return matchesCategory && matchesSearch && matchesLevel && matchesPrice
  })

  return (
    <>
      <div
        className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
          appState.isDarkModeOn
            ? "bg-slate-950 text-slate-100"
            : "bg-slate-50 text-slate-800"
        }`}
      >
        <NavigationMenus />

        {/* 1. Catalog Dashboard Introduction Banner */}
        <section
          className={`w-full border-b ${appState.isDarkModeOn ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
        >
          <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <h1
                className={`text-3xl sm:text-4xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                Unlock Practical Skill Paths
              </h1>
              <p
                className={`text-base max-w-xl leading-relaxed ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
              >
                Explore expert-guided frameworks built with structured
                timelines, integrated code workspaces, and reactive socratic AI
                checking algorithms.
              </p>
            </div>

            <div className="md:col-span-5 w-full">
              <div
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-2xs transition-all ${
                  appState.isDarkModeOn
                    ? "bg-slate-950 border-slate-800 focus-within:border-blue-500/50"
                    : "bg-slate-50 border-slate-200 focus-within:border-blue-400"
                }`}
              >
                <i className="fas fa-search text-slate-400 text-sm"></i>
                <input
                  type="text"
                  placeholder="Search courses, tracks, authors..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm focus:outline-none tracking-wide"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Category Filter Ribbon: Completely hidden scrollbars via clean container rules */}
        <div
          className={`w-full border-b sticky top-20 z-40 backdrop-blur-md ${
            appState.isDarkModeOn
              ? "bg-slate-900/80 border-slate-800"
              : "bg-white/80 border-slate-200/60 shadow-xs"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center relative group">
            {/* Scroll Backward */}
            <button
              onClick={() => handleScroll("backward")}
              className="absolute left-4 z-10 w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-md bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-xs"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* Horizontal Row Track: Webkit rules are embedded locally to hide structural scrolls */}
            <div
              ref={scrollTrackRef}
              className="w-full flex items-center gap-3 overflow-x-auto h-full py-2 px-4 select-none scroll-smooth"
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Inline dynamic style generation block injection targeting custom browser configurations */}
              <style>{`
              div::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
            `}</style>

              {categories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer shrink-0 ${
                    activeCategory === cat
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10"
                      : appState.isDarkModeOn
                        ? "bg-slate-800/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                        : "bg-slate-100 border-slate-200/60 text-slate-600 hover:bg-slate-200/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scroll Forward */}
            <button
              onClick={() => handleScroll("forward")}
              className="absolute right-4 z-10 w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-md bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-xs"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* 3. Main Dashboard Display Grid Layout Container */}
        <main className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Sidebar Filter Config Drawer (3 Columns) */}
            <aside
              className={`hidden lg:block lg:col-span-3 space-y-8 sticky top-44 p-6 rounded-2xl border ${
                appState.isDarkModeOn
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200/60 shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  Filter System
                </h3>
                {(selectedLevel !== "All Levels" ||
                  selectedPrice !== "All") && (
                  <button
                    onClick={() => {
                      setSelectedLevel("All Levels")
                      setSelectedPrice("All")
                    }}
                    className="text-xs font-bold text-blue-500 hover:underline cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Level Settings Block */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Difficulty Level
                </label>
                <div className="flex flex-col gap-2 text-xs font-semibold">
                  {["All Levels", "Beginner", "Intermediate", "Advanced"].map(
                    lvl => (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`text-left px-3 py-2 rounded-xl transition-colors ${selectedLevel === lvl ? "text-blue-500 bg-blue-500/5 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30"}`}
                      >
                        {lvl}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Price Plan Block */}
              <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                  Pricing Tier
                </label>
                <div className="flex flex-col gap-2 text-xs font-semibold">
                  {["All", "Free", "Paid"].map(prc => (
                    <button
                      key={prc}
                      onClick={() => setSelectedPrice(prc)}
                      className={`text-left px-3 py-2 rounded-xl transition-colors ${selectedPrice === prc ? "text-blue-500 bg-blue-500/5 font-bold" : "text-slate-400 hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/30"}`}
                    >
                      {prc === "All" ? "All Courses" : prc}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Core Card Feed Grid Content (9 Columns) */}
            <div className="lg:col-span-9 space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
                <span>
                  Found {filteredCourses.length} professional learning targets
                </span>
                <span>Sorted by Relevance</span>
              </div>

              {filteredCourses.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
                  {filteredCourses.map(course => (
                    <Link
                      key={course.id}
                      to={`/course/${course.id}`}
                      className="group flex flex-col h-full"
                    >
                      <div
                        className={`h-full border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                          appState.isDarkModeOn
                            ? "bg-slate-900 border-slate-800/80 shadow-md shadow-black/20 hover:border-blue-500/40 hover:shadow-lg"
                            : "bg-white border-slate-200/60 shadow-xs hover:shadow-xl hover:border-blue-200"
                        }`}
                      >
                        {/* Course Card Thumbnail Image */}
                        <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                          <img
                            src={course.img}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          />
                          <span
                            className={`absolute top-3 right-3 text-[9px] font-black tracking-wider px-2 py-0.5 rounded border uppercase ${
                              course.free
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            }`}
                          >
                            {course.free ? "Free" : "Premium"}
                          </span>
                        </div>

                        {/* Course Card Summary Block */}
                        <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-amber-500">
                              <span>★ {course.rating}</span>
                              <span className="text-slate-400 font-medium">
                                ({course.reviews})
                              </span>
                              <span className="text-slate-300 dark:text-slate-700">
                                |
                              </span>
                              <span className="text-slate-400 dark:text-slate-500 font-semibold">
                                {course.level}
                              </span>
                            </div>

                            <h3
                              className={`text-sm font-bold tracking-tight line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors duration-200 ${
                                appState.isDarkModeOn
                                  ? "text-white"
                                  : "text-slate-900"
                              }`}
                            >
                              {course.title}
                            </h3>
                            <p className="text-[11px] text-slate-400 font-semibold">
                              {course.author}
                            </p>
                          </div>

                          {/* Quantitative Row Metrics Footer info line */}
                          <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold">
                            <div className="flex items-center gap-3 text-slate-400 font-medium text-[11px]">
                              <span className="flex items-center gap-1">
                                <i className="fa-solid fa-graduation-cap text-slate-300 dark:text-slate-600"></i>{" "}
                                {course.learners.toLocaleString()}
                              </span>
                              <span>⏱ {course.lectures} chapters</span>
                            </div>
                            <div
                              className={`text-sm font-black ${course.free ? "text-emerald-500" : appState.isDarkModeOn ? "text-slate-200" : "text-slate-900"}`}
                            >
                              {course.free
                                ? "Free"
                                : `₦${course.price.toLocaleString()}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                /* Fallback Missing Response panel */
                <div
                  className={`text-center py-24 rounded-2xl border border-dashed ${appState.isDarkModeOn ? "border-slate-800" : "border-slate-200"}`}
                >
                  <div className="text-3xl mb-2">🔍</div>
                  <h3
                    className={`font-bold text-base ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-800"}`}
                  >
                    No matching courses found
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Try relaxing your sidebar option matrices or tweaking your
                    search context string.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default CoursesHome
