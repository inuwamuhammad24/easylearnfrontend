// visit this link https://mediamodifier.com/svg-editor to edit svg

import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import Axios from "axios"
import "./main.css"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

// components
import Home from "./components/Pages/Home/Home"
import SignUpPage from "./components/SignUpPage"
import LoginPage from "./components/LoginPage"
import CoursesHome from "./components/Pages/Courses/CoursesHome"
import CourseDetails from "./components/Pages/Courses/CourseDetail"
import CourseContent from "./components/Pages/Courses/CourseContent"
import CreateCourse from "./components/Pages/Instructor/CreateCourse"
import ArticlesExplore from "./components/Pages/Articles/ArticlesExplore"
import ArticleReader from "./components/Pages/Articles/ArcticleReader"
import WriteArticle from "./components/Pages/Articles/CreateArticle"
import StudioDashboard from "./components/Pages/Instructor/StudioDashboard"
import About from "./components/Pages/Home/About"

function App() {
  const initialState = {
    isLogin: false,
    isLogoReady: true,
    isDarkModeOn: localStorage.getItem("easylearn_theme_dark") !== "false", // Sync theme persistence across reloads
    backendURL: "http://192.168.2.91:8000",
    token: localStorage.getItem("token") || "", // Pre-seed local state matching browser cache tracks
    appLoadingState: true, // Protective loader flag shields screen during bootstrap token checks
    user: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      id: "",
      roles: [],
    },
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "logoReady":
        draft.isLogoReady = true
        break

      case "changeTheme":
        draft.isDarkModeOn = !draft.isDarkModeOn
        localStorage.setItem("easylearn_theme_dark", draft.isDarkModeOn)
        break

      case "login":
        localStorage.setItem("token", action.payload.token)
        localStorage.setItem("user", JSON.stringify(action.payload.user))

        draft.isLogin = true
        draft.token = action.payload.token
        draft.user.firstName = action.payload.user.firstName
        draft.user.lastName = action.payload.user.lastName
        draft.user.username = action.payload.user.username
        draft.user.email = action.payload.user.email
        draft.user.id = action.payload.user.id
        draft.user.roles = action.payload.user.roles
        draft.appLoadingState = false
        break

      case "logout":
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        draft.isLogin = false
        draft.token = ""
        draft.user = {
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          id: "",
          roles: [],
        }
        draft.appLoadingState = false
        break

      case "finishHydrationCheck":
        draft.appLoadingState = false
        break

      default:
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  // EFFECT 1: Clean Theme DOM Synchronization safely outside the pure reducer loop
  useEffect(() => {
    const htmlElement = document.querySelector("html")
    if (state.isDarkModeOn) {
      htmlElement.style.background = "rgb(19, 25, 32)"
      htmlElement.style.colorScheme = "dark"
    } else {
      htmlElement.style.background = "#fff"
      htmlElement.style.colorScheme = "light"
    }
  }, [state.isDarkModeOn])

  // EFFECT 2: App-Boot Persistent Session Hydration Controller via POST Request Payload
  useEffect(() => {
    const checkActiveSessionValidity = async () => {
      // If no token exists in the browser cache, skip network checks and unlock routes instantly
      if (
        localStorage.getItem("token") === null ||
        localStorage.getItem("token") === ""
      ) {
        dispatch({ type: "finishHydrationCheck" })
        return
      }

      try {
        // Converted from GET header to a clear, isolated POST transaction payload body
        const response = await Axios.post(
          `${state.backendURL}/user/check-token-validity`,
          {
            token: state.token,
          },
        )

        if (response.data && response.data.status === "success") {
          // Re-hydrate active session state variables using verified server data payload properties
          dispatch({
            type: "login",
            payload: {
              token: state.token,
              user: response.data.user,
            },
          })
        } else {
          dispatch({ type: "logout" })
        }
      } catch (err) {
        console.log(
          "Token confirmation rejected or expired. Resetting application profile paths.",
          err,
        )
        dispatch({ type: "logout" })
      }
    }

    checkActiveSessionValidity()
  }, [])

  // RENDERING SUBSYSTEM: Boot Loading Shield (Prevents layout jumps while authentication resolves)
  if (state.appLoadingState) {
    return (
      <div
        className={`w-screen h-screen flex flex-col justify-center items-center font-sans antialiased select-none transition-colors duration-300 ${
          state.isDarkModeOn
            ? "bg-slate-950 text-slate-100"
            : "bg-slate-50 text-slate-800"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-4 border-blue-500/10 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Securing Studio Session Context...
          </p>
        </div>
      </div>
    )
  }

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user/signup" element={<SignUpPage />} />
            <Route path="/courses" element={<CoursesHome />} />
            <Route path="/course/:name" element={<CourseDetails />} />
            <Route path="/course/:name/:id" element={<CourseContent />} />
            <Route path="/course/create-course" element={<CreateCourse />} />
            <Route path="/articles" element={<ArticlesExplore />} />
            <Route path="/article/:articleId" element={<ArticleReader />} />
            <Route path="/article/create-article" element={<WriteArticle />} />
            <Route
              path="/instructor/:instructorId/dashboard"
              element={<StudioDashboard />}
            />
            <Route
              path="/instructor/dashboard/create-course"
              element={<CreateCourse />}
            />

            {/* Fallback route handles orphaned dashboard redirections */}
            <Route path="/instructor/dashboard" element={<StudioDashboard />} />
          </Routes>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app")).render(<App />)

if (module.hot) {
  module.hot.accept()
}
