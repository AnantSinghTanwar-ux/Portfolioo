import { useRef, useEffect } from 'react'
import { achievements } from '../data/achievements'

const prizeColors = {
  amber: 'bg-amber-500/12 text-amber-300 border-amber-500/30',
  purple: 'bg-violet-500/12 text-violet-300 border-violet-500/30',
  blue: 'bg-blue-500/12 text-blue-300 border-blue-500/30',
}

export default function Achievements() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="achievements" className="py-20" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Achievements</h2>

        <div className="flex flex-col gap-4">
          {achievements.map((a, i) => (
            <div
              key={a.id}
              className={`animate-on-scroll stagger-${Math.min(i + 1, 4)} achievement-card group relative bg-glass border border-white/6 rounded-2xl p-6 overflow-hidden`}
            >
              {/* Inner hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.07) 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="relative flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  {/* Event + prize badge */}
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <TrophyIcon />
                    <span className="text-sm font-semibold text-[#f1f0ff]">{a.event}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${prizeColors[a.prizeColor] || prizeColors.purple}`}>
                      🏆 {a.prize}
                    </span>
                  </div>

                  <h3 className="text-[0.95rem] font-bold text-[#f1f0ff] mb-1.5">{a.project}</h3>
                  <p className="text-sm text-[#9ca3af] mb-3 leading-relaxed">{a.description}</p>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {a.tech.map((t) => (
                        <span key={t} className="badge-pill">{t}</span>
                      ))}
                    </div>
                    <span className="text-[11px] text-[#6b7280] flex items-center gap-1">
                      <CalendarIcon /> {a.date}
                    </span>
                  </div>
                </div>

                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-4 py-1.5 rounded-full border border-white/8 group-hover:border-violet-500/40 text-xs text-[#9ca3af] group-hover:text-white transition-all duration-200 whitespace-nowrap hover:bg-violet-500/10"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TrophyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}
