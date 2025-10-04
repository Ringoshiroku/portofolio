import React, { useEffect, useRef } from "react"
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion"

export default function Spotlight(){
  const prefers = usePrefersReducedMotion()
  const ref = useRef(null)
  useEffect(()=>{
    const el = ref.current
    if (!el || prefers) return
    function move(e){
      const x = e.clientX, y = e.clientY
      el.style.background = `radial-gradient(600px 300px at ${x}px ${y}px, rgba(136,184,161,.18), transparent 60%)`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [prefers])
  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />
}
