import React, { useContext } from "react"
import StateContext from "../StateContext"

function Welcome() {
  const appState = useContext(StateContext)
  return (
    <>
      <div className="welcome-m-container">
        <div className="welcome-sidebar1">
          <div className="welcome-m-h1">
            <h1 style={appState.isDarkModeOn ? { color: "#fff" } : {}}>
              Learn, Enjoy and keep going <span style={{ color: "rgb(212, 78, 0)" }}></span>
            </h1>
          </div>

          <div className="welcome-m-p text-font">
            <p style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Dive in and learn the course of your choice. Your hard work and dedication can change your life in a blink of an eye. Ad quod perferendis saepe eveniet ipsum quibusdam consequuntur, eligendi id nam temporibus esse mollitia.</p>
          </div>
        </div>

        <div className="welcome-sidebar2">
          <div className="welcome-m-img">{appState.isDarkModeOn ? <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1693167618/Untitled_1_ef9t4m.svg" /> : <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1667068110/education8_mjsqtm.svg" alt="IMG" />}</div>
        </div>
      </div>
    </>
  )
}

export default Welcome
