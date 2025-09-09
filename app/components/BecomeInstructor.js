import React from "react"

function BecomeInstructor() {
  return (
    <div class="instructor-container">
      <div class="instructor-container-inner">
        <div class="instructor-illustrator">
          <div>
            <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1692447148/10276838_4380747-removebg-preview_olxibn.png" alt="Illustration" />
          </div>
        </div>

        <div class="illustrator-sidebar">
          <div class="welcome-sidebar1">
            <div class="welcome-m-h1">
              <h1>Are You an Instructor?</h1>
            </div>

            <div class="welcome-m-p">
              <p>Sign Up for our instructor page and start teaching our more than 100,000 users. Totam omnis distinctio ab porro voluptas magni impedit. Ad quod perferendis saepe eveniet ipsum quibusdam consequuntur, eligendi id nam temporibus esse mollitia.</p>
            </div>

            <div class="welcome-m-button">
              <a href="/instructor/signup">
                <button>Sign Up</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BecomeInstructor
