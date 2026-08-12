import React, { useContext, useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import NavigationMenus from "./NavigationMenus"
import Toast from "./shared/Toast"

function LoginPage() {
  const appState = useContext(StateContext)
  const appDispatch = useContext(DispatchContext) // Hook mapping global login action methods
  const navigate = useNavigate()
  const identifierRef = useRef(null)

  // Controlled component field state parameters
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState({
    isVisible: false,
    type: "success",
    message: "",
  })

  useEffect(() => {
    if (identifierRef.current) identifierRef.current.focus()
  }, [])

  const handleLoginSubmit = async e => {
    e.preventDefault()

    if (!email.trim() || !password) {
      setToast({
        isVisible: true,
        type: "error",
        message: "Please enter your account identity details completely.",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await Axios.post(
        `${appState.backendURL}/instructor/login`,
        {
          email: email.trim(),
          password,
        },
      )

      if (response.data && response.data.status === "success") {
        const { token, user } = response.data

        // Dispatch session metadata credentials objects straight onto your top-level context reducer
        appDispatch({ type: "login", payload: { token, user } })

        setToast({
          isVisible: true,
          type: "success",
          message: `Welcome back, ${user.firstName}! Synchronizing workspace assets...`,
        })

        setTimeout(() => {
          // Send dynamic profile views directly to their specific Studio control line parameters
          navigate(`/instructor/${user.id}/dashboard`)
        }, 1500)
      } else {
        setToast({
          isVisible: true,
          type: "error",
          message: "Invalid system validation signature.",
        })
      }
    } catch (err) {
      console.log(err)
      const serverFeedback =
        err.response?.data?.message ||
        "Login sequence handshake failed. Check parameters."
      setToast({ isVisible: true, type: "error", message: serverFeedback })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen font-sans antialiased transition-colors duration-300 relative overflow-x-hidden ${
        appState.isDarkModeOn
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-800"
      }`}
    >
      <NavigationMenus />

      {/* FLOATING STATUS TOAST ACTION NOTIFIER */}
      <Toast
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      <main className="max-w-6xl mx-auto px-6 py-16 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="grid md:grid-cols-12 gap-8 items-stretch w-full max-w-4xl">
          {/* VISUAL LAYOUT ROW: WELCOME BANNER PANEL */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-4 pr-2 text-center md:text-left">
            <span className="text-[10px] font-black tracking-widest uppercase bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-md self-center md:self-start">
              Studio Portal
            </span>
            <h2
              className={`text-2xl sm:text-3xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
            >
              Access Your Control Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Log back in to manage active curricula pathways, respond to
              student threads, and release technical engineering insights.
            </p>
          </div>

          {/* CREATOR SIGN-IN WORKSPACE FORM CHASIS CARD */}
          <div
            className={`md:col-span-7 border p-6 sm:p-10 rounded-3xl flex flex-col justify-center transition-all ${
              appState.isDarkModeOn
                ? "bg-slate-900 border-slate-800/80 shadow-xl shadow-black/40"
                : "bg-white border-slate-100 shadow-xl shadow-slate-200/50"
            }`}
          >
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Identity Track Parameter */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block px-0.5 uppercase tracking-wide">
                  Email
                </label>
                <input
                  ref={identifierRef}
                  type="text"
                  placeholder="inuwa_dev or name@easylearn.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none font-medium transition-all ${
                    appState.isDarkModeOn
                      ? "bg-slate-950 border-slate-800 text-white focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500"
                  }`}
                  autoComplete="email"
                />
              </div>

              {/* Password Track Parameter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between px-0.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[10px] font-bold text-blue-500 hover:underline"
                  >
                    Forgot security key?
                  </Link>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                    appState.isDarkModeOn
                      ? "bg-slate-950 border-slate-800 text-white focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500"
                  }`}
                  autoComplete="current-password"
                />
              </div>

              {/* Submission Anchor Row Control Trigger Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/10 active:scale-[0.99] transition-all text-xs sm:text-sm tracking-wider cursor-pointer disabled:opacity-50 mt-4 flex justify-center items-center h-12 font-mono"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : (
                  "AUTHENTICATE SESSION ➔"
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 font-semibold mt-6">
              New to the platform studio ecosystem?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:underline font-bold"
              >
                Register Account
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
