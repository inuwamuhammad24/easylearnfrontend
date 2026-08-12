import React, { useContext } from "react"
import NavigationMenus from "../../NavigationMenus"
import StateContext from "../../../StateContext"

// --- MICRO LAYOUT COMPONENT NODES ---
// Pure, accessible chronological container shell
function Timeline({ children }) {
  return (
    <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 my-8 pl-6 space-y-8">
      {children}
    </div>
  )
}

// Custom event node with floating point timeline markers
function TimelineEvent({ title, time, children }) {
  const appState = useContext(StateContext)
  return (
    <div className="relative group">
      {/* Floating chronological node dot anchor point */}
      <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-950 transition-transform group-hover:scale-125 duration-150"></span>

      <div className="space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h3
            className={`text-sm sm:text-base font-black tracking-tight ${appState.isDarkModeOn ? "text-slate-100" : "text-slate-900"}`}
          >
            {title}
          </h3>
          <span className="text-[10px] font-mono font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider shrink-0">
            {time}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
          {children}
        </p>
      </div>
    </div>
  )
}

// --- MAIN FEATURE COMPONENT BLOCK ---
function About() {
  const appState = useContext(StateContext)

  const corePillars = [
    {
      title: "Socratic Guidance",
      description:
        "Bypassing generic copy-paste answers by engineering AI agents that challenge students logically via leading diagnostic prompts.",
      icon: "🤖",
    },
    {
      title: "Hardware Sandboxes",
      description:
        "Eliminating local environment configuration friction. Code runtimes run natively right inside your unified student dashboard.",
      icon: "💻",
    },
    {
      title: "Relational Tracking",
      description:
        "Mapping curriculum progression dynamically through granular state trees, quiz arrays, and Career Skill Tree nodes.",
      icon: "⚡",
    },
  ]

  return (
    <div
      className={`min-h-screen font-sans antialiased pb-24 transition-colors duration-300 ${
        appState.isDarkModeOn
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      <NavigationMenus />

      {/* SECTION 1: THE HERO MANIFEST */}
      <section
        className={`w-full border-b py-20 ${appState.isDarkModeOn ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"}`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] font-black tracking-widest uppercase bg-blue-500/10 text-blue-500 px-3 py-1 rounded-md">
            The easylearn Manifest
          </span>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none max-w-2xl mx-auto ${
              appState.isDarkModeOn ? "text-white" : "text-slate-900"
            }`}
          >
            Architecting the Future of Technical Education
          </h1>
          <p
            className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-medium ${
              appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"
            }`}
          >
            A premium, end-to-end learning workspace engineered to convert raw
            theoretical data matrices into production-grade developer velocity.
          </p>
        </div>
      </section>

      {/* SECTION 2: THE ORIGIN CHRONICLE */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        <div className="text-center sm:text-left space-y-1">
          <h2
            className={`text-2xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
          >
            Our Journey
          </h2>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            How theory became production software
          </p>
        </div>

        <Timeline>
          <TimelineEvent
            title="Academic Genesis — University of Jos"
            time="August 2025"
          >
            Laid the foundational groundwork through comprehensive software cost
            estimation studies, exploring models like COCOMO II and Bayesian
            optimizations to build the structural core of adaptive educational
            management networks.
          </TimelineEvent>
          <TimelineEvent title="The Inception of 'Matty'" time="October 2025">
            Engineered and deployed **Matty**, a specialized RAG-powered virtual
            campus assistant. Validating instant vector document embedding
            retrieval schemas cleanly across live student navigation queries.
          </TimelineEvent>
          <TimelineEvent title="The Production Studio Launch" time="May 2026">
            Evolved the platform into a mature, multi-tenant learning workspace
            layout—bridging independent technical authoring studios with deep
            horizontal student interactive code classrooms.
          </TimelineEvent>
        </Timeline>
      </section>

      <hr className="max-w-4xl mx-auto border-slate-200 dark:border-slate-800/60" />

      {/* SECTION 3: THE CORE IDEOLOGY GRID */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        <div className="text-center space-y-1">
          <h2
            className={`text-2xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
          >
            Core Methodology Pillars
          </h2>
          <p className="text-xs text-slate-400 font-semibold">
            The behavioral guidelines powering our feature modules
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {corePillars.map((pillar, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl border transition-all ${
                appState.isDarkModeOn
                  ? "bg-slate-900 border-slate-800/80 shadow-md shadow-black/10"
                  : "bg-white border-slate-200/50 shadow-xs"
              }`}
            >
              <span className="text-xl block mb-3">{pillar.icon}</span>
              <h3
                className={`text-sm font-black mb-1.5 ${appState.isDarkModeOn ? "text-slate-100" : "text-slate-800"}`}
              >
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: THE ENGINEERING ECOSYSTEM */}
      <section
        className={`w-full border-y py-16 ${appState.isDarkModeOn ? "bg-slate-900/40 border-slate-900" : "bg-slate-100/50 border-slate-200/60"}`}
      >
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-3">
            <h2
              className={`text-2xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
            >
              The MERN Stack & AI Core
            </h2>
            <p
              className={`text-sm leading-relaxed font-medium ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-600"}`}
            >
              The architecture runs on a blazing fast, fully reactive system
              matrix. Your data records reside in highly relational MongoDB
              database clusters, while your text inputs calculate coordinates
              natively via custom embedders right inside our Express NodeJs
              middleware controllers.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono font-bold text-blue-500">
              <span className="bg-slate-200 dark:bg-slate-950 px-2.5 py-1 rounded border dark:border-slate-800">
                MongoDB Atlas
              </span>
              <span className="bg-slate-200 dark:bg-slate-950 px-2.5 py-1 rounded border dark:border-slate-800">
                Express Routing
              </span>
              <span className="bg-slate-200 dark:bg-slate-950 px-2.5 py-1 rounded border dark:border-slate-800">
                React Core
              </span>
              <span className="bg-slate-200 dark:bg-slate-950 px-2.5 py-1 rounded border dark:border-slate-800">
                Node Runtime
              </span>
            </div>
          </div>

          <div className="md:col-span-5 border p-6 rounded-2xl bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              System Blueprint Compliance
            </h4>
            <div className="space-y-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-2">
                ✔ Optimized Vector Indices
              </div>
              <div className="flex items-center gap-2">
                ✔ Strict Role-based Guards
              </div>
              <div className="flex items-center gap-2">
                ✔ Dynamic State Hydration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE CROSS-INDUSTRY VENTURE NODE */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center space-y-4">
        <h2
          className={`text-2xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
        >
          Beyond the Terminal: Sweet Treats Delight
        </h2>
        <p
          className={`text-sm max-w-xl mx-auto leading-relaxed font-medium ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
        >
          Engineering precision isn't just restricted to script configurations.
          We apply the exact same modular, detail-oriented architectural
          workflows to structure bakery systems, balancing precise scaling
          variables across our savory culinary tracks.
        </p>
        <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-500 hover:underline cursor-pointer pt-2">
          <span>Explore baking business branding</span> ➔
        </div>
      </section>
    </div>
  )
}

export default About
