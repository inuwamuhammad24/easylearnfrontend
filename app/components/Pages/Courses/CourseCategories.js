import React from "react"

function CourseCategories() {
  return (
    <div className="category-cont">
      <div className="category-head">
        <h1 className="heading-font">Browse by Category</h1>
      </div>
      <div className="category-flex-container">
        <div className="category-flex-box shadow rounded-md">
          <a href="#">
            <div className="category-icon-cont">
              <i class="fa-solid fa-computer"></i>
            </div>
            <div className="category-icon-label">
              <h4 className="heading-font">Web Design</h4>
            </div>
            <div className="category-text">
              <p className="text-font">
                25 Courses<i class="fa-solid fa-arrow-right"></i>
              </p>
            </div>
          </a>
        </div>
        <div className="category-flex-box shadow rounded-md">
          <a href="#">
            <div className="category-icon-cont">
              <i class="fa-solid fa-computer"></i>
            </div>
            <div className="category-icon-label">
              <h4 className="heading-font">Web Design</h4>
            </div>
            <div className="category-text">
              <p className="text-font">
                25 Courses<i class="fa-solid fa-arrow-right"></i>
              </p>
            </div>
          </a>
        </div>
        <div className="category-flex-box shadow rounded-md">
          <a href="#">
            <div className="category-icon-cont">
              <i class="fa-solid fa-code"></i>
            </div>
            <div className="category-icon-label">
              <h4 className="heading-font">Development</h4>
            </div>
            <div className="category-text">
              <p className="text-font">
                25 Courses<i class="fa-solid fa-arrow-right"></i>
              </p>
            </div>
          </a>
        </div>
        <div className="category-flex-box shadow rounded-md">
          <a href="#">
            <div className="category-icon-cont">
              <i class="fa-solid fa-computer"></i>
            </div>
            <div className="category-icon-label">
              <h4 className="heading-font">Web Design</h4>
            </div>
            <div className="category-text">
              <p className="text-font">
                More...<i class="fa-solid fa-arrow-right z-2 bg-[#f1f1f1]"></i>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CourseCategories
