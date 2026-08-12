import React, { useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import { motion, AnimatePresence } from "framer-motion"
import Axios from "axios"
import StateContext from "../StateContext"
import NavigationMenus from "./NavigationMenus"
import Toast from "./shared/Toast"

const initialState = {
  username: { value: "", hasErrors: false, message: "" },
  email: { value: "", hasErrors: false, message: "" },
  firstName: { value: "", hasErrors: false, message: "" },
  lastName: { value: "", hasErrors: false, message: "" },
  password: { value: "", hasErrors: false, message: "" },
  errorMessage: "",
  isLoading: false,
  openSuccessOverlay: false,
  openErrorOverlay: false,
}

function reducer(draft, action) {
  switch (action.type) {
    case "usernameImmediately":
      draft.username.hasErrors = false
      draft.username.message = ""
      draft.username.value = action.value
      if (!action.value.trim()) {
        draft.username.message = "Username cannot be empty"
        draft.username.hasErrors = true
      } else if (!/^[a-zA-Z0-9_]+$/.test(action.value.trim())) {
        draft.username.message =
          "Only letters, numbers, and underscores are allowed"
        draft.username.hasErrors = true
      } else if (action.value.length > 20) {
        draft.username.message = "Cannot exceed 20 characters"
        draft.username.hasErrors = true
      }
      break

    case "usernameAfterDelay":
      if (draft.username.value.trim() && draft.username.value.length < 3) {
        draft.username.message = "Cannot be less than 3 characters"
        draft.username.hasErrors = true
      }
      break

    case "usernameExist":
      draft.username.message = "This username is already taken"
      draft.username.hasErrors = true
      break

    case "emailImmediately":
      draft.email.hasErrors = false
      draft.email.message = ""
      draft.email.value = action.value
      break

    case "emailAfterDelay":
      if (!draft.email.value.trim()) {
        draft.email.message = "Email cannot be empty"
        draft.email.hasErrors = true
      } else if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
          draft.email.value.trim(),
        )
      ) {
        draft.email.message = "Please enter a valid email address"
        draft.email.hasErrors = true
      }
      break

    case "emailExist":
      draft.email.message = "This email is already registered"
      draft.email.hasErrors = true
      break

    case "firstNameImmediately":
      draft.firstName.hasErrors = false
      draft.firstName.message = ""
      draft.firstName.value = action.value
      if (!action.value.trim()) {
        draft.firstName.message = "First name cannot be empty"
        draft.firstName.hasErrors = true
      } else if (!/^[a-zA-Z]+$/.test(action.value.trim())) {
        draft.firstName.message =
          "Only standard alphabetical letters are allowed"
        draft.firstName.hasErrors = true
      } else if (action.value.length > 40) {
        draft.firstName.message = "Cannot exceed 40 characters"
        draft.firstName.hasErrors = true
      }
      break

    case "lastNameImmediately":
      draft.lastName.hasErrors = false
      draft.lastName.message = ""
      draft.lastName.value = action.value
      if (!action.value.trim()) {
        draft.lastName.message = "Last name cannot be empty"
        draft.lastName.hasErrors = true
      } else if (!/^[a-zA-Z]+$/.test(action.value.trim())) {
        draft.lastName.message =
          "Only standard alphabetical letters are allowed"
        draft.lastName.hasErrors = true
      } else if (action.value.length > 40) {
        draft.lastName.message = "Cannot exceed 40 characters"
        draft.lastName.hasErrors = true
      }
      break

    case "passwordImmediately":
      draft.password.hasErrors = false
      draft.password.message = ""
      draft.password.value = action.value
      if (!action.value) {
        draft.password.message = "Password cannot be empty"
        draft.password.hasErrors = true
      } else if (action.value.length < 8) {
        draft.password.message = "Password must be at least 8 characters long"
        draft.password.hasErrors = true
      }
      break

    case "startLoading":
      draft.openSuccessOverlay = false
      draft.openErrorOverlay = false
      draft.isLoading = true
      break

    case "finishLoading":
      draft.isLoading = false
      break

    case "clearFields":
      draft.username.value = ""
      draft.email.value = ""
      draft.firstName.value = ""
      draft.lastName.value = ""
      draft.password.value = ""
      break

    case "openSuccessOverlay":
      draft.openSuccessOverlay = true
      break

    case "openErrorOverlay":
      draft.errorMessage = action.message
      draft.openErrorOverlay = true
      break

    case "closeOverlay":
      draft.errorMessage = ""
      draft.openSuccessOverlay = false
      draft.openErrorOverlay = false
      break

    default:
      break
  }
}

function SignUpPage() {
  const appState = useContext(StateContext)
  const navigate = useNavigate()
  const usernameRef = useRef(null)
  const [userId, setUserId] = useState(null)
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {
    if (usernameRef.current) usernameRef.current.focus()
  }, [])

  // Manage automatic post-success route redirection on close
  const handleToastClose = () => {
    if (state.openSuccessOverlay) {
      dispatch({ type: "closeOverlay" })
      navigate(`/instructor/${userId}/dashboard`)
    } else {
      dispatch({ type: "closeOverlay" })
    }
  }

  // Remote dynamic debounce field checks
  useEffect(() => {
    if (!state.username.value.trim()) return
    const delay = setTimeout(() => {
      dispatch({ type: "usernameAfterDelay" })
      Axios.post(appState.backendURL + "/user/doesUsernameExist", {
        username: state.username.value,
      })
        .then(response => {
          if (response.data) dispatch({ type: "usernameExist" })
        })
        .catch(() => console.log("Username sync mapping query failure."))
    }, 800)
    return () => clearTimeout(delay)
  }, [state.username.value, appState.backendURL, dispatch])

  useEffect(() => {
    if (!state.email.value.trim()) return
    const delay = setTimeout(() => {
      dispatch({ type: "emailAfterDelay" })
      Axios.post(appState.backendURL + "/user/doesEmailnameExist", {
        email: state.email.value,
      })
        .then(response => {
          if (response.data) dispatch({ type: "emailExist" })
        })
        .catch(() => console.log("Email sync mapping query failure."))
    }, 800)
    return () => clearTimeout(delay)
  }, [state.email.value, appState.backendURL, dispatch])

  const handleSubmit = async e => {
    e.preventDefault()

    dispatch({ type: "usernameImmediately", value: state.username.value })
    dispatch({ type: "emailAfterDelay" })
    dispatch({ type: "firstNameImmediately", value: state.firstName.value })
    dispatch({ type: "lastNameImmediately", value: state.lastName.value })
    dispatch({ type: "passwordImmediately", value: state.password.value })

    if (
      state.username.hasErrors ||
      state.email.hasErrors ||
      state.firstName.hasErrors ||
      state.lastName.hasErrors ||
      state.password.hasErrors ||
      !state.username.value ||
      !state.email.value ||
      !state.firstName.value ||
      !state.lastName.value ||
      !state.password.value
    )
      return

    dispatch({ type: "startLoading" })

    try {
      const response = await Axios.post(
        appState.backendURL + "/user/register",
        {
          username: state.username.value,
          email: state.email.value,
          firstName: state.firstName.value,
          lastName: state.lastName.value,
          password: state.password.value,
        },
      )

      dispatch({ type: "finishLoading" })

      if (response.data.status === "success") {
        setUserId(response.data.user.id)
        dispatch({ type: "openSuccessOverlay" })
        dispatch({ type: "clearFields" })
      } else {
        dispatch({
          type: "openErrorOverlay",
          message:
            "Registration parameters rejected. Verify fields match unique entries.",
        })
      }
    } catch (err) {
      dispatch({ type: "finishLoading" })
      const errorMsg = err.response
        ? "The server encountered an issue processing registration metadata."
        : "Network response timeout. Check active connection link lines."
      dispatch({ type: "openErrorOverlay", message: errorMsg })
    }
  }

  const getInputStyles = fieldState => {
    const base =
      "w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none "
    if (fieldState.hasErrors) {
      return (
        base +
        "border-rose-500 bg-rose-500/5 text-rose-500 focus:ring-1 focus:ring-rose-400"
      )
    }
    if (fieldState.value && !fieldState.hasErrors) {
      return (
        base +
        "border-emerald-500 bg-emerald-500/5 focus:ring-1 focus:ring-emerald-400 dark:text-slate-200"
      )
    }
    return (
      base +
      (appState.isDarkModeOn
        ? "bg-slate-950 border-slate-800 text-white focus:border-blue-500"
        : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500")
    )
  }

  const errorAnimationVariants = {
    initial: { opacity: 0, y: -6 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
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

      {/* REUSABLE FLOATING TOAST LINK MODULE */}
      <Toast
        isVisible={state.openSuccessOverlay || state.openErrorOverlay}
        type={state.openSuccessOverlay ? "success" : "error"}
        message={
          state.openSuccessOverlay
            ? "Your platform profile keys have been indexed successfully. Redirecting..."
            : state.errorMessage
        }
        onClose={handleToastClose}
      />

      <main className="max-w-6xl mx-auto px-6 py-16 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div className="grid md:grid-cols-12 gap-8 items-stretch w-full">
          {/* LEFT COLUMN: BRAND DETAILS */}
          <div className="md:col-span-5 flex flex-col justify-center space-y-8 pr-4">
            <div className="space-y-2">
              <span className="text-[10px] font-black tracking-widest uppercase bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-md">
                Join easylearn
              </span>
              <h2
                className={`text-3xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                Begin Your Journey
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                Create a single unified credential key profile to access our
                entire integrated platform spectrum.
              </p>
            </div>

            <div className="space-y-6 divide-y divide-slate-100 dark:divide-slate-800/60 text-xs sm:text-sm font-medium">
              <div className="space-y-1.5">
                <h3
                  className={`font-bold ${appState.isDarkModeOn ? "text-blue-400" : "text-blue-600"}`}
                >
                  Student Track Workspace
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Enroll in premium curated content blocks, monitor lesson
                  progress vectors, and participate in peer-led focus groups.
                </p>
              </div>
              <div className="space-y-1.5 pt-4">
                <h3
                  className={`font-bold ${appState.isDarkModeOn ? "text-emerald-400" : "text-emerald-600"}`}
                >
                  Instructor Studio Suite
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Publish technical articles, build modular video sequences, and
                  track learner onboarding metrics through our studio dashboard
                  panels.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: REGISTRATION INPUT INTERFACE BOX */}
          <div
            className={`md:col-span-7 border p-6 sm:p-10 rounded-3xl flex flex-col justify-center transition-all ${
              appState.isDarkModeOn
                ? "bg-slate-900 border-slate-800/80 shadow-xl shadow-black/40"
                : "bg-white border-slate-100 shadow-xl shadow-slate-200/50"
            }`}
          >
            <div className="mb-6">
              <h2
                className={`text-2xl font-black tracking-tight ${appState.isDarkModeOn ? "text-white" : "text-slate-900"}`}
              >
                Get Started
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Register a free account profile in just a few seconds.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input Input Block */}
              <div className="space-y-1">
                <div className="h-5 flex items-center justify-between px-0.5 text-[11px] font-bold text-rose-500 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {state.username.hasErrors ? (
                      <motion.span
                        key="user-err"
                        variants={errorAnimationVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        ⚠️ {state.username.message}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="user-lbl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-400"
                      >
                        Unique Username
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <input
                  ref={usernameRef}
                  type="text"
                  placeholder="Username"
                  value={state.username.value}
                  onChange={e =>
                    dispatch({
                      type: "usernameImmediately",
                      value: e.target.value,
                    })
                  }
                  className={getInputStyles(state.username)}
                  autoComplete="off"
                />
              </div>

              {/* Email Input Input Block */}
              <div className="space-y-1">
                <div className="h-5 flex items-center justify-between px-0.5 text-[11px] font-bold text-rose-500 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {state.email.hasErrors ? (
                      <motion.span
                        key="email-err"
                        variants={errorAnimationVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        ⚠️ {state.email.message}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="email-lbl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-400"
                      >
                        Primary Email Address
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={state.email.value}
                  onChange={e =>
                    dispatch({
                      type: "emailImmediately",
                      value: e.target.value,
                    })
                  }
                  className={getInputStyles(state.email)}
                  autoComplete="off"
                />
              </div>

              {/* First & Last Name Split row input container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="h-5 flex items-center justify-between px-0.5 text-[11px] font-bold text-rose-500 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {state.firstName.hasErrors ? (
                        <motion.span
                          key="fn-err"
                          variants={errorAnimationVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          ⚠️ {state.firstName.message}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="fn-lbl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-slate-400"
                        >
                          First Name
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={state.firstName.value}
                    onChange={e =>
                      dispatch({
                        type: "firstNameImmediately",
                        value: e.target.value,
                      })
                    }
                    className={getInputStyles(state.firstName)}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-1">
                  <div className="h-5 flex items-center justify-between px-0.5 text-[11px] font-bold text-rose-500 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {state.lastName.hasErrors ? (
                        <motion.span
                          key="ln-err"
                          variants={errorAnimationVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          ⚠️ {state.lastName.message}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="ln-lbl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-slate-400"
                        >
                          Last Name
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={state.lastName.value}
                    onChange={e =>
                      dispatch({
                        type: "lastNameImmediately",
                        value: e.target.value,
                      })
                    }
                    className={getInputStyles(state.lastName)}
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Password Input Input Block */}
              <div className="space-y-1">
                <div className="h-5 flex items-center justify-between px-0.5 text-[11px] font-bold text-rose-500 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {state.password.hasErrors ? (
                      <motion.span
                        key="pass-err"
                        variants={errorAnimationVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        ⚠️ {state.password.message}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="pass-lbl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-400"
                      >
                        Secure Password (Min 8 chars)
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={state.password.value}
                  onChange={e =>
                    dispatch({
                      type: "passwordImmediately",
                      value: e.target.value,
                    })
                  }
                  className={getInputStyles(state.password)}
                  autoComplete="off"
                />
              </div>

              <button
                type="submit"
                disabled={state.isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/10 active:scale-[0.99] transition-all duration-150 text-xs sm:text-sm tracking-wider cursor-pointer disabled:opacity-50 mt-4 flex justify-center items-center h-12"
              >
                {state.isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                ) : (
                  "CREATE AN ACCOUNT"
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 font-semibold mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline font-bold"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignUpPage
