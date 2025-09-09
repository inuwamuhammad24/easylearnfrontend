import { isDraft } from "immer"
import React, { useContext, useEffect } from "react"
import { useImmer } from "use-immer"
import NavigationMenus from "../NavigationMenus"
import StateContext from "../../StateContext"

function CourseContent() {
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    isSideBarOpen: true,
    sideBarScrollHeight: 0,
  })

  function handleScroll() {
    const win = window.onscroll(() => {
      console.log("hey")
    })
  }

  return (
    <>
      <NavigationMenus />
      <div className={appState.isDarkModeOn ? "topics-container background-dark" : "topics-container"} onScroll={handleScroll}>
        <div className="mobile-content">
          <i className="fas fa-chevron-right" arial-hidden="true"></i>
        </div>
        <div className="topics-container-inner">
          <div className="placeholder"></div>
          <div className="topics-sidebar1 sidebar">
            <div className={appState.isDarkModeOn ? "topics-sidebar1-head .sidebar-head-dark-text" : "topics-sidebar1-head .sidebar-head-dark-text"}>
              <h1>Chemistry</h1>
            </div>

            <div className="topics-contents-container">
              <div className="topics-title">
                {/* <div>
                        <ul>
                           <% relatedTitles.forEach(title => { %>
                                <a href="/course/<%= title._id %>">
                                    <% if (title.title == content.title) { %>
                                        <li style="background: #f2f2f2;color: black;border-left: 3px solid;"><%- title.title %></li>
                                    <% } else { %>
                                        <li><%- title.title %></li>
                                    <% } %>
                                </a>
                           <% }) %>
                        </ul>
                    </div> */}

                <div>
                  <ul style={appState.isDarkModeOn ? { borderLeft: "2px solid #000" } : {}}>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>State of Matter</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Equilibrum contant</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Atomicity</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Nuclear Chemistry</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Quantum Numbers</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Change of State</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Thermodynamics</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Principles of Chemistry</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Equilibrum constant</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Change of state</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>State of Matter</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>State of Matter</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>State of Matter</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>State of Matter</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>State of Matter</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>State of Matter</li>
                    </a>
                    <a href="/course/#">
                      <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>State of Matter</li>
                    </a>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="topics-sidebar2">
            {/* <p className="navigator">
              {" "}
              <a href="#">Courses</a>{" "}
              <span>
                <i className="fas fa-angle-double-right"></i>
              </span>{" "}
              <a href="#">Computer</a>{" "}
              <span>
                <i className="fas fa-angle-double-right"></i>
              </span>{" "}
              <a href="">Introduction </a>{" "}
              <span>
                <i className="fas fa-angle-double-right"></i>
              </span>{" "}
              Physics <span></span>
            </p> */}

            <div className="topics-unit">
              <h1 className={appState.isDarkModeOn ? "h1-text-dark-mode" : "h1-text-light-mode"}>All About Matter</h1>
            </div>

            <div className="topics-unit-content">
              <div className="small-info">
                <div className="small-info-pic">
                  <img src="https://res.cloudinary.com/dlbtbf6vy/image/upload/v1667678261/profile_ljoabg.jpg" alt="Author" />
                </div>
                <div>
                  <div>
                    <p>
                      <span>Author:</span> <a href="#">Inuwa Muhammad</a>
                    </p>
                  </div>
                  <div>
                    <p>
                      {" "}
                      <span>Last updated: </span> 11/12/22
                    </p>
                  </div>
                </div>
              </div>
              <div className={appState.isDarkModeOn ? "topics-sidebar2-inner p-text-dark-mode" : "topics-sidebar2-inner"}>
                <p style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Matter is a substance made up of various types of particles that occupies physical space and has inertia. According to the principles of modern physics, the various types of particles each have a specific mass and size. The most familiar examples of material particles are the electron, the proton and the neutron.</p>
                <p style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Fundamentally, matter is composed of elementary particles called quarks and leptons, both of which are considered elementary particles in that they aren't made up of smaller units of matter. Quarks -- groups of subatomic particles that interact by means of a strong force -- combine into protons and neutrons. Leptons -- groups of subatomic particles that respond to weaker forces -- belong to a className of elementary particles that includes electrons.</p>
                <p style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Atoms are the building blocks of matter. A combination of atoms forms a molecule. Large groups of atoms and molecules form the bulk matter of day-to-day life in the physical world. There are more than 100 different kinds of atoms listed in the periodic table, with each kind constituting a unique chemical element.</p>
                <p style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Atoms and/or molecules in two or more elements can join together to form a compound. This compound, which is the basis of matter, may not resemble any of the original ingredients.</p>
                <p style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>For example, sodium and chlorine, two highly poisonous elements that are unstable at room temperatures, combine to form one of the most common and harmless compounds known to man called common salt (sodium chloride, or NaCl). Unlike its constituent elements, salt is highly stable, harmless to humans and even edible.</p>
                <p style={appState.isDarkModeOn ? { color: "#f1f1f1" } : {}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, consequuntur!</p>

                <img src="https://nigerianscholars.com/assets/uploads/2018/02/River_valley_umair_mohsin_flickr.jpg" alt="img" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut fugiat eum quidem cum at distinctio provident quibusdam aliquid laudantium, excepturi, natus nobis doloremque debitis nihil quos impedit. Nulla, itaque aspernatur.</p>
                <iframe width="100%" src="https://www.youtube.com/embed/KCL8zqjXbME" title="States of Matter" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis quisquam laudantium quos nihil ratione? Doloremque necessitatibus aut, earum, illo in, ab nemo rem reprehenderit omnis ex possimus quod saepe consequatur placeat! Assumenda recusandae voluptatum hic perspiciatis sapiente. Delectus reiciendis assumenda natus impedit, exercitationem similique. Aperiam repudiandae excepturi voluptatibus possimus esse.</p>
              </div>

              <div className="content-nav-container">
                <div className="content-backword"></div>
                <div></div>
              </div>
            </div>
          </div>

          <div className="topics-sidebar3 sidebar">
            <div className="topics-sidebar1-head">
              <h1>Chemistry</h1>
            </div>

            <div className="topics-contents-container">
              <div className="topics-title">
                {/* <div>
                        <ul>
                           <% relatedTitles.forEach(title => { %>
                                <a href="/course/<%= title._id %>">
                                    <% if (title.title == content.title) { %>
                                        <li style="background: #f2f2f2;color: black;border-left: 3px solid;"><%- title.title %></li>
                                    <% } else { %>
                                        <li><%- title.title %></li>
                                    <% } %>
                                </a>
                           <% }) %>
                        </ul>
                    </div> */}
                <ul style={appState.isDarkModeOn ? { borderLeft: "2px solid #000" } : {}}>
                  <a href="/course/#">
                    <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Change of State</li>
                  </a>
                  <a href="/course/#">
                    <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Video Explanation</li>
                  </a>
                  <a href="/course/#">
                    <li style={appState.isDarkModeOn ? { color: "#ccc" } : {}}>Quiz</li>
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseContent
