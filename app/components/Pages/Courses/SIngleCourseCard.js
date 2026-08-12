import React from "react"

export default function SingleCourseCard(props) {
  return (
    <div className="bg-white rounded-lg p-3 shadow">
      {/* category p */}
      <div className="text-font p-1.5 px-4 font-bold rounded-3xl bg-[#4680FF] inline-block text-white w-auto mb-12">{props.category}</div>
      <div>
        <h3 className="text-lg font-bold text-[#444] mb-3">{props.head}</h3>
        <p className="text-truncate text-[#444]  pb-1.5">{props.description}</p>
      </div>
    </div>
  )
}
