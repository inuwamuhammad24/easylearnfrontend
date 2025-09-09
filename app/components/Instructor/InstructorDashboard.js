import React, { useContext, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { NotebookTabs, GraduationCap, UserRound } from "lucide-react"
import { useImmer } from "use-immer"
import Axios from "axios"
import { CSSTransition } from "react-transition-group"
import StateContext from "../../StateContext"
export default function InstructorDashboard() {
  const appState = useContext(StateContext)
  return (
    <>
      {/* <CSSTransition in={appState.alertDanger || appState.alertSucess} timeout={300} classNames={"show-flash"} unmountOnExit>
        <FlashMessage message={appState.flashMessage} myclass={appState.alertDanger ? "alert-danger" : "alert-success"} />
      </CSSTransition> */}
      {/* {appState.isEditOpen || appState.isEditNewsOpen || appState.isEditSchoolOpen || appState.isEditDepartmentOpen || appState.isEditAnnoucementOpen ? <div onClick={handleCloseOverlay} className="staff-edit-overlay"></div> : ""}
      {appState.isEditOpen ? <EditStaff setStaff={setState} staff={state.staff} /> : ""}
      {appState.isEditSchoolOpen ? <EditSchool setSchool={setState} school={state.schools} /> : ""}
      {appState.isEditNewsOpen ? <EditNews setNews={setState} news={state.news} /> : ""}
      {appState.isEditAnnoucementOpen ? <EditAnnoucement setAnnoucement={setState} annoucement={state.annoucement} /> : ""}
      {appState.isEditDepartmentOpen ? <EditDepartment setDepartment={setState} department={state.departments} /> : ""} */}
      <section className="bg-[#F8F9FA]">
        <div className="flex items-start" style={false ? { filter: "blur(2px)" } : {}}>
          <nav className="h-screen pt-8 pb-8 pl-0 pr-4 sticky w-1/4 top-0 overflow-y-scroll bg-white">
            <div className="flex flex-col items-center mr-9 mb-9">
              <div className="rounded-[50%] overflow-hidden h-38 w-38 mb-3">
                <img className="w-full h-full" src="https://res.cloudinary.com/dmw39pbxq/image/upload/v1722963095/admin-placeholder_nilesu.jpg" alt="Admin Image" />
              </div>
              <div className="admin-name">
                <h4 className="text-gray-700 mb-2">Inuwa Muhammad</h4>
              </div>
            </div>
            <div className="ml-5">
              <ul className="flex flex-col">
                <Link className="flex items-center p-2.5 rounded-md transition-all duration-300 text-gray-700 mb-2 pl-8 hover:bg-[#f1f1f1]" to={"/admin/dashboard/dashboard"} style={{ background: "rgb(70, 128, 255)", color: "#fff" }}>
                  <NotebookTabs className="mr-3" size={18} />
                  <li className="text-font list-none" style={name.name == "dashboard" ? { color: "#fff" } : {}}>
                    My Learning
                  </li>
                </Link>
                <Link className="flex items-center p-2 rounded-md transition-all duration-300 text-gray-700 mb-2 pl-8 hover:bg-[#f1f1f1]" to={"/admin/dashboard/schools"} style={name.name == "schools" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <GraduationCap className="mr-3" size={18} />
                  <li className="text-font" style={name.name == "schools" ? { color: "#fff" } : {}}>
                    Schools
                  </li>
                </Link>
                <Link className="flex items-center p-2 rounded-md transition-all duration-300 text-gray-700 mb-2 pl-8 hover:bg-[#f1f1f1]" to={"/admin/dashboard/staff"} style={name.name == "staff" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <UserRound className="mr-3" size={18} />
                  <li className="text-font" style={name.name == "staff" ? { color: "#fff" } : {}}>
                    Staff
                  </li>
                </Link>
                <Link className="flex items-center p-2 rounded-md transition-all duration-300 text-gray-700 mb-2 pl-8 hover:bg-[#f1f1f1]" to={"/admin/dashboard/annoucement"} style={name.name == "annoucement" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <i className="fa-solid fa-bullhorn mr-2"></i>
                  <li className="text-font" style={name.name == "annoucement" ? { color: "#fff" } : {}}>
                    Annoucement
                  </li>
                </Link>
                <Link className="flex items-center p-2 rounded-md transition-all duration-300 text-gray-700 mb-2 pl-8 hover:bg-[#f1f1f1]" to={"/admin/dashboard/news"} style={name.name == "news" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <i className="fa-regular fa-newspaper mr-2"></i>
                  <li className="text-font" style={name.name == "news" ? { color: "#fff" } : {}}>
                    News and Events
                  </li>
                </Link>
                <Link className="flex items-center p-2 rounded-md transition-all duration-300 text-gray-700 mb-2 pl-8 hover:bg-[#f1f1f1]" to={"/admin/dashboard/departments"} style={name.name == "departments" ? { background: "rgb(70, 128, 255)", color: "#fff" } : {}}>
                  <i className="fa-solid fa-bullhorn mr-2"></i>
                  <li className="text-font" style={name.name == "departments" ? { color: "#fff" } : {}}>
                    Departments
                  </li>
                </Link>
              </ul>
            </div>
          </nav>
          <main className="w-3/4 p-0">
            <div></div>
            <div className="flex justify-end pr-9 bg-white">
              <div className="text-gray-700 text-xl bg-[#e4ece8] p-2 rounded-full place-content-center cursor-pointer relative hidden">
                <i className="fa-solid fa-bars"></i>
              </div>
              <div className="notification-sidebar2">
                <div className="notification-cont">
                  <i className="bx bx-message-detail"></i>
                  {/* <div className="dialog-cont">
                  <div className="dialog-head">
                    <div className="dialog-head-text">
                      <h3 className="heading-font">Notification</h3>
                    </div>
                  </div>
                </div> */}
                </div>
                <div className="notification-cont">
                  <i className="bx bx-bell"></i>
                </div>
                <div className="notification-cont" title={localStorage.getItem("userEmail")}>
                  <i className="bx bx-user"></i>
                </div>
              </div>
            </div>
            <div className="admin-sidebar-main-cont">
              <div className="admin-sidebar-Dashboard">
                <h2 className="heading-font">Dashboard</h2>
                <p className="text-font">
                  <span style={{ color: "rgb(70, 128, 255)" }}>Home</span> / {name.name == "dashboard" ? "Dashboard" : name.name == "schools" ? "Schools" : name.name == "departments" ? "Departments" : name.name == "staff" ? "Staff" : name.name == "annoucement" ? "Annoucements" : name.name == "news" ? "News and Events" : ""}
                </p>
              </div>
              {name.name === "schools" ? (
                // <div className="admin-school-list">{state.schools.length ? state.schools.map(school => <School state={state} newSchool={false} setState={setState} id={school._id} name={school.name} description={school.description} mission={school.mission} vision={school.vision} key={school._id} hod={school.hod} />) : <SmallLoading />}</div>
                <div className="admin-school-list">
                  <div className="admin-table">
                    <div className="table-head">
                      <div>
                        <h2 className="heading-font">School record({state.schools.length ? state.schools.length : ""})</h2>
                      </div>
                      <div className="admin-school-list-head">
                        <button className="action-button" onClick={handleEdit} style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                          <p className="text-font">Add School</p>
                          <i className="bx bxs-add-to-queue"></i>
                        </button>
                      </div>
                    </div>
                    <div className="table-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <h4>#</h4>
                            </th>

                            <th>
                              <h4>Name</h4>
                            </th>

                            <th>
                              <h4>Description</h4>
                            </th>
                            <th>
                              <h4>Mission</h4>
                            </th>
                            <th>
                              <h4>Vision</h4>
                            </th>
                            <th>
                              <h4>HOD</h4>
                            </th>
                            <th>
                              <h4>Action</h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{state.schools.length ? state.schools.map((school, index) => <School index={index + 1} state={state} setState={setState} name={school.name} description={school.description} mission={school.mission} id={school._id} vision={school.vision} key={school._id} hod={school.hod} />) : <SmallLoading />}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : name.name === "staff" ? (
                <div className="admin-school-list">
                  <div className="admin-table">
                    <div className="table-head">
                      <div>
                        <h2 className="heading-font">Staff record({state.staff.length ? state.staff.length : ""})</h2>
                      </div>
                      <div className="admin-school-list-head">
                        <button className="action-button" onClick={handleEdit} style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                          <p className="text-font">Add Staff</p>
                          <i className="bx bxs-add-to-queue"></i>
                        </button>
                      </div>
                    </div>
                    <div className="table-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <h4>#</h4>
                            </th>

                            <th>
                              <h4>Title</h4>
                            </th>

                            <th>
                              <h4>Picture</h4>
                            </th>
                            <th>
                              <h4>Fullname</h4>
                            </th>
                            <th>
                              <h4>Role</h4>
                            </th>
                            <th>
                              <h4>Gender</h4>
                            </th>
                            <th>
                              <h4>Department</h4>
                            </th>
                            <th>
                              <h4>Action</h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{state.staff.length ? state.staff.map((staff, index) => <Staff index={index + 1} state={state} setState={setState} title={staff.title} pic={staff.pic} gender={staff.gender} id={staff._id} firstName={staff.firstname} lastName={staff.lastname} middleName={staff.middlename} email={staff.email} role={staff.role} key={staff._id} department={staff.department} school={staff.school} acadBio={staff.acadBio} />) : <SmallLoading />}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : name.name === "news" ? (
                // <div className="admin-school-list">{state.news.length ? state.news.map(news => <News newSchool={false} setState={setState} id={news._id} head={news.head} body={news.body} date={news.date} pic={news.pic} />) : <SmallLoading />}</div>
                <div className="admin-school-list">
                  <div className="admin-table">
                    <div className="table-head">
                      <div>
                        <h2 className="heading-font">News record({state.news.length ? state.news.length : ""})</h2>
                      </div>
                      <div className="admin-school-list-head">
                        <button className="action-button" onClick={handleEdit} style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                          <p className="text-font">Add News</p>
                          <i className="bx bxs-add-to-queue"></i>
                        </button>
                      </div>
                    </div>
                    <div className="table-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <h4>#</h4>
                            </th>

                            <th>
                              <h4>Head</h4>
                            </th>

                            <th>
                              <h4>Body</h4>
                            </th>
                            <th>
                              <h4>Date</h4>
                            </th>
                            <th>
                              <h4>Pic</h4>
                            </th>
                            <th>
                              <h4>id</h4>
                            </th>
                            <th>
                              <h4>Action</h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{state.news.length ? state.news.map((news, index) => <News index={index + 1} state={state} setState={setState} head={news.head} body={news.body} date={news.date} id={news._id} pic={news.pic} />) : <SmallLoading />}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : name.name == "departments" ? (
                // <div className="admin-school-list">{state.departments.length ? state.departments.map(department => <Department setState={setState} id={department._id} name={department.name} description={department.description} mission={department.mission} vision={department.vision} departments={department.departments} key={department._id} hod={department.hod} />) : <SmallLoading />}</div>
                <div className="admin-school-list">
                  <div className="admin-table">
                    <div className="table-head">
                      <div>
                        <h2 className="heading-font">Department record({state.departments.length ? state.departments.length : ""})</h2>
                      </div>
                      <div className="admin-school-list-head">
                        <button className="action-button" onClick={handleEdit} style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                          <p className="text-font">Add School</p>
                          <i className="bx bxs-add-to-queue"></i>
                        </button>
                      </div>
                    </div>
                    <div className="table-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <h4>#</h4>
                            </th>

                            <th>
                              <h4>Name</h4>
                            </th>

                            <th>
                              <h4>Description</h4>
                            </th>
                            <th>
                              <h4>Mission</h4>
                            </th>
                            <th>
                              <h4>Vision</h4>
                            </th>
                            <th>
                              <h4>HOD</h4>
                            </th>
                            <th>
                              <h4>Action</h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{state.departments.length ? state.departments.map((department, index) => <Department index={index + 1} state={state} setState={setState} name={department.name} description={department.description} mission={department.mission} id={department._id} vision={department.vision} key={department._id} hod={department.hod} />) : <SmallLoading />}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : name.name == "annoucement" ? (
                // <div className="admin-school-list">{state.news.length ? state.news.map(news => <News newSchool={false} setState={setState} id={news._id} head={news.head} body={news.body} date={news.date} pic={news.pic} />) : <SmallLoading />}</div>
                <div className="admin-school-list">
                  <div className="admin-table">
                    <div className="table-head">
                      <div>
                        <h2 className="heading-font">Announcement record({state.annoucement.length ? state.annoucement.length : ""})</h2>
                      </div>
                      <div className="admin-school-list-head">
                        <button className="action-button" onClick={handleEdit} style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px" }}>
                          <p className="text-font">Make Annoucement</p>
                          <i className="bx bxs-add-to-queue"></i>
                        </button>
                      </div>
                    </div>
                    <div className="table-body">
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <h4>#</h4>
                            </th>

                            <th>
                              <h4>Head</h4>
                            </th>

                            <th>
                              <h4>Body</h4>
                            </th>
                            <th>
                              <h4>Date</h4>
                            </th>
                            <th>
                              <h4>Pic</h4>
                            </th>
                            <th>
                              <h4>id</h4>
                            </th>
                            <th>
                              <h4>Action</h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{state.annoucement.length ? state.annoucement.map((annoucement, index) => <Annoucement index={index + 1} state={state} setState={setState} head={annoucement.head} body={annoucement.body} date={annoucement.date} id={annoucement._id} pic={annoucement.pic} announceNotification={annoucement.announceNotification} />) : <SmallLoading />}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </main>
        </div>
      </section>
    </>
  )
}
