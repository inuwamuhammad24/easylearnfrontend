// visit this link https://mediamodifier.com/svg-editor to edit svg

import React, { useEffect, useReducer } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import "./main.css"

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

// components
import Home from "./components/Home"
import SignUpPage from "./components/SignUpPage"
import LoginPage from "./components/LoginPage"
import CoursesHome from "./components/courses/CoursesHome"
import SingleCourseScreen from "./components/courses/SingleCourseScreen"
import CourseContent from "./components/courses/CourseContent"
import CreateCourse from "./components/courses/CreateCourse"
import Dashboard from "./components/Dashboard"
import InstructorDashboard from "./components/Instructor/InstructorDashboard"

function App() {
  const initialState = {
    isLogin: false,
    isLogoReady: true,
    isDarkModeOn: false,
    backendURL: "http://10.210.73.77:8000",
  }

  function reducer(draft, action) {
    switch (action.type) {
      case "logoReady":
        draft.isLogoReady = true
        break
      case "changeTheme":
        let scheme = document.querySelector("html")
        if (scheme.style.colorScheme == "light" || scheme.style.colorScheme == "") {
          scheme.style.background = "rgb(19, 25, 32)"
          scheme.style.colorScheme = "dark"
        } else {
          scheme.style.background = "#fff"
          scheme.style.colorScheme = "light"
        }
        draft.isDarkModeOn = !draft.isDarkModeOn
        break
    }
  }
  let scheme = document.querySelector("html")
  // if (scheme.style.colorScheme == "light") {
  //   scheme.style.background = "#1b1b1b"
  //   scheme.style.colorScheme = "dark"
  // } else {
  //   scheme.style.background = "#fff"
  //   scheme.style.colorScheme = "light"
  // }
  useEffect(() => {
    let scheme = document.querySelector("html")
    if (scheme.style.colorScheme == "light" || scheme.style.colorScheme == "") {
      scheme.style.background = "#fff"
    } else {
      scheme.style.background = "rgb(19, 25, 32)"
    }
  }, [initialState.isDarkModeOn])

  const [state, dispatch] = useImmerReducer(reducer, initialState)
  return (
    <>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/instructor/signup" element={<SignUpPage />} />
              <Route path="/courses" element={<CoursesHome />} />
              <Route path="/course/:name" element={<SingleCourseScreen />} />
              <Route path="/course/:name/:id" element={<CourseContent />} />
              <Route path="/course/create-course" element={<CreateCourse />} />
              <Route path="/instructor/:id/dashboard" element={<InstructorDashboard />} />
            </Routes>
          </BrowserRouter>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app")).render(<App />)

if (module.hot) {
  module.hot.accept()
}
