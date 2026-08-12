import React, { useContext, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import NavigationMenus from "../../NavigationMenus"
import StateContext from "../../../StateContext"
import Toast from "../../shared/Toast"

function WriteArticle() {
  const appState = useContext(StateContext)
  const navigate = useNavigate()

  // Phase Wizard Navigation State Node
  const [activeStep, setActiveStep] = useState(1)

  // Document Core Schema States
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Web Development")
  const [level, setLevel] = useState("Intermediate Focus")
  const [summary, setSummary] = useState("")
  const [body, setBody] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState(["Tutorial", "Engineering"])

  // Async Connection Sync Status Handles
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [toast, setToast] = useState({
    isVisible: false,
    type: "success",
    message: "",
  })

  // Tab toggle handles markdown splits for compact responsive smart layouts in Phase 3
  const [mobileActivePane, setMobileActivePane] = useState("edit")

  const categories = [
    "Web Development",
    "Artificial Intelligence",
    "Data Science",
    "UI/UX Design",
    "Database Engineering",
    "Career Guidance",
  ]

  // Dynamic Telemetry Calculation Matrix
  const documentMetrics = useMemo(() => {
    const words = body.trim() === "" ? 0 : body.trim().split(/\s+/).length
    const chars = body.length
    const readTime = Math.max(1, Math.ceil(words / 200))
    return { words, chars, readTime }
  }, [body])

  const injectMarkdownSyntax = syntaxPattern => {
    setBody(prev => prev + syntaxPattern)
  }

  const handleAddTag = e => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim()) && tags.length < 5) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = tagToRemove => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  // --- ASYNC NETWORK DISPATCH: EXECUTING DATABASE TRANSITS ---
  const saveDocumentToCloud = async publishStatus => {
    const isDraft = publishStatus === "Draft"

    // Core Schema Validation Checklist guards before hitting network pipeline
    if (!title.trim()) {
      setToast({
        isVisible: true,
        type: "error",
        message: "An article title identifier is strictly required.",
      })
      return
    }
    if (!isDraft && (!summary.trim() || !body.trim())) {
      setToast({
        isVisible: true,
        type: "error",
        message:
          "Please complete the abstract and body parameters before publishing live.",
      })
      return
    }

    if (isDraft) setIsSavingDraft(true)
    else setIsSubmitting(true)

    try {
      // Gather dynamic user payload info out of global Context store references
      const response = await Axios.post(
        `${appState.backendURL}/article/create`,
        {
          title: title.trim(),
          category,
          level,
          summary: summary.trim(),
          body: body.trim(),
          tags,
          status: publishStatus,
          authorId: appState.user?.id || "12345", // Falls back cleanly or binds session key tokens
        },
      )

      if (response.data && response.data.status === "success") {
        setToast({
          isVisible: true,
          type: "success",
          message: isDraft
            ? "Working draft updated and saved securely."
            : "Technical paper compiled and released live!",
        })

        // Wait briefly for toast timeline animation before navigating away
        setTimeout(() => {
          navigate(`/instructor/${appState.user?.id || "12345"}/dashboard`)
        }, 2000)
      } else {
        setToast({
          isVisible: true,
          type: "error",
          message: "Failed to map core server confirmation loops.",
        })
      }
    } catch (err) {
      const fallbackError =
        err.response?.data?.message ||
        "The cluster database gateway rejected data composition payloads."
      setToast({ isVisible: true, type: "error", message: fallbackError })
    } finally {
      setIsSavingDraft(false)
      setIsSubmitting(false)
    }
  }

  // Pure inline structural token helper to manage text area visualization layers
  const parseMarkdownToReact = rawText => {
    if (!rawText.trim()) {
      return (
        <p className="text-slate-400 dark:text-slate-600 italic text-xs">
          Your live compiled reader text template will mirror dynamically
          here...
        </p>
      )
    }

    return rawText.split("\n").map((line, index) => {
      if (line.startsWith("# "))
        return (
          <h1
            key={index}
            className="text-xl sm:text-2xl font-black text-blue-500 mt-4 mb-2 tracking-tight"
          >
            {line.replace("# ", "")}
          </h1>
        )
      if (line.startsWith("## "))
        return (
          <h2
            key={index}
            className="text-base sm:text-lg font-extrabold text-slate-800 dark:text-white mt-4 mb-2 pb-0.5 border-b border-slate-100 dark:border-slate-800/60 tracking-tight"
          >
            {line.replace("## ", "")}
          </h2>
        )
      if (line.startsWith("> "))
        return (
          <div
            key={index}
            className="p-4 rounded-xl border border-l-4 border-l-blue-500 bg-slate-100/50 dark:bg-blue-950/20 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed my-3"
          >
            {line.replace("> ", "")}
          </div>
        )
      if (line.startsWith("- "))
        return (
          <li
            key={index}
            className="ml-4 text-xs sm:text-sm list-disc text-slate-600 dark:text-slate-400 py-0.5 font-medium"
          >
            {line.replace("- ", "")}
          </li>
        )
      return line.trim() === "" ? (
        <br key={index} />
      ) : (
        <p
          key={index}
          className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-3 font-medium tracking-wide"
        >
          {line}
        </p>
      )
    })
  }

  return (
    <div
      className={`min-h-screen font-sans antialiased flex flex-col transition-colors duration-300 ${
        appState.isDarkModeOn
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      <NavigationMenus />

      {/* REUSABLE FLUID STATUS TOAST NOTIFIER */}
      <Toast
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      {/* 1. MASTER TIMELINE WIZARD STEP BANNER */}
      <header
        className={`w-full border-b sticky top-20 z-40 backdrop-blur-md ${
          appState.isDarkModeOn
            ? "bg-slate-900/90 border-slate-800"
            : "bg-white/90 border-slate-200/60 shadow-xs"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-xs font-bold text-slate-400 hover:text-blue-500 cursor-pointer transition-colors"
            >
              ← Cancel Studio
            </button>
            <span className="text-slate-200 dark:text-slate-800 font-light">
              |
            </span>
            <div className="space-y-0.5">
              <h1
                className={`text-sm font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                Article Architect Studio
              </h1>
            </div>
          </div>

          {/* Chronological Step Track Row */}
          <div className="flex items-center gap-2 text-xs font-bold font-mono">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center gap-1.5">
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] border transition-all ${
                    activeStep === step
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : activeStep > step
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 font-extrabold"
                        : appState.isDarkModeOn
                          ? "bg-slate-950 border-slate-800 text-slate-600"
                          : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}
                >
                  {step}
                </span>
                {step < 3 && (
                  <span className="text-slate-200 dark:text-slate-800 font-light text-[9px]">
                    ──
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* COMPACT PANE SELECTOR TAB REGISTRY */}
      {activeStep === 3 && (
        <div className="w-full flex lg:hidden border-b border-slate-200 dark:border-slate-800 text-xs font-bold bg-white dark:bg-slate-900 sticky top-[137px] z-30">
          <button
            type="button"
            onClick={() => setMobileActivePane("edit")}
            className={`flex-1 py-3 border-b-2 text-center transition-all ${mobileActivePane === "edit" ? "border-blue-600 text-blue-500" : "border-transparent text-slate-400"}`}
          >
            📝 Editor Workspace
          </button>
          <button
            type="button"
            onClick={() => setMobileActivePane("preview")}
            className={`flex-1 py-3 border-b-2 text-center transition-all ${mobileActivePane === "preview" ? "border-blue-600 text-blue-500" : "border-transparent text-slate-400"}`}
          >
            👁 Real-time Preview
          </button>
        </div>
      )}

      {/* 2. CORE WORKSPACE MODALS PANEL */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 flex flex-col justify-start">
        <div
          className={`w-full p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between ${
            activeStep === 3
              ? "lg:max-w-none lg:p-0 lg:border-none lg:bg-transparent"
              : appState.isDarkModeOn
                ? "bg-slate-900 border-slate-800/80 shadow-xl shadow-black/20"
                : "bg-white border-slate-200/50 shadow-xs"
          }`}
        >
          {/* STEP FRAME 1: INTRODUCTORY SYSTEM ATTRIBUTES */}
          {activeStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-100 dark:border-slate-800/60">
                Phase 1: Knowledge Target Configuration
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  Publication Identity Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Understanding Asynchronous Macro Task Schedulers inside V8 Runtimes"
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
                    Core Field Track Branch
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
                    Target Read Competency Level
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
                      "Beginner Base",
                      "Intermediate Focus",
                      "Advanced Masters",
                      "General Analytics",
                    ].map((lvl, i) => (
                      <option key={i} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP FRAME 2: SUMMARY ABSTRACT ABSTRACTS */}
          {activeStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pb-2 border-b border-slate-100 dark:border-slate-800/60">
                Phase 2: Discovery Feed Assets Summary
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  Short Catalog Synopsis Summary
                </label>
                <textarea
                  rows="3"
                  placeholder="Draft a crisp 2-sentence structural abstract summation statement explicitly designed to hook student clicks inside discover catalogs..."
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none leading-relaxed resize-none font-medium ${
                    appState.isDarkModeOn
                      ? "bg-slate-950 border-slate-800 focus:border-blue-500/50 text-slate-300"
                      : "bg-slate-50 border-slate-200 focus:border-blue-400"
                  }`}
                />
              </div>

              <div className="space-y-2 pt-1">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 block">
                  Target Keywords Search Filters{" "}
                  <span className="text-[10px] font-mono text-slate-500">
                    (Hit Enter to append)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., WebPerf, MultiThreading"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  disabled={tags.length >= 5}
                  className={`w-full px-4 py-3 text-sm rounded-xl border focus:outline-none disabled:opacity-40 transition-all ${
                    appState.isDarkModeOn
                      ? "bg-slate-950 border-slate-800 text-white focus:border-blue-500/40"
                      : "bg-slate-50 border-slate-200 focus:border-blue-400"
                  }`}
                />

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1.5 text-[11px] font-bold bg-blue-500/5 text-blue-500 dark:text-blue-400 px-2.5 py-1 rounded-lg border border-blue-500/10 dark:border-blue-500/20"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-500 font-mono font-bold text-xs select-none cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP FRAME 3: SPLIT DEEP EDITOR CANVASES */}
          {activeStep === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full animate-fadeIn">
              {/* Creator Text Editor Node */}
              <div
                className={`p-5 sm:p-6 rounded-2xl border flex flex-col gap-4 lg:h-[calc(100vh-210px)] lg:overflow-y-auto scrollbar-none ${
                  mobileActivePane !== "edit" ? "hidden lg:flex" : "flex"
                } ${appState.isDarkModeOn ? "bg-slate-900 border-slate-800/80" : "bg-white border-slate-200/50 shadow-xs"}`}
              >
                <div className="flex items-center justify-between pb-1 text-xs font-bold text-slate-400 dark:text-slate-500">
                  <span className="uppercase tracking-wider text-[10px]">
                    Composition Editor
                  </span>
                  <span className="font-mono text-[10px]">
                    Words: {documentMetrics.words} | Chars:{" "}
                    {documentMetrics.chars}
                  </span>
                </div>

                {/* Macro Toolbar Panel */}
                <div
                  className={`w-full px-3 py-2 border-t border-x rounded-t-xl flex items-center flex-wrap gap-2 text-xs font-bold ${
                    appState.isDarkModeOn
                      ? "bg-slate-950 border-slate-800 text-slate-400"
                      : "bg-slate-100 border-slate-200 text-slate-600"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => injectMarkdownSyntax("# ")}
                    className="px-2 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => injectMarkdownSyntax("## ")}
                    className="px-2 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => injectMarkdownSyntax("**text**")}
                    className="px-2 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 font-bold cursor-pointer"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => injectMarkdownSyntax("> ")}
                    className="px-2 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => injectMarkdownSyntax("- ")}
                    className="px-2 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    List
                  </button>
                </div>

                <textarea
                  placeholder="# Core Outline Title Here...&#10;&#10;Inject standard documentation markdown delimiters to mirror compiling layouts immediately on the right side window workspace track blocks..."
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  className={`w-full flex-1 px-4 py-4 text-sm rounded-b-xl border-x border-b focus:outline-none font-mono resize-none overflow-y-auto leading-relaxed min-h-[300px] ${
                    appState.isDarkModeOn
                      ? "bg-slate-950 border-slate-800 text-slate-200 focus:border-blue-500/40"
                      : "bg-slate-50 border-slate-200 focus:border-blue-400"
                  }`}
                />
              </div>

              {/* Real-time Renderer Panel */}
              <div
                className={`p-6 rounded-2xl border lg:h-[calc(100vh-210px)] lg:overflow-y-auto scrollbar-none flex flex-col ${
                  mobileActivePane !== "preview" ? "hidden lg:flex" : "flex"
                } ${appState.isDarkModeOn ? "bg-slate-900 border-slate-800/80" : "bg-white border-slate-200/50 shadow-xs"}`}
              >
                <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pb-2 border-b border-slate-100 dark:border-slate-800/60 mb-4 flex items-center justify-between">
                  <span>Compiled Paper Preview</span>
                  <span className="font-mono text-[10px] text-slate-400">
                    ⏱ {documentMetrics.readTime} min read metrics
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto select-none space-y-4 max-w-xl mx-auto w-full">
                  {title.trim() && (
                    <h1 className="text-xl sm:text-2xl font-black leading-tight text-slate-900 dark:text-white">
                      {title}
                    </h1>
                  )}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-400 mb-4">
                    <span className="text-blue-500 uppercase tracking-wide">
                      {category}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-500">
                      {level} Target
                    </span>
                  </div>
                  <div className="prose dark:prose-invert">
                    {parseMarkdownToReact(body)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LOWER PHASE CONTROL BUTTON REGISTRIES */}
          {activeStep < 3 && (
            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
              <button
                type="button"
                disabled={activeStep === 1}
                onClick={() => setActiveStep(prev => prev - 1)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer disabled:opacity-30"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={() => {
                  if (activeStep === 1 && !title.trim()) {
                    setToast({
                      isVisible: true,
                      type: "error",
                      message:
                        "Please state a functional title for your article.",
                    })
                    return
                  }
                  if (activeStep === 2 && !summary.trim()) {
                    setToast({
                      isVisible: true,
                      type: "error",
                      message:
                        "Provide a short summary abstract overview before continuing.",
                    })
                    return
                  }
                  setActiveStep(prev => prev + 1)
                }}
                className="px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-950 hover:opacity-90 transition cursor-pointer shadow-sm font-mono"
              >
                Continue Phase →
              </button>
            </div>
          )}

          {/* PHASE 3 ASYNC NETWORK TRIGGER FOOTER ACTIONS PANEL */}
          {activeStep === 3 && (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 lg:mt-8 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer self-start sm:self-center"
              >
                ← Return to Summary
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  disabled={isSavingDraft || isSubmitting}
                  onClick={() => saveDocumentToCloud("Draft")}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer disabled:opacity-50 h-10 min-w-32 flex items-center justify-center"
                >
                  {isSavingDraft ? (
                    <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Save Working Draft"
                  )}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting || isSavingDraft}
                  onClick={() => saveDocumentToCloud("Live")}
                  className="px-5 py-2.5 text-xs font-black rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/10 transition cursor-pointer hover:-translate-y-0.5 disabled:opacity-50 h-10 min-w-36 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    "Compile & Release"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default WriteArticle
