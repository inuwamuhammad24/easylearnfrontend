import React, { useContext } from "react"
import StateContext from "../../../StateContext"

export default function CarreerTree() {
  const appState = useContext(StateContext)
  return (
    <section className="max-w-6xl mx-auto mt-32 px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h2
            className={`text-3xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
          >
            Gamified Career Skill Trees
          </h2>
          <p
            className={`text-sm mt-1.5 ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
          >
            Stop guessing what to learn next. Master nodes, unlock branches, and
            build verifiable skills.
          </p>
        </div>
        <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0">
          View All 120+ Trees →
        </button>
      </div>

      {/* Skill Tree Sample Container */}
      <div
        className={`p-8 rounded-3xl border ${
          appState.isDarkModeOn
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-200/60 shadow-sm"
        }`}
      >
        <div className="grid md:grid-cols-4 gap-6 items-center relative">
          {[
            {
              step: "01",
              title: "Frontend Core",
              desc: "HTML5, Semantic CSS, Tailwind Layouts",
              status: "completed",
            },
            {
              step: "02",
              title: "JavaScript Logic",
              desc: "DOM, Async Engines, ES6+ Arrays",
              status: "completed",
            },
            {
              step: "03",
              title: "MERN Frameworks",
              desc: "React Context, Express Routing, Mongo Atlas",
              status: "active",
            },
            {
              step: "04",
              title: "RAG AI Systems",
              desc: "Vector Embeddings, LLM Prompt Architecture",
              status: "locked",
            },
          ].map((node, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center text-center p-4 group"
            >
              {/* Node Circle */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm mb-4 border-2 transition-all duration-300 ${
                  node.status === "completed"
                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                    : node.status === "active"
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20 animate-pulse"
                      : appState.isDarkModeOn
                        ? "bg-slate-800 border-slate-700 text-slate-500"
                        : "bg-slate-50 border-slate-200 text-slate-400"
                }`}
              >
                {node.status === "completed" ? "✓" : node.step}
              </div>
              <h4
                className={`font-bold text-base ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-800"}`}
              >
                {node.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-[180px]">
                {node.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
