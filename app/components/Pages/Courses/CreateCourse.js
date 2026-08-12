import React from "react"

import NavigationMenus from "../../NavigationMenus"
import EditorConfig from "../../EditorConfig"

function CreateCourse() {
  function handleSubmit(e) {
    e.preventDefault()
    const editorContent = tinymce.activeEditor.getContent()
    console.log(editorContent)
  }

  return (
    <>
      <NavigationMenus />
      <div class="create-topic-container">
        <h1 className="heading-font">Create a topic</h1>
        <div className="topics-flex-container">
          <div class="create-topic-grid">
            <div>
              <label for="title">Title*</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="e.g Mathematics"
              />
            </div>

            <div class="new-course-container">
              <div>
                <label for="courses">Select a Course*</label>
                <select name="course" id="courses">
                  <option value="select_a_course">Select a course</option>
                  <option value="obb234b55b6b33b21b">Mathematics</option>
                  <option value="obb234b55b6b33b21b">English Languaage</option>
                  <option value="obb234b55b6b33b21b">Chemistry</option>
                  <option value="obb234b55b6b33b21b">Physics</option>
                  <option value="obb234b55b6b33b21b">Computer Science</option>
                  <option value="obb234b55b6b33b21b">Biology</option>
                </select>
              </div>
            </div>

            <div class="new-course-container">
              <div>
                <label for="topics">Select a topic*</label>
                <select name="topics" id="topics"></select>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} method="post">
            {/* <textarea id="mytextarea" placeholder="type your content here." name="textarea"></textarea> */}
            <EditorConfig />
            <button class="create-topic-btn">Submit Topic</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateCourse
