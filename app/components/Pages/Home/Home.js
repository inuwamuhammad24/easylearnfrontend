import React, { useState, useContext } from "react"
import Welcome from "../../Pages/Home/Welcome"
import NavigationMenus from "../../NavigationMenus"
import TopicsYouMayLike from "./TopicsYouMayLike"
import BecomeInstructor from "./BecomeInstructor"
import SearchOverlay from "../../SearchOverlay"
import StateContext from "../../../StateContext"
import CarreerTree from "./CareerTree"
import Footer from "../../Pages/Footer"

function Home() {
  const appState = useContext(StateContext)
  const [activePreview, setActivePreview] = useState("ai")

  return (
    <div
      className={`min-h-screen font-sans antialiased selection:bg-blue-500 selection:text-white transition-colors duration-300 ${
        appState.isDarkModeOn
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      <NavigationMenus />
      <SearchOverlay />

      <Welcome />

      {/* Dynamic Data & Impact Stats Section */}
      <section className="max-w-6xl mx-auto -mt-10 mb-24 px-6 relative z-20">
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 rounded-3xl border p-6 divide-y-2 sm:divide-y-0 lg:divide-x text-center transition-all duration-300 ${
            appState.isDarkModeOn
              ? "bg-slate-900 border-slate-800/80 divide-slate-800 shadow-xl shadow-black/40"
              : "bg-white border-slate-100 divide-slate-100 shadow-xl shadow-slate-200/50"
          }`}
        >
          {[
            {
              value: "94%",
              label: "Course Completion Rate",
              sub: "vs 10% industry average",
            },
            {
              value: "45k+",
              label: "Active Learners Daily",
              sub: "Building consistent habits",
            },
            {
              value: "120+",
              label: "Skill Trees Available",
              sub: "From Dev to Digital Branding",
            },
            {
              value: "24/7",
              label: "Socratic AI Support",
              sub: "Instant conceptual guidance",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-4 sm:p-6 group transition-all duration-300 first:rounded-t-2xl sm:first:rounded-none lg:first:rounded-l-2xl last:rounded-b-2xl sm:last:rounded-none lg:last:rounded-r-2xl ${
                appState.isDarkModeOn
                  ? "hover:bg-slate-800/40"
                  : "hover:bg-slate-50/80"
              }`}
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-500 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div
                className={`font-bold mt-2 text-sm sm:text-base ${appState.isDarkModeOn ? "text-slate-200" : "text-slate-800"}`}
              >
                {stat.label}
              </div>
              <div
                className={`text-xs mt-1 font-medium ${appState.isDarkModeOn ? "text-slate-500" : "text-slate-400"}`}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      <TopicsYouMayLike />

      {/* INTERACTIVE FEATURE PREVIEW: "Taste the Tech" */}
      <section className="max-w-6xl mx-auto mt-28 px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            className={`text-3xl font-extrabold tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
          >
            Experience the Next Generation of Learning
          </h2>
          <p
            className={`mt-3 ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
          >
            See how our intelligent workspace adapts to your pace, moving past
            static video lessons into interactive mastery.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Controls Triggering Transitions */}
          <div className="lg:col-span-5 space-y-4">
            {[
              {
                id: "ai",
                title: "Smart Sidepanel AI",
                desc: "Highlight code or text blocks anywhere inside the player to trigger an instant breakdown, analogy, or edge case test.",
                icon: "🤖",
              },
              {
                id: "sandbox",
                title: "In-Video Sandbox Workspace",
                desc: "The platform automatically pauses lessons at critical steps, prompting you to build right inside the integrated timeline workspace.",
                icon: "💻",
              },
              {
                id: "tree",
                title: "Visual Career Skill Trees",
                desc: "Track knowledge linearly or branch off into hyper-specific specialties. Uncover exactly what concepts you lack.",
                icon: "🌱",
              },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActivePreview(item.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex gap-4 ${
                  activePreview === item.id
                    ? appState.isDarkModeOn
                      ? "bg-slate-900 border-blue-500/50 shadow-lg shadow-black/20 translate-x-2"
                      : "bg-white border-blue-200 shadow-md translate-x-2"
                    : "bg-transparent border-transparent opacity-60 hover:opacity-100 hover:translate-x-1"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl shadow-sm ${
                    activePreview === item.id
                      ? "bg-blue-600 text-white"
                      : appState.isDarkModeOn
                        ? "bg-slate-800 border border-slate-700 text-slate-300"
                        : "bg-white border border-slate-200 text-slate-700"
                  }`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className={`font-bold text-base ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-sm mt-1 leading-relaxed ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
                  >
                    {item.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Visual Workspace Mockup Drawer */}
          <div
            className={`lg:col-span-7 rounded-2xl p-6 shadow-2xl min-h-[380px] flex flex-col justify-between relative overflow-hidden border ${
              appState.isDarkModeOn
                ? "bg-slate-900/60 border-slate-800"
                : "bg-slate-900 text-slate-100 border-slate-950"
            }`}
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-slate-500 ml-2 font-mono">
                workspace_preview.config
              </span>
            </div>

            <div className="relative flex-1 flex items-center justify-center">
              {activePreview === "ai" && (
                <div className="w-full space-y-4 transition-all duration-300">
                  <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/50 max-w-md">
                    <p className="text-xs text-slate-400 font-mono">
                      Selected Code Block:
                    </p>
                    <code className="text-emerald-400 text-sm block mt-1 font-mono">
                      const app = express();
                    </code>
                  </div>
                  <div className="p-4 bg-blue-950/40 border border-blue-800/40 rounded-xl ml-auto max-w-md shadow-lg shadow-black/30">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold bg-blue-600 px-1.5 py-0.5 rounded text-white tracking-wide uppercase">
                        AI Buddy
                      </span>
                      <span className="text-[10px] text-blue-300">
                        Active Concept Check
                      </span>
                    </div>
                    <p className="text-sm text-slate-200">
                      That instantiates your server. Think of it like booking a
                      plot before setting up rooms (routes)!
                    </p>
                  </div>
                </div>
              )}

              {activePreview === "sandbox" && (
                <div className="w-full space-y-3 transition-all duration-300">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
                    <p className="text-slate-500">
                      // Task: Set up a basic server port link
                    </p>
                    <p>
                      <span className="text-pink-400">const</span> PORT ={" "}
                      <span className="text-amber-300">5000</span>;
                    </p>
                    <p className="text-emerald-400 bg-emerald-950/40 border-l-2 border-emerald-500 py-1 pl-2 my-1">
                      app.listen(PORT, () =&gt; console.log(`Active`));
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 px-1">
                    <span>💡 Console output clear.</span>
                    <span className="text-emerald-400 font-bold">
                      ✓ Success: Lesson Unlocked
                    </span>
                  </div>
                </div>
              )}

              {activePreview === "tree" && (
                <div className="w-full flex flex-col items-center justify-center gap-4 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-600 rounded-xl font-bold text-xs shadow-md text-white">
                      Node.js Basics
                    </div>
                    <div className="w-8 h-0.5 bg-blue-600"></div>
                    <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl font-bold text-xs text-slate-400">
                      RAG Integration
                    </div>
                  </div>
                  <p className="text-center text-xs text-slate-400 max-w-xs mt-2">
                    Complete{" "}
                    <span className="text-blue-400">
                      Express routing challenges
                    </span>{" "}
                    to unlock advanced Artificial Intelligence modules.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CarreerTree />

      {/* Categories Grid */}
      <section className="max-w-6xl mx-auto mt-32 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
          <div>
            <h2
              className={`text-3xl font-extrabold tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
            >
              Explore Top Categories
            </h2>
            <p
              className={`mt-1 ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
            >
              Pick a path and start mastering in-demand global skills.
            </p>
          </div>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full w-max shadow-sm ${
              appState.isDarkModeOn
                ? "text-blue-400 bg-blue-950/40 border border-blue-900/30"
                : "text-blue-600 bg-blue-50"
            }`}
          >
            ⚡ Powered by AI Recommendations
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {[
            { name: "Programming", count: "140+ courses" },
            { name: "Business", count: "90+ courses" },
            { name: "Design", count: "110+ courses" },
            { name: "Marketing", count: "75+ courses" },
            { name: "Data Science", count: "60+ courses" },
            { name: "AI & ML", count: "45+ courses" },
            { name: "Cybersecurity", count: "30+ courses" },
            { name: "Personal Development", count: "80+ courses" },
          ].map(cat => (
            <div
              key={cat.name}
              className={`group p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[120px] ${
                appState.isDarkModeOn
                  ? "bg-slate-900 border-slate-800 hover:border-blue-500/50"
                  : "bg-white border-slate-100 hover:border-blue-100"
              }`}
            >
              <div
                className={`font-bold transition-colors duration-200 group-hover:text-blue-500 ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                {cat.name}
              </div>
              <div
                className={`text-xs font-medium mt-2 transition-colors duration-200 ${appState.isDarkModeOn ? "text-slate-500 group-hover:text-slate-400" : "text-slate-400 group-hover:text-slate-500"}`}
              >
                {cat.count}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className={`w-full mt-32 py-20 border-y transition-colors duration-300 ${
          appState.isDarkModeOn
            ? "bg-slate-900 border-slate-800"
            : "bg-white border-slate-100"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2
              className={`text-3xl font-extrabold tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
            >
              Why Learn with easylearn?
            </h2>
            <p
              className={`mt-3 ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
            >
              We combine expert education with adaptive AI tech to make learning
              sticky, interactive, and tailored to your speed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Socratic AI Tutor",
                desc: "Get unstuck instantly with an AI companion that guides you instead of just handing over answers.",
                badge: "Smart",
              },
              {
                title: "Interactive Sandboxes",
                desc: "Write code, fix text, or solve real case studies directly inside your video lesson timeline.",
                badge: "Active",
              },
              {
                title: "Bite-Sized Skill Trees",
                desc: "Visualize your educational progress like an RPG character map. Skip what you know.",
                badge: "Gamified",
              },
              {
                title: "Global Peer Network",
                desc: "Collaborate in asynchronous study rooms, join focus groups, and earn peer-review rewards.",
                badge: "Community",
              },
            ].map(item => (
              <div
                key={item.title}
                className={`relative p-6 rounded-2xl border hover:shadow-md transition-all duration-300 group ${
                  appState.isDarkModeOn
                    ? "bg-slate-950/40 border-slate-800 hover:bg-slate-950/80"
                    : "bg-slate-50 border-slate-100 hover:bg-slate-50/50"
                }`}
              >
                <span
                  className={`absolute top-4 right-4 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border shadow-sm transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 ${
                    appState.isDarkModeOn
                      ? "bg-slate-800 text-blue-400 border-slate-700"
                      : "bg-white text-blue-600 border-slate-200"
                  }`}
                >
                  {item.badge}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center font-bold transition-all duration-300 ${
                    appState.isDarkModeOn
                      ? "bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white"
                      : "bg-blue-600/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                  }`}
                >
                  ⚡
                </div>
                <h3
                  className={`font-bold text-lg mb-2 ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${appState.isDarkModeOn ? "text-slate-400" : "text-slate-500"}`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Blue CTA Banner */}
      <section className="max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-3xl py-16 mt-32 px-8 text-center shadow-xl shadow-blue-600/10 relative overflow-hidden group">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-45 h-45 bg-blue-500/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Start Learning Intelligently Today
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Join thousands of active learners building real skills. Setup your
            profile in less than a minute.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-slate-50 hover:scale-[1.03] transition-all duration-200 active:scale-[0.98]">
            Create Free Account
          </button>
        </div>
      </section>

      <BecomeInstructor />
      <Footer />
    </div>
  )
}

export default Home
