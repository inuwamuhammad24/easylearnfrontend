import React, { useContext, useRef } from "react"
import NavigationMenus from "../NavigationMenus"
import { Link } from "react-router-dom"
import StateContext from "../../StateContext"

function CoursesHome() {
  const appState = useContext(StateContext)
  const forward = useRef(null)
  const backward = useRef(null)
  return (
    <>
      <NavigationMenus />
      <div className="course-page-container w-full h-full overflow-clip mt-0 mb-0 mr-auto ml-0">
        {/* category scroll bar */}
        <div className={appState.isDarkModeOn ? "category-scroll-container background-dark" : "category-scroll-container"}>
          <div className="category-scroll-container-inner">
            <div className="category-container">
              <a href="/courses/#" style={appState.isDarkModeOn ? { border: "1px solid #000" } : {}}>
                Computer
              </a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Physics</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Javascript</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Mathematics</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Chemistry</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Python</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Programming</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Geography</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Electronics</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Video Editing</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Computer</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Physics</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Javascript</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Mathematics</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Chemistry</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Python</a>
            </div>
            <div className="category-container">
              <a href="/courses/#">Programming</a>
            </div>{" "}
            <div className="category-container">
              <a href="/courses/#">Geography</a>
            </div>{" "}
            <div className="category-container">
              <a href="/courses/#">Electronics</a>
            </div>{" "}
            <div className="category-container">
              <a href="/courses/#">Video Editing</a>
            </div>
            <div className="forward" style={appState.isDarkModeOn ? { background: "#1b1b1b" } : {}}>
              <i className="fas fa-chevron-right" ref={forward} style={appState.isDarkModeOn ? { color: "#fff" } : {}}></i>
            </div>
            <div className="backward" style={appState.isDarkModeOn ? { background: "#1b1b1b" } : {}}>
              <i className="fas fa-chevron-left" ref={backward} style={appState.isDarkModeOn ? { color: "#fff" } : {}}></i>
            </div>
          </div>
        </div>
        <div className="course-page-container-inner">
          <div className="courses-wrapper">
            <div className="course-heading">
              <h4 className="heading-font">The most Populous Courses</h4>
            </div>
            <div className="course">
              <div className="course-inner">
                <Link to="/course/test">
                  <div className="course-box">
                    <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1621103592/chemistry_nbcqbk.jpg" alt="courser img" />
                    <div className="course-name">
                      <h2>Chemistry for Secondary School and University</h2>
                    </div>
                    <div className="course-author">
                      <p>S.M Habibullah</p>
                    </div>
                    <div className="course-price">
                      <p>&#8358;2500.00</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="course-inner">
                <Link to="/course/test">
                  <div className="course-box">
                    <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1667768764/pexels-josh-sorenson-1714208_tz2hhu.jpg" alt="courser img" />
                    <div className="course-name">
                      <h2>Learn JavaScript: Become a Full Stack Developer</h2>
                    </div>
                    <div className="course-author">
                      <p>Inuwa Muhammad</p>
                    </div>
                    <div className="course-price">
                      <p>&#8358;1400.00</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="course-inner">
                <Link to="/course/test">
                  <div className="course-box">
                    <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1609528305/samples/people/smiling-man.jpg" alt="courser img" />
                    <div className="course-name">
                      <h2>Math: Understanding Mathematics </h2>
                    </div>
                    <div className="course-author">
                      <p>Ahmad Ismail</p>
                    </div>
                    <div className="course-price">
                      <p>Free</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="course-inner">
                <Link to="/course/test">
                  <div className="course-box">
                    <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1621103593/img1_etecqq.jpg" alt="courser img" />
                    <div className="course-name">
                      <h2>Practical Biology: Anatomy of a Plant</h2>
                    </div>
                    <div className="course-author">
                      <p>Sadeeq S.Q</p>
                    </div>
                    <div className="course-price">
                      <p>&#8358;1000.00</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="course-page-container-inner">
          <div className="courses-wrapper">
            <div className="course-heading">
              <h4 className="heading-font">Featured Courses</h4>
            </div>
            <div className="course">
              <div className="course-inner">
                <Link to="/course/test">
                  <div className="course-box">
                    <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1709672315/campus_zh20p7.jpg" alt="courser img" />
                    <div className="course-name">
                      <h2>Introduction to Computer Science</h2>
                    </div>
                    <div className="course-author">
                      <p>S.Q Jan Wuya</p>
                    </div>
                    <div className="course-price">
                      <p>&#8358;Free</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="course-inner">
                <Link to="/course/test">
                  <div className="course-box">
                    <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1609528311/samples/imagecon-group.jpg" alt="courser img" />
                    <div className="course-name">
                      <h2>The Business Intelligent analyst</h2>
                    </div>
                    <div className="course-author">
                      <p>Inuwa Muhammad</p>
                    </div>
                    <div className="course-price">
                      <p>&#8358;1400.00</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="course-inner">
                <Link to="/course/test">
                  <div className="course-box">
                    <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1609528303/samples/people/kitchen-bar.jpg" alt="courser img" />
                    <div className="course-name">
                      <h2>Organic Online Marketing and SEO </h2>
                    </div>
                    <div className="course-author">
                      <p>Ahmad Ismail</p>
                    </div>
                    <div className="course-price">
                      <p>Free</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="course-inner">
                <Link to="/course/test">
                  <div className="course-box">
                    <img src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="courser img" />
                    <div className="course-name">
                      <h2>Digital Marketing Master Class</h2>
                    </div>
                    <div className="course-author">
                      <p>Sadeeq S.Q</p>
                    </div>
                    <div className="course-price">
                      <p>&#8358;1000.00</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CoursesHome
