import React from "react"

export default function CourseProgress(props) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-3">
        <p className="font-bold text-[#444]">{props.head}</p>
        <p className="font-bold text-[#444]">{props.percentage}%</p>
      </div>
      <div class="w-full bg-[#e5e7eb] rounded-[32px] h-2.5 dark:bg-[#364153]">
        <div class="bg-[#155dfc] h-2.5 rounded-[32px] transition-all duration-500 ease-in-out" style={{ width: `${props.percentage}%` }}></div>
      </div>
    </div>
  )
}
