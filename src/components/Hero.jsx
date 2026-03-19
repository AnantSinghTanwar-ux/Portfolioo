import { useEffect, useRef } from 'react'

export default function Hero() {
  const headingRef = useRef(null)
  const gridRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(28px)'
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleMouseMove = (e) => {
    requestAnimationFrame(() => {
      if (gridRef.current) {
        // Subtle opposite movement for parallax (max ~15px)
        const x = (e.clientX / window.innerWidth - 0.5) * 30
        const y = (e.clientY / window.innerHeight - 0.5) * 30
        gridRef.current.style.transform = `translate(${-x}px, ${-y}px)`
      }
      if (glowRef.current) {
        // Faint radial gradient following cursor
        const rect = glowRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        glowRef.current.style.background = `radial-gradient(circle 600px at ${x}px ${y}px, rgba(139, 92, 246, 0.08), transparent 80%)`
      }
    })
  }

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden group"
      onMouseMove={handleMouseMove}
    >
      {/* Subtle glow following cursor */}
      <div 
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* Dot grid with parallax */}
      <div 
        ref={gridRef}
        className="dot-grid absolute inset-0 opacity-50 pointer-events-none transition-transform duration-[400ms] ease-out" 
      />

      {/* Animated hero mesh */}
      <div className="hero-mesh" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col gap-8 max-w-2xl">

          {/* Status badges */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-white/5 text-xs text-[#a78bfa]">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Building AI systems
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-white/5 text-xs text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to collaborate
            </span>
          </div>

          {/* Main heading — single line */}
          <div ref={headingRef}>
            <p className="text-xs font-mono text-violet-400 mb-4 tracking-[0.2em] uppercase opacity-80">
              AI / ML Developer
            </p>
            <h1 className="font-extrabold leading-tight tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl whitespace-nowrap drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Anant Singh Tanwar
              </span>
            </h1>
          </div>

          {/* Bio */}
          <p className="text-[1.05rem] text-[#9ca3af] leading-relaxed max-w-lg" style={{ letterSpacing: '0.01em' }}>
            I build{' '}
            <span className="text-[#e9d5ff] font-medium">intelligent systems</span>
            {' '}and{' '}
            <span className="text-[#e9d5ff] font-medium">scalable applications</span>
            {' '}using machine learning, NLP, and backend engineering. Focused on solving real-world problems with efficient and practical solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <a
              href="#projects"
              className="btn-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95"
            >
              <span>View Work</span>
              <svg className="arrow-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="https://github.com/AnantSinghTanwar-ux"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95"
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anant-singh-tanwar-715b54343/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-5 border-t border-white/5">
            {[
              { value: '1+', label: 'Hackathon Win' },
              { value: '3+', label: 'Real Projects' },
              { value: '2026', label: 'Actively Building' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-gradient-name">{stat.value}</p>
                <p className="text-xs text-[#6b7280] mt-0.5 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
