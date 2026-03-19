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
    <section id="techstack" className="py-20" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Tech Stack</h2>

        <div className="flex flex-col gap-7">
          {techStack.map((group, i) => (
            <div
              key={group.category}
              className={`animate-on-scroll stagger-${Math.min(i + 1, 4)}`}
            >
              <p className="text-[10px] font-mono text-violet-400/60 uppercase tracking-[0.18em] mb-3">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="tech-tag hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-purple-500/15 hover:border-purple-400 hover:text-purple-200 hover:shadow-[0_0_12px_rgba(168,85,247,0.25)] relative z-10 hover:z-20 transition-all duration-300"
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
