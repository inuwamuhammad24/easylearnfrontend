import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

function Toast({ isVisible, type = "success", message, onClose }) {
  // Automatically trigger the onClose callback handler after 5 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  const isSuccess = type === "success"

  return (
    <div className="fixed top-24 right-6 z-50 w-full max-w-sm flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: 40,
              scale: 0.95,
              transition: { duration: 0.2 },
            }}
            className={`p-4 rounded-2xl border flex flex-col shadow-2xl pointer-events-auto relative overflow-hidden backdrop-blur-md transition-colors bg-slate-900/95 dark:bg-slate-900/95 ${
              isSuccess
                ? "border-emerald-500/30 text-slate-100"
                : "border-rose-500/30 text-slate-100"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Conditional Icon Node */}
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isSuccess
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-rose-500/10 text-rose-400"
                }`}
              >
                {isSuccess ? "✓" : "⚠️"}
              </span>

              {/* Dynamic Content Track */}
              <div className="flex-1 space-y-1">
                <h4
                  className={`text-xs font-black uppercase tracking-wide ${
                    isSuccess ? "text-emerald-500" : "text-rose-400"
                  }`}
                >
                  {isSuccess ? "System Notice" : "System Exception"}
                </h4>
                <p className="text-[11px] text-slate-300 font-semibold leading-normal">
                  {message}
                </p>
              </div>

              {/* Manual Close Trigger Icon */}
              <button
                type="button"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200 text-[11px] cursor-pointer pl-1 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Hardware Accelerated Visual Progress Timeline Countdown Tracker Bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className={`absolute bottom-0 left-0 h-1 ${
                isSuccess ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Toast
