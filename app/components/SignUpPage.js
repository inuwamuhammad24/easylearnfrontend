import React, { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useImmerReducer } from "use-immer"
import { CSSTransition } from "react-transition-group"
import Axios from "axios"
import StateContext from "../StateContext"
import NavigationMenus from "./NavigationMenus"

function SignUpPage() {
  const appState = useContext(StateContext)

  const username = useRef(null)

  const initialState = {
    username: { value: "", hasErrors: false, message: "" },
    email: { value: "", hasErrors: false, message: "" },
    firstName: { value: "", hasErrors: false, message: "" },
    lastName: { value: "", hasErrors: false, message: "" },
    password: { value: "", hasErrors: false, message: "" },
    errorMessage: "",
    hasSubmitErrors: false,
    isLoading: false,
    openSucessOverlay: false,
    openErrorOverlay: false,
  }

  // reducer function
  function reducer(draft, action) {
    switch (action.type) {
      // this validations runs on the username field after every key strocks
      case "usernameImmediately":
        draft.username.hasErrors = false
        draft.username.message = ""
        draft.username.value = action.value
        if (action.value != "") {
          if (!/^[a-zA-Z0-9_]+$/.test(action.value.trim())) {
            draft.username.message = "Only letters and numbers are allowed"
            draft.username.hasErrors = true
          } else if (action.value.length > 20) {
            draft.username.message = "Cannot exceed 20 chracters"
            draft.username.hasErrors = true
          }
        } else {
          draft.username.message = "Username cannot be empty"
          draft.username.hasErrors = true
        }
        break

      // this validations runs on the username field after 800 milliseconds
      case "usernameAfterDelay":
        if (draft.username.value != "") {
          if (draft.username.value.length < 3) {
            draft.username.message = "Cannot be less than 3 characters"
            draft.username.hasErrors = true
          }
        }
        break

      // this validation runs on the email field after every key strokes
      case "emailImmediately":
        draft.email.hasErrors = false
        draft.email.message = ""
        draft.email.value = action.value
        if (draft.email.value.length > 50) {
        }
        break

      // this validation runs on the email field after 800 milliseconds
      case "emailAfterDelay":
        if (draft.email.value != "") {
          if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(draft.email.value.trim())) {
            draft.email.message = "Please use a valid email"
            draft.email.hasErrors = true
          }
        } else {
          draft.email.message = "email cannot be empty"
          draft.email.hasErrors = true
        }
        break

      // this validation runs on the firstname field after every key stroke
      case "firstNameImmediately":
        draft.firstName.hasErrors = false
        draft.firstName.message = ""
        draft.firstName.value = action.value
        if (draft.firstName.value != "") {
          if (!/^[a-zA-Z_]+$/.test(draft.firstName.value.trim())) {
            draft.firstName.message = "Only Chracters are allowed"
            draft.firstName.hasErrors = true
          }
          if (draft.firstName.value.length > 40) {
            draft.firstName.message = "Cannot exceed 40 chracters"
            draft.firstName.hasErrors = true
          }
        } else {
          draft.firstName.message = "Firstname Cannot be empty"
          draft.firstName.hasErrors = true
        }
        break

      // this validation runs on the lastName field after every key stroke
      case "lastNameImmediately":
        draft.lastName.hasErrors = false
        draft.lastName.message = ""
        draft.lastName.value = action.value
        if (draft.lastName.value != "") {
          if (!/^[a-zA-Z_]+$/.test(draft.lastName.value.trim())) {
            draft.lastName.message = "Only Chracters are allowed"
            draft.lastName.hasErrors = true
          }
          if (draft.lastName.value.length > 40) {
            draft.lastName.message = "Cannot exceed 40 chracters"
            draft.lastName.hasErrors = true
          }
        } else {
          draft.lastName.message = "Lastname cannot be empty"
          draft.lastName.hasErrors = true
        }
        break

      // this validation runs on the password field after every key stroke
      case "passwordImmediately":
        draft.password.hasErrors = false
        draft.password.message = ""
        draft.password.value = action.value
        if (draft.password.value != "") {
          // if (/^[a-zA-Z_]+$/.test(draft.password.value.trim())) {
          //   draft.password.message = "Please include letters, numbers and chracters"
          //   draft.password.hasErrors = true
          // }
          if (draft.password.value.length < 8) {
            draft.password.message = "Cannot be less than 8 characters"
            draft.password.hasErrors = true
          }
        } else {
          draft.password.message = "Password cannot be empty"
          draft.password.hasErrors = true
        }
        break

      case "usernameExist":
        draft.username.message = "This username already exist"
        draft.username.hasErrors = true
        break

      case "emailExist":
        draft.email.message = "This email already exist"
        draft.email.hasErrors = true
        break

      case "loading":
        draft.isLoading = true
        break

      case "clearFields":
        draft.username.value = ""
        draft.email.value = ""
        draft.firstName.value = ""
        draft.lastName.value = ""
        draft.password.value = ""

      case "finishLoading":
        draft.isLoading = false
        break

      case "openSuccessOverlay":
        draft.openSucessOverlay = true
        break

      case "openErrorOverlay":
        draft.errorMessage = action.message
        draft.openErrorOverlay = true
        break

      case "closeOverlay":
        draft.errorMessage = ""
        draft.openSucessOverlay = false
        draft.openErrorOverlay = false
        break

      case "handleSubmit":
        draft.hasSubmitErrors = true
        if (draft.username.hasErrors || draft.email.hasError || draft.firstName.hasErrors || draft.lastName.hasErrors || draft.password.hasErrors) {
          draft.isLoading = false
          // alert("There is an error somewhere...")
          console.log("sorry")
          draft.hasSubmitErrors = true
          console.log(draft.hasSubmitErrors)
        } else {
          draft.hasSubmitErrors = false
          if (!draft.hasSubmitErrors) {
            Axios.post(appState.backendURL + "/instructor/signup", {
              username: draft.username.value,
              email: draft.email.value,
              firstName: draft.firstName.value,
              lastName: draft.lastName.value,
              password: draft.password.value,
            })
              .then(response => {
                console.log(response.data)
                if (response.data == "Something went wrong") {
                  dispatch({ type: "finishLoading" })
                  dispatch({ type: "openErrorOverlay", message: "Sorry, there is a problem! Make sure you select a unique username and email" })
                } else if (response.data == "success") {
                  dispatch({ type: "finishLoading" })
                  dispatch({ type: "openSuccessOverlay" })
                  dispatch({ type: "clearFields" })
                }
              })
              .catch(err => {
                if (err.response) {
                  dispatch({ type: "finishLoading" })
                  dispatch({ type: "openErrorOverlay", message: "Sorry, the server response an error" })
                } else if (err.message) {
                  dispatch({ type: "finishLoading" })
                  dispatch({ type: "openErrorOverlay", message: "Sorry there is a network error" })
                } else {
                  dispatch({ type: "finishLoading" })
                  dispatch({ type: "openErrorOverlay", message: "Sorry, there was an error making the request, kindly check your network settings" })
                }
              })
          } else {
            draft.isLoading = false
            alert("Something went wrong")
            console.log(state)
          }
          console.log(draft.hasSubmitErrors)
        }
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  // runs once everytime the page loads
  useEffect(() => {
    username.current.focus()
  }, [])

  // watching for changes in the username field and calling after delay function
  useEffect(() => {
    const delay = setTimeout(() => {
      if (state.username.value != "") {
        dispatch({ type: "usernameAfterDelay" })
        Axios.post(appState.backendURL + "/instructor/doesUsernameExist", { username: state.username.value })
          .then(response => {
            if (response.data) dispatch({ type: "usernameExist" })
          })
          .catch(err => {
            if (err.message) {
              dispatch({ type: "openErrorOverlay", message: "Something went wrong, Please try again later" })
              console.log(err.message)
            } else {
              dispatch({ type: "openErrorOverlay", message: "Something went wrong, Please try again later" })
              console.log("The request could not be made")
            }
          })
      }
    }, 800)
    return () => clearTimeout(delay)
  }, [state.username.value])

  // watching for changes in the email field and calling after delay
  useEffect(() => {
    const delay = setTimeout(() => {
      if (state.email.value != "") {
        dispatch({ type: "emailAfterDelay" })
        Axios.post(appState.backendURL + "/instructor/doesEmailnameExist", { email: state.email.value })
          .then(response => {
            dispatch({ type: "emailExist" })
          })
          .catch(err => {
            if (err.message) {
              dispatch({ type: "openErrorOverlay", message: "Something went wrong, Please try again later" })
              console.log(err.message)
            } else {
              dispatch({ type: "openErrorOverlay", message: "Something went wrong, Please try again later" })
              console.log("The request could not be made")
            }
          })
      }
    }, 800)
    return () => clearTimeout(delay)
  }, [state.email.value])

  function handleFocus(e) {
    e.target.style.border = "1px solid blue"
  }

  function handleBlur(e, field) {
    switch (field) {
      case "username":
        !state.username.hasErrors && e.target.value != "" ? (e.target.style.border = "1px solid #4CAF50") : state.username.hasErrors ? (e.target.style.border = "1px solid red") : (e.target.style.border = "")
        break
      case "email":
        !state.email.hasErrors && e.target.value != "" ? (e.target.style.border = "1px solid #4CAF50") : state.email.hasErrors ? (e.target.style.border = "1px solid red") : (e.target.style.border = "")
        break
      case "firstName":
        !state.firstName.hasErrors && e.target.value != "" ? (e.target.style.border = "1px solid #4CAF50") : state.firstName.hasErrors ? (e.target.style.border = "1px solid red") : (e.target.style.border = "")
        break
      case "lastName":
        !state.lastName.hasErrors && e.target.value != "" ? (e.target.style.border = "1px solid #4CAF50") : state.lastName.hasErrors ? (e.target.style.border = "1px solid red") : (e.target.style.border = "")
        break
      case "password":
        !state.password.hasErrors && e.target.value != "" ? (e.target.style.border = "1px solid #4CAF50") : state.password.hasErrors ? (e.target.style.border = "1px solid red") : (e.target.style.border = "")
        break
    }
  }

  function closeOverlay() {
    dispatch({ type: "finishLoadin" })
    dispatch({ type: "closeOverlay" })
  }

  return (
    <>
      {/* <NavigationMenus /> */}
      <CSSTransition in={state.openSucessOverlay} timeout={300} classNames={"openOver"} unmountOnExit>
        <div className="Overlay-container">
          <div className="Overlay-inner">
            <i style={{ display: "block" }} className="fa-solid fa-xmark close-modal" onClick={closeOverlay}></i>
            <div className="alert-container">
              <div className="alert-head">
                <div className="svg-cont">
                  <i class="fa-solid fa-check"></i>
                </div>
                <h1>Success</h1>
                <p>Your account has been created successfully</p>
                <Link style={{ background: "#6c63ff" }} to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={state.openErrorOverlay} timeout={300} classNames={"openOver"} unmountOnExit>
        <div className="Overlay-container">
          <div className="Overlay-inner">
            <i style={{ display: "block" }} className="fa-solid fa-xmark close-modal" onClick={closeOverlay}></i>
            <div className="alert-container">
              <div className="alert-head">
                <div className="svg-cont svg-cont-1">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h1>Oooops!</h1>
                <p>{state.errorMessage}</p>
                <a onClick={closeOverlay} style={{ background: "#fc4a1a" }} href="#">
                  Try Again
                </a>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
      <NavigationMenus />

      <div className="signup-instructor-container" style={appState.isDarkModeOn ? { background: "#1b1b1b" } : {}}>
        <div className="signup-instructor-container-inner">
          <div className="signup-instructor-sidebar1">
            <h2>New Here?</h2>
            <p className="text-font">Register your account with us with a few clicks and get the most out of easylearn</p>
            <hr />
            <h2>Student's Account</h2>
            <p className="text-font">You can use your easylearn account to enroll in our free course and track your progress. You can take quiz, exercises and also write exams</p>
            <hr />
            <h2>Instructor's Account</h2>
            <p className="text-font">You can use your easylearn account to create a course and an article. You can also do lots</p>
          </div>
          <div className="signup-instructor-sidebar2" style={appState.isDarkModeOn ? { background: "rgb(46, 50, 51)", border: "1px solid #000", boxShadow: "none" } : {}}>
            <div className="signup-instructor-sidebar2-header">
              <h2 style={appState.isDarkModeOn ? { color: "#fff" } : {}}>Get Started</h2>
              <p style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Create an account for free. It only takes a few steps</p>
            </div>
            <form
              className="Form-container"
              onSubmit={async e => {
                e.preventDefault()
                dispatch({ type: "loading" })
                dispatch({ type: "usernameImmediately", value: state.username.value })
                dispatch({ type: "usenameAfterDelay" })
                dispatch({ type: "emailImmediately", value: state.email.value })
                dispatch({ type: "emailAfterDelay" })
                dispatch({ type: "firstNameImmediately", value: state.firstName.value })
                dispatch({ type: "lastNameImmediately", value: state.lastName.value })
                dispatch({ type: "passwordImmediately", value: state.password.value })
                dispatch({ type: "handleSubmit" })
              }}
              method="POST"
            >
              <div className="g-signin2" data-onsuccess="onSignIn"></div>
              <label htmlFor="username">
                <CSSTransition in={state.username.hasErrors} timeout={300} classNames="error-message" unmountOnExit>
                  <p style={appState.isDarkModeOn ? { color: "#ccc" } : {}} className="error-signup">
                    {state.username.message}
                    <i style={appState.isDarkModeOn ? { color: "yellow" } : {}} className="fa-solid fa-triangle-exclamation"></i>
                  </p>
                </CSSTransition>
                {/* username input */}
                <input
                  ref={username}
                  style={{ border: state.username.hasErrors ? "1px solid #dc3545" : {} }}
                  onBlur={e => handleBlur(e, "username")}
                  onFocus={handleFocus}
                  onChange={e => {
                    handleBlur(e, "username")
                    dispatch({ type: "usernameImmediately", value: e.target.value })
                  }}
                  className="main-input"
                  type="text"
                  name="username"
                  autoComplete="off"
                  placeholder="Username"
                />
                <div className="error-signup"></div>
              </label>

              <label htmlFor="email">
                <CSSTransition in={state.email.hasErrors} timeout={300} classNames="error-message" unmountOnExit>
                  <p className="error-signup">
                    {state.email.message}
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </p>
                </CSSTransition>
                {/* email input */}
                <input
                  style={{ border: state.email.hasErrors ? "1px solid #dc3545" : {} }}
                  onBlur={e => handleBlur(e, "email")}
                  onFocus={handleFocus}
                  onChange={e => {
                    handleBlur(e, "email")
                    dispatch({ type: "emailImmediately", value: e.target.value })
                  }}
                  type="email"
                  name="email"
                  className="main-input email"
                  autoComplete="off"
                  placeholder="Email"
                />
                <div className="error-signup"></div>
              </label>

              <label htmlFor="firstname">
                <CSSTransition in={state.firstName.hasErrors} timeout={300} classNames="error-message" unmountOnExit>
                  <p className="error-signup">
                    {state.firstName.message}
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </p>
                </CSSTransition>

                {/* fistname input */}
                <input
                  style={{ border: state.firstName.hasErrors ? "1px solid #dc3545" : {} }}
                  onBlur={e => handleBlur(e, "firstName")}
                  onFocus={handleFocus}
                  onChange={e => {
                    handleBlur(e, "firstName")
                    dispatch({ type: "firstNameImmediately", value: e.target.value })
                  }}
                  type="text"
                  name="firstname"
                  className="main-input firstName"
                  autoComplete="off"
                  placeholder="First Name"
                />
                <div className="error-signup"></div>
              </label>

              <label htmlFor="lastname">
                <CSSTransition in={state.lastName.hasErrors} timeout={300} classNames="error-message" unmountOnExit>
                  <p className="error-signup">
                    {state.lastName.message}
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </p>
                </CSSTransition>
                {/* lastname input */}
                <input
                  style={{ border: state.lastName.hasErrors ? "1px solid #dc3545" : {} }}
                  onBlur={e => handleBlur(e, "lastName")}
                  onFocus={handleFocus}
                  onChange={e => {
                    handleBlur(e, "lastName")
                    dispatch({ type: "lastNameImmediately", value: e.target.value })
                  }}
                  type="text"
                  name="lastname"
                  className="main-input lastName"
                  autoComplete="off"
                  placeholder="Last Name"
                />
                <div className="error-signup"></div>
              </label>

              <label htmlFor="password">
                <CSSTransition in={state.password.hasErrors} timeout={300} classNames="error-message" unmountOnExit>
                  <p className="error-signup">
                    {state.password.message}
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </p>
                </CSSTransition>
                {/* password input */}
                <input
                  style={{ border: state.password.hasErrors ? "1px solid #dc3545" : {} }}
                  onBlur={e => handleBlur(e, "password")}
                  onFocus={handleFocus}
                  onChange={e => {
                    handleBlur(e, "password")
                    dispatch({ type: "passwordImmediately", value: e.target.value })
                  }}
                  className="main-input"
                  type="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Password"
                />
                <div className="error-signup"></div>
              </label>

              <button className="form-button button-style">
                <div className="form-btn-text">{state.isLoading ? <div className="loading-signup"></div> : <p>CREATE AN ACCOUNT</p>}</div>
              </button>
            </form>

            <p style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}} className="signup-instructor-haveAccount">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
