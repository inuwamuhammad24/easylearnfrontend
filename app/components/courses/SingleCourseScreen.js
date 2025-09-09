import React from "react"
import NavigationMenus from "../NavigationMenus"
import { Link } from "react-router-dom"

function SingleCourseScreen() {
  return (
    <>
      <NavigationMenus />
      <div className="course-page-container">
        <div className="course-deco-container">
          <div className="course-deco-overlay"></div>
          <div className="deco-text-container">
            <h1>COMPUTER SCIENCE</h1>
            <p className="text-font">Home / Computer Science</p>
          </div>
        </div>
        <div className="course-page-container-inner course-page-container-inner-single">
          <div className="mobile-enroll">
            <Link to="/course/test/id">
              <button className="button-style">Enroll for Free</button>
            </Link>
          </div>
          <div className="single-page-container">
            <div className="single-page-sidebar1">
              <div className="single-page-sidebar1-img-container">
                <img src="https://images.pexels.com/photos/933964/pexels-photo-933964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="courser img" />
              </div>
              <div className="what-youll-learn-container">
                <div className="what-youll-learn-inner">
                  <div className="rating-cont">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <p>(4.7)</p>
                  </div>
                  <div className="course-name" style={{ paddingLeft: "0" }}>
                    <h2 className="heading-font">Web Development: Full Stack JavaScript from Scratch</h2>
                  </div>
                  <div className="small-class-description">
                    <div className="date-created">
                      <i class="fa-solid fa-user"></i>
                      <p>Students 300+</p>
                    </div>
                    <div className="date-created">
                      <i class="fa-solid fa-calendar"></i>
                      <p>Created on 28 Jan, 2022</p>
                    </div>
                    <div className="date-created">
                      <i class="fa-solid fa-globe"></i>
                      <p>English</p>
                    </div>
                  </div>
                </div>
                <div className="text-course-description-cont">
                  <div className="text-course-description-head">
                    <h2 className="heading-font">Course Description</h2>
                    <p className="text-font">Welcome to the 100 Days of Code - The Complete Python Pro Bootcamp, the only course you need to learn to code with Python. With over 500,000 5 STAR reviews and a 4.8 average, my courses are some of the HIGHEST RATED courses in the history of Udemy! 100 days, 1 hour per day, learn to build 1 project per day, this is how you master Python. At 60+ hours, this Python course is without a doubt the most comprehensive Python course available anywhere online. Even if you have zero programming experience, this course will take you from beginner to professional. Here's why:</p>
                  </div>
                </div>
                <div className="text-course-description-cont">
                  <div className="text-course-description-head">
                    <h2 className="heading-font">What you'll learn</h2>
                    <p className="text-font">You will master the Python programming language by building 100 unique projects over 100 days. You will be able to program in Python professionally. You will learn automation, game, app and web development, data science and machine learning all using Python.</p>
                    <p class="text-font">You will learn Selenium, Beautiful Soup, Request, Flask, Pandas, NumPy, Scikit Learn, Plotly, and Matplotlib. Be able to use Python for data science and machine learning. Build games like Blackjack, Pong and Snake using Python</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="single-page-sidebar2">
              <div className="side-course-name">
                <h2>Chemistry for Secondary and University Students</h2>
              </div>
              <div className="course-description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis accusantium deserunt tenetur aliquid ratione cum culpa iste, repellat eius qui?</p>
              </div>
              <div className="created-by">
                <p>
                  Created by{" "}
                  <span>
                    <a href="#">S.Q Abdullahi</a>
                  </span>
                </p>
              </div>
              <div className="date-created">
                <i className="fa-solid fa-calendar"></i>
                <p>Date Created 23/12/2022</p>
              </div>
              <div className="date-created">
                <i className="fa-solid fa-globe"></i>
                <p>English</p>
              </div>
              <div className="date-created">
                <i className="fa-solid fa-users"></i>
                <p>209,111 Students</p>
              </div>
              <div className="start-course">
                <Link className="button-style" to="/course/test/id">
                  Enroll for Free
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="single-course-related-container">
            <div className="single-course-related-inner">
              <div className="related-container">
                <div className="course-inner">
                  <Link to="/course/test">
                    <div className="course-box">
                      <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1667768764/pexels-josh-sorenson-1714208_tz2hhu.jpg" alt="courser img" />
                      <div className="course-name">
                        <h2>Learn JavaScript: Become a Full Stack developer</h2>
                      </div>
                      <div className="course-author">
                        <p>Inuwa Muhammad</p>
                      </div>
                      <div className="course-price">
                        <p>&#8358;1400.00</p>
                      </div>
                      <div className="course-button">
                        <button>Start Course</button>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default SingleCourseScreen
