import { useEffect, useState } from "react"
export default function usePrefersReducedMotion(){
  const [prefers, setPrefers] = useState(false)
  useEffect(()=>{
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setPrefers(!!mq.matches)
    onChange()
    mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange)
    return () => mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange)
  },[])
  return prefers
}
