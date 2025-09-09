import React, { useContext, useEffect, useRef, useState } from "react"
import Axios from "axios"
import { useImmer } from "use-immer"
import Loading from "./Loading"
import StateContext from "../StateContext"

function TopicsYouMayLike() {
  const appState = useContext(StateContext)
  const forward = useRef(null)
  const backward = useRef(null)
  const sliderContainer = useRef(null)

  const [state, setState] = useImmer({
    courses: [],
    slideCount: 1,
    screenWidth: 0,
    boxWidth: 0,
    sliderContainer: null,
    shiftLength: 0,
    initialShift: 0,
    numberOfSlides: 0,
  })

  // runs when the courses are fetch from the server and are ready for rendering
  // and when the slidecount state, or the state changes

  useEffect(() => {
    initializer().then(() => {
      let intervalId = setInterval(() => {
        if (state.sliderContainer != null) {
          scroll()
        }
      }, 5000)
      return () => clearInterval(intervalId)
    })
  }, [state.courses, state.slideCount, state.sliderContainer])

  useEffect(() => {
    forward.current.addEventListener("click", addBorder)
    backward.current.addEventListener("click", addBorder)
  }, [state.slideCount])

  // fetching the courses from db
  useEffect(() => {
    async function fetch() {
      Axios.get("http://192.168.31.77:8000")
        .then(response => {
          setState(draft => {
            draft.courses = response.data
          })
        })
        .catch(err => {
          if (err.response) {
            alert("Sorry the server response an error")
            console.log(err.response.data)
          } else if (err.message == "Network Error") {
            alert("Sorry, There is an error, kindly check your network")
            console.log(err.message)
          } else {
            alert("Sorry, there was an error making the request, kindly check your intenet connection")
            console.log(error.message)
          }
        })
    }
    fetch()
  }, [])

  function addBorder() {
    if (this.parentElement.classList.contains("rec-forward")) {
      backward.current.classList.remove("nav-border")
      this.classList.add("nav-border")
    } else {
      forward.current.classList.remove("nav-border")
      this.classList.add("nav-border")
    }
  }

  function initializer() {
    return new Promise((resolve, reject) => {
      if (state.courses.length) {
        setState(draft => {
          draft.sliderContainer = sliderContainer.current
          draft.sliderWidth = sliderContainer.current.offsetWidth
          draft.screenWidth = window.screen.availWidth
          draft.numberOfSlides = draft.courses.length
          draft.shiftLength = draft.sliderWidth / draft.numberOfSlides
          draft.initialShift = draft.sliderWidth / draft.numberOfSlides
        })
      }
      resolve()
    })
  }

  function scroll() {
    setState(draft => {
      if (draft.shiftLength < draft.screenWidth) {
        draft.sliderContainer.style.right = draft.shiftLength + "px"
        draft.shiftLength += state.shiftLength
      } else {
        draft.shiftLength = draft.initialShift
      }
    })
  }

  function scrollForward() {
    setState(draft => {
      draft.sliderContainer.style.right = draft.shiftLength + "px"
      draft.shiftLength += state.shiftLength
    })
  }

  function scrollBackward() {
    // to be implemented later
  }

  return (
    <div className="rec-topics-container">
      <div className="rec-forward">
        <i className="fas fa-chevron-right" ref={forward} style={appState.isDarkModeOn ? { color: "#fff" } : {}}></i>
      </div>
      <div className="rec-backward">
        <i className="fas fa-chevron-left" ref={backward} style={appState.isDarkModeOn ? { color: "#fff" } : {}}></i>
      </div>
      <div className="rec-topics-inner">
        <div className="rec-topics-head">
          <h2 className="heading-font" style={appState.isDarkModeOn ? { color: "#fff" } : {}}>
            Courses You may like
          </h2>
        </div>

        <div className="rec-topics-flex" ref={sliderContainer}>
          <div className="rec-topics-sidebar1">
            {state.courses.length ? (
              <>
                {state.courses.map(item => (
                  <div class="rec-box text-font" style={appState.isDarkModeOn ? { border: "1px solid rgba(248, 249, 250, 0.05)", background: "rgb(29, 38, 48)" } : {}}>
                    <a href="#">
                      {/* <div class="rec-box-top" style={{ backgroundImage: `url(${item.pic})` }}>
                        <img src={`${item.pic}`} />
                      </div> */}
                      <div class="rec-box-bottom">
                        <div class="rec-box-title">
                          <h1 style={appState.isDarkModeOn ? { color: "#fff" } : {}}>{item.name}</h1>
                        </div>

                        <div class="rec-box-message">
                          <p style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>An Introduction to computer course itself, all you need to know about a computer system</p>
                        </div>

                        <div class="rec-box-author text-font">
                          <h2 style={appState.isDarkModeOn ? { color: "#fff" } : {}}>Author</h2>
                          <p style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Inuwa Muhammad</p>
                          <p style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>University of Jos</p>
                        </div>

                        <div className="rec-box-last">
                          <div className="rec-last-sidebar1">
                            <i class="fa-solid fa-graduation-cap"></i>
                            <p>213</p>
                          </div>
                          <div className="rec-last-sidebar2">
                            <i class="fa-regular fa-calendar"></i>
                            <p>12 Dec, 2023</p>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="rec-box-top-overlay">
                      <div class="free">
                        <p>free</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="loading-container">
                <Loading />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopicsYouMayLike
