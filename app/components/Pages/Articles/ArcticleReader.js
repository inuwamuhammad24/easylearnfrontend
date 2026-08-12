import React, { useContext, useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import NavigationMenus from "../../NavigationMenus"
import StateContext from "../../../StateContext"
import Footer from "../Footer"

// Mock database registry for article objects
const MOCK_ARTICLE_DETAILS = {
  "art-1": {
    id: "art-1",
    title: "Optimizing MongoDB Atlas Vector Search Queries for RAG Pipelines",
    category: "Artificial Intelligence",
    date: "May 18, 2026",
    readTime: "6 min read",
    author: "Inuwa Muhammad",
    institution: "University of Jos",
    authorBio:
      "Software Architect specializing in cloud infrastructure and retrieval-augmented generation systems.",
    likes: 142,
    img: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
}

function ArticleReader() {
  const appState = useContext(StateContext)
  const { articleId } = useParams()

  const [article, setArticle] = useState(null)
  const [hasLiked, setHasLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  useEffect(() => {
    const data =
      MOCK_ARTICLE_DETAILS[articleId] || MOCK_ARTICLE_DETAILS["art-1"]
    setArticle(data)
    setLikesCount(data.likes)
  }, [articleId])

  const handleLikeToggle = () => {
    if (hasLiked) {
      setLikesCount(prev => prev - 1)
      setHasLiked(false)
    } else {
      setLikesCount(prev => prev + 1)
      setHasLiked(true)
    }
  }

  if (!article) return null

  return (
    <>
      <div
        className={`min-h-screen font-sans antialiased pb-24 transition-colors duration-300 ${
          appState.isDarkModeOn
            ? "bg-slate-950 text-slate-100"
            : "bg-slate-50 text-slate-800"
        }`}
      >
        <NavigationMenus />

        {/* 1. ARTICLE METADATA BANNER HEADER HEADER CONTAINER */}
        <header className="max-w-3xl mx-auto px-6 pt-16 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500">
            <span className="bg-blue-500/10 px-2.5 py-1 rounded-md">
              {article.category}
            </span>
            <span>•</span>
            <span className="text-slate-400">{article.readTime}</span>
          </div>

          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight max-w-2xl mx-auto ${
              appState.isDarkModeOn ? "text-white" : "text-slate-900"
            }`}
          >
            {article.title}
          </h1>

          {/* Author Bio Line Grid */}
          <div className="flex items-center justify-center gap-3 pt-4 text-xs font-bold text-slate-400">
            <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center font-black text-xs border border-blue-500/20 shadow-2xs">
              IM
            </div>
            <div className="text-left">
              <p
                className={`font-extrabold ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-800"}`}
              >
                {article.author}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">
                {article.institution} • Published {article.date}
              </p>
            </div>
          </div>
        </header>

        {/* 2. SPLIT INTERACTION BODY RUNTIME GRID */}
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-12 gap-12 mt-12 relative items-start">
          {/* SIDE BAR UTILITIES: Left Side Floating Action Ribbon (2 Columns) */}
          <aside className="hidden lg:flex lg:col-span-2 flex-col items-center gap-4 sticky top-48 p-3 rounded-2xl border bg-transparent dark:border-slate-900">
            <button
              onClick={handleLikeToggle}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                hasLiked
                  ? "bg-rose-500/10 border-rose-500 text-rose-500 font-bold scale-105"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-500 cursor-pointer shadow-2xs"
              }`}
              aria-label="Like paper"
            >
              ❤️
            </button>
            <span className="text-[11px] font-bold text-slate-400 font-mono -mt-2">
              {likesCount}
            </span>

            <button
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-blue-500 flex items-center justify-center cursor-pointer shadow-2xs"
              aria-label="Bookmark article"
            >
              <i className="fa-regular fa-bookmark"></i>
            </button>
          </aside>

          {/* PRIMARY CHASSIS CONTENT FRAME: Centered Reader Area (8 Columns) */}
          <main className="lg:col-span-8 max-w-3xl space-y-8">
            {/* Main Hero Asset Landscape Image Canvas */}
            <div className="w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-900">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-full object-cover opacity-95"
              />
            </div>

            {/* Core Markdown Body Content Text nodes */}
            <article
              className={`text-base sm:text-lg leading-relaxed space-y-6 font-normal tracking-normal ${
                appState.isDarkModeOn ? "text-slate-300" : "text-slate-600"
              }`}
            >
              <p>
                When engineering large-scale artificial intelligence models into
                campus ecosystems or client databases, passing raw textbooks or
                dense multi-megabyte directories straight into an LLM network
                request can break prompt contexts instantly. This is where a
                highly tuned **Retrieval-Augmented Generation (RAG)** pipeline
                becomes necessary.
              </p>

              <h2
                className={`text-xl sm:text-2xl font-black tracking-tight pt-4 ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                The Mechanics of Vector Embeddings
              </h2>
              <p>
                To query content accurately, your textual asset strings are
                broken down recursively into small logical chunks. Each chunk
                runs through an embedding algorithm that translates the plain
                language concepts into multidimensional floating-point arrays.
                When a user asks a question, your search searches the coordinate
                arrays instead of basic text phrases.
              </p>

              {/* Custom Technical Layout Callout Container block */}
              <div
                className={`p-6 rounded-2xl border border-l-4 border-l-blue-500 my-6 font-medium text-sm sm:text-base ${
                  appState.isDarkModeOn
                    ? "bg-blue-950/20 border-slate-800/80 text-slate-200"
                    : "bg-blue-50/60 border-slate-100 text-slate-700"
                }`}
              >
                <span className="font-bold text-blue-500 block mb-1">
                  💡 Architectural Principle:
                </span>
                Always manage connection pools to your vector data indices.
                Opening unique handshakes on every prompt chunk loop will
                degrade server execution times by up to 40% across concurrent
                active user operations.
              </div>

              <p>
                By coupling MongoDB Atlas Vector Search directly with an Express
                API system layer, developers can extract the exact paragraphs a
                student needs based on their query vector metrics, wrap the
                results inside a behavioral prompt context, and serve crisp,
                hallucination-free guidance via real-time streams.
              </p>
            </article>

            {/* 3. AUTHOR PROFILE LOWER ACCORDION BADGE */}
            <div
              className={`mt-16 p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                appState.isDarkModeOn
                  ? "bg-slate-900 border-slate-800"
                  : "bg-white border-slate-200/60 shadow-2xs"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400 flex items-center justify-center font-black text-sm shrink-0 border border-blue-500/20">
                IM
              </div>
              <div className="space-y-1">
                <h4
                  className={`font-bold text-sm ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
                >
                  Written by {article.author}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {article.authorBio ||
                    "Platform content creator tracking curriculum compliance nodes directly inside our engineering workspaces."}
                </p>
              </div>
            </div>
          </main>

          {/* RIGHT COLUMN BLANK SPACE CONTAINER (2 Columns for balance alignment on wide viewports) */}
          <div className="hidden lg:block lg:col-span-2"></div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ArticleReader
