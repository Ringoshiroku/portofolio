import { useEffect } from "react"
export default function useInViewStagger(ref, { rootMargin = '0px 0px -10% 0px' } = {}){
  useEffect(()=>{
    const el = ref.current
    if(!el) return
    const children = Array.from(el.children)
    const io = new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        children.forEach(c=> c.classList.add('in'))
        io.disconnect()
      }
    }, { root: null, rootMargin, threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
}
