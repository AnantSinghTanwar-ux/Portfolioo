import { useRef, useEffect } from 'react'
import { techStack } from '../data/techStack'
export default function TechStack() {
  const sectionRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    )
    sectionRef.current?.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return (
    <section id="techstack" className="py-24" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((group, i) => (
            <div 
              key={group.category} 
              className={`animate-on-scroll stagger-${Math.min(i + 1, 4)} group bg-[#0a0a0a] border border-purple-500/20 rounded-2xl p-6 md:p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]`}
            >
              <h3 className="text-xs font-mono text-[#a855f7] tracking-wider uppercase mb-5">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-2.5">
                {group.items.map((item) => (
                  <span 
                    key={item} 
                    className="bg-[#111111] border border-white/5 rounded-full px-3 py-1.5 text-sm text-gray-200 transition-colors duration-200 hover:text-white hover:bg-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
