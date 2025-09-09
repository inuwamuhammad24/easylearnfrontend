import React from "react"

function instructorHome() {
  return (
    <>
      <div className="instructor-container">
        <div className="instructor-container-inner">
          <div className="instructor-illustrator">
            <div>
              <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1707515519/Mediamodifier-Design_eow4ov.svg" alt="Illustration" />
            </div>
          </div>

          <div className="illustrator-sidebar">
            <div className="welcome-sidebar1">
              <div className="welcome-m-h1">
                <h1>Are You an Instructor?</h1>
              </div>

              <div className="welcome-m-p">
                <p>Sign Up for our instructor page and start teaching our more than 100,000 users. Totam omnis distinctio ab porro voluptas magni impedit. Ad quod perferendis saepe eveniet ipsum quibusdam consequuntur, eligendi id nam temporibus esse mollitia.</p>
              </div>

              <div className="welcome-m-button">
                <a href="/instructor/signup">
                  <button>Sign Up</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default instructorHome
