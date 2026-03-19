import { useRef, useEffect } from 'react'
import { projects } from '../data/projects'

export default function Projects() {
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
    <section id="projects" className="py-20" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">Selected Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const isWip = project.status === 'wip'
  const staggerClass = `stagger-${Math.min(index + 1, 4)}`

  return (
    <div className={`animate-on-scroll ${staggerClass} group relative bg-glass border border-white/6 rounded-2xl p-6 overflow-hidden hover:-translate-y-2 hover:scale-[1.03] hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300`}>
      {/* Card inner glow on hover (CSS-only via group) */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Top row */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600/25 to-indigo-600/25 border border-violet-500/20 flex items-center justify-center">
          <FolderIcon />
        </div>
        <div className="flex items-center gap-2">
          {isWip && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/12 border border-amber-500/30 text-[11px] text-amber-300 font-medium tracking-wide">
              In Development
            </span>
          )}
          {project.github && !isWip && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="p-1.5 rounded-lg text-[#6b7280] hover:text-white hover:bg-white/5 transition-all duration-200">
              <GithubIcon />
            </a>
          )}
        </div>
      </div>

      {/* Name + subtitle */}
      <div className="relative mb-2">
        <h3 className="text-[0.95rem] font-semibold text-[#f1f0ff] group-hover:text-gradient transition-all duration-300 leading-snug">
          {project.name}
        </h3>
        {project.subtitle && (
          <p className="text-[11px] text-violet-400/60 font-mono mt-0.5 tracking-wide">{project.subtitle}</p>
        )}
      </div>

      <p className="relative text-sm text-[#9ca3af] leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="relative flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="badge-pill">{t}</span>
        ))}
      </div>

      {/* GitHub link */}
      {project.github && !isWip && (
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          className="relative inline-flex items-center gap-1.5 mt-4 text-[11px] text-[#6b7280] hover:text-violet-400 transition-colors duration-200 group/link">
          <GithubIcon size={11} />
          <span className="group-hover/link:underline">View on GitHub →</span>
        </a>
      )}
    </div>
  )
}

function FolderIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function GithubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
