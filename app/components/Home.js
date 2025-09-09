import React from "react"
import Welcome from "./Welcome"
import NavigationMenus from "./NavigationMenus"
import TopicsYouMayLike from "./TopicsYouMayLike"
import BecomeInstructor from "./BecomeInstructor"
import SearchOverlay from "./SearchOverlay"
import CourseCategories from "./courses/CourseCategories"

function Home() {
  return (
    <>
      <NavigationMenus />
      <SearchOverlay />
      <Welcome />
      <TopicsYouMayLike />
      <CourseCategories />
      <BecomeInstructor />
    </>
  )
}

export default Home
