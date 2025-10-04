import React, { useRef } from "react"
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion"

export default function TiltCard({ className="", children, intensity=10, ...props }){
  const ref = useRef(null)
  const prefers = usePrefersReducedMotion()

  function onMove(e){
    if (prefers) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width/2
    const cy = r.top + r.height/2
    const dx = (e.clientX - cx)/r.width
    const dy = (e.clientY - cy)/r.height
    el.style.transform = `perspective(800px) rotateX(${-dy*intensity}deg) rotateY(${dx*intensity}deg)`
  }
  function reset(){ if(ref.current) ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)" }

  return (
    <div
      className={"tiltcard transition-transform duration-200 will-change-transform " + className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
