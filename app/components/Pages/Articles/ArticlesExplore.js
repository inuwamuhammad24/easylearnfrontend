import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import NavigationMenus from "../../NavigationMenus"
import StateContext from "../../../StateContext"
import Footer from "../Footer"

function ArticlesExplore() {
  const appState = useContext(StateContext)

  // Active catalog state tracking hooks
  const [activeTopic, setActiveTopic] = useState("All Topics")
  const [searchQuery, setSearchQuery] = useState("")

  const topics = [
    "All Topics",
    "Web Development",
    "Artificial Intelligence",
    "Data Science",
    "UI/UX Design",
    "Database Engineering",
    "Career Guidance",
  ]

  // Rich metadata dataset matching your relational database schema strategy
  const mockArticles = [
    {
      id: "art-1",
      title: "Optimizing MongoDB Atlas Vector Search Queries for RAG Pipelines",
      summary:
        "A comprehensive breakdown of mathematical similarity metrics, chunk strategies, and database connection pools for lightning-fast AI completions in production software setups.",
      author: "Inuwa Muhammad",
      institution: "University of Jos",
      category: "Artificial Intelligence",
      readTime: "6 min read",
      date: "May 18, 2026",
      likes: 142,
      isFeatured: true,
    },
    {
      id: "art-2",
      title: "Deep Dive into React Server Components (RSC) and State Hydration",
      summary:
        "Understanding how components execute on server runtimes, stream chunks across network tracks, and minimize client bundles safely.",
      author: "Inuwa Muhammad",
      institution: "University of Jos",
      category: "Web Development",
      readTime: "5 min read",
      date: "May 12, 2026",
      likes: 98,
      isFeatured: false,
    },
    {
      id: "art-3",
      title:
        "Statistical Matrix Grouping Operations with Python Pandas Profiles",
      summary:
        "Stop running unoptimized for-loops on large dataframes. Master native multi-index grouping vectors to clean up massive data pipelines efficiently.",
      author: "Ahmad Ismail",
      institution: "University of Jos",
      category: "Data Science",
      readTime: "8 min read",
      date: "Apr 29, 2026",
      likes: 64,
      isFeatured: false,
    },
    {
      id: "art-4",
      title:
        "Securing Express Endpoints: Formulating Clean JWT Validation Layers",
      summary:
        "Protect user authorization headers against injection exploits by securely configuring token structures and writing flexible, role-based middleware filters.",
      author: "Sadeeq S.Q",
      institution: "Abubakar Tafawa Balewa University",
      category: "Database Engineering",
      readTime: "4 min read",
      date: "Apr 15, 2026",
      likes: 112,
      isFeatured: false,
    },
    {
      id: "art-5",
      title:
        "Designing Interactive Glassmorphism Panels with Tailwind Utility Classes",
      summary:
        "A practical guide to implementing layout contrast depths using backdrop blurs, opacity layering ratios, and custom border color shifts.",
      author: "Inuwa Muhammad",
      institution: "University of Jos",
      category: "UI/UX Design",
      readTime: "5 min read",
      date: "Mar 22, 2026",
      likes: 87,
      isFeatured: false,
    },
  ]

  // Filter verification conditional processing block
  const featuredArticle = mockArticles.find(art => art.isFeatured)
  const regularArticles = mockArticles.filter(art => {
    const matchesTopic =
      activeTopic === "All Topics" || art.category === activeTopic
    const matchesQuery =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTopic && matchesQuery && !art.isFeatured
  })

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
        appState.isDarkModeOn
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      <NavigationMenus />

      {/* 1. ARTICLES WELCOME SPLIT BANNER TRACK */}
      <section
        className={`w-full border-b ${appState.isDarkModeOn ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
      >
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-[10px] font-black tracking-wider uppercase bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-md">
              easylearn knowledge sphere
            </span>
            <h1
              className={`text-3xl sm:text-4xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
            >
              Engineering Papers & Technical Notes
            </h1>
            <p
              className={`text-sm sm:text-base max-w-xl leading-relaxed ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
            >
              Deep dive into specialized tutorials, industry best practices, and
              conceptual breakdowns authored directly by verified platform
              experts.
            </p>
          </div>

          {/* Inline Article Search Bar Layout */}
          <div className="w-full max-w-md shrink-0">
            <div
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all ${
                appState.isDarkModeOn
                  ? "bg-slate-950 border-slate-800 focus-within:border-blue-500/50"
                  : "bg-slate-50 border-slate-200 focus-within:border-blue-400"
              }`}
            >
              <i className="fas fa-search text-slate-400 text-sm"></i>
              <input
                type="text"
                placeholder="Search technical topics or keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none tracking-wide"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOPICS CHIPS SLIDER RIBBON - Hidden browser scroll bars utility */}
      <div
        className={`w-full border-b sticky top-20 z-40 backdrop-blur-md ${
          appState.isDarkModeOn
            ? "bg-slate-900/80 border-slate-800"
            : "bg-white/80 border-slate-200/60 shadow-xs"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center">
          <div
            className="w-full flex items-center gap-3 overflow-x-auto select-none scrollbar-none py-1 h-full"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <style>{`div::-webkit-scrollbar { display: none !important; }`}</style>
            {topics.map((topic, i) => (
              <button
                key={i}
                onClick={() => setActiveTopic(topic)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 cursor-pointer shrink-0 ${
                  activeTopic === topic
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10"
                    : appState.isDarkModeOn
                      ? "bg-slate-800/50 border-slate-800 text-slate-400 hover:text-slate-200"
                      : "bg-slate-100 border-slate-200/60 text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CORE MATERIAL DISPLAY BOUNDS (Featured Top, Regular Rows Below) */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* FEATURED DISPLAY NODE (Only renders if no search active to block clutter) */}
        {featuredArticle && !searchQuery && activeTopic === "All Topics" && (
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Featured Paper
            </h2>
            <Link to={`/article/${featuredArticle.id}`} className="group block">
              <div
                className={`border p-6 sm:p-8 rounded-3xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between gap-6 min-h-[260px] ${
                  appState.isDarkModeOn
                    ? "bg-slate-900 border-slate-800/80 shadow-lg shadow-black/20 hover:border-blue-500/30"
                    : "bg-white border-slate-200/60 shadow-xs hover:shadow-xl hover:border-blue-200"
                }`}
              >
                <div className="space-y-3 max-w-4xl">
                  <div className="flex items-center gap-3 text-xs font-bold text-blue-500">
                    <span className="uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded text-[10px]">
                      Editor's Choice
                    </span>
                    <span>•</span>
                    <span className="text-slate-400">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <h3
                    className={`text-xl sm:text-2xl font-black tracking-tight leading-tight group-hover:text-blue-500 transition-colors duration-200 ${
                      appState.isDarkModeOn ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {featuredArticle.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base leading-relaxed line-clamp-3 font-medium ${
                      appState.isDarkModeOn
                        ? "text-slate-400"
                        : "text-slate-500"
                    }`}
                  >
                    {featuredArticle.summary}
                  </p>
                </div>

                {/* Featured Author Details Row */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-400">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-black text-[10px] border border-blue-500/20">
                      IM
                    </div>
                    <div>
                      <p
                        className={
                          appState.isDarkModeOn
                            ? "text-slate-200"
                            : "text-slate-800"
                        }
                      >
                        {featuredArticle.author}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">
                        {featuredArticle.institution}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-[11px]">
                    <span>⏱ {featuredArticle.readTime}</span>
                    <span>❤️ {featuredArticle.likes} verification checks</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* FEED GRID: REGULAR ARTICLES */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2
              className={`text-xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
            >
              {activeTopic === "All Topics"
                ? "Latest Publications"
                : `${activeTopic} Papers`}
            </h2>
            <span className="text-xs font-bold text-slate-400">
              Found {regularArticles.length} files
            </span>
          </div>

          {regularArticles.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularArticles.map(article => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="group block h-full"
                >
                  <div
                    className={`p-6 border rounded-2xl h-full flex flex-col justify-between gap-6 transition-all duration-300 ${
                      appState.isDarkModeOn
                        ? "bg-slate-900 border-slate-800/80 shadow-md shadow-black/20 hover:border-blue-500/40 hover:shadow-lg"
                        : "bg-white border-slate-200/60 shadow-xs hover:shadow-xl hover:border-blue-200"
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-blue-500">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-semibold">
                          {article.category}
                        </span>
                        <span>•</span>
                        <span className="text-slate-400 font-medium">
                          {article.date}
                        </span>
                      </div>

                      <h3
                        className={`text-base font-bold tracking-tight line-clamp-2 leading-snug group-hover:text-blue-500 transition-colors duration-200 ${
                          appState.isDarkModeOn
                            ? "text-white"
                            : "text-slate-900"
                        }`}
                      >
                        {article.title}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed line-clamp-3 ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
                      >
                        {article.summary}
                      </p>
                    </div>

                    {/* Standard Card Footer Profile Anchor */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-400">
                      <span className="text-slate-500 dark:text-slate-400">
                        By {article.author}
                      </span>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span>⏱ {article.readTime}</span>
                        <span className="hover:text-red-500 transition-colors">
                          ❤️ {article.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Catch-all empty validation container */
            <div
              className={`text-center py-20 rounded-2xl border border-dashed ${appState.isDarkModeOn ? "border-slate-800" : "border-slate-200"}`}
            >
              <div className="text-3xl mb-2">📄</div>
              <h3
                className={`font-bold text-base ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-800"}`}
              >
                No articles in this segment
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Be the first to publish a technical write-up inside this focus
                category branch!
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ArticlesExplore
