import { useEffect, useRef, useState, useMemo } from 'react'

export default function Hero() {
  const headingRef = useRef(null)
  const starsRef = useRef([])
  const heroRef = useRef(null)
  
  // 2. Star Field Generation
  const stars = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      isTwinkling: Math.random() > 0.5,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 4,
      parallax: (Math.random() * 0.02) + 0.005
    }))
  }, [])

  useEffect(() => {
    const el = headingRef.current
    if (el) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
    }

    const hero = heroRef.current
    if (!hero) return

    let mouseX = -1000
    let mouseY = -1000
    let isMoving = false
    let rafId

    const updateStars = () => {
      const heroW = hero.offsetWidth
      const heroH = hero.offsetHeight
      const radius = 180 // interactive radius around cursor

      starsRef.current.forEach((el, i) => {
        if (!el) return
        const star = stars[i]
        const starX = (star.x / 100) * heroW
        const starY = (star.y / 100) * heroH

        const dx = mouseX - starX
        const dy = mouseY - starY
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Very subtle parallax logic globally
        const pX = (mouseX - (heroW / 2)) * star.parallax
        const pY = (mouseY - (heroH / 2)) * star.parallax

        if (dist < radius) {
          const factor = 1 - dist / radius
          const scale = 1 + factor * 0.3 // Smooth subtle scaling (max 1.3)
          const glowBlur = 4 + factor * 6 
          const glowColor = `rgba(168, 85, 247, ${0.1 + factor * 0.2})`
          
          el.style.transform = `translate(${pX}px, ${pY}px) scale(${scale})`
          el.style.boxShadow = `0 0 ${glowBlur}px ${glowColor}`
          el.style.backgroundColor = `rgba(168, 85, 247, ${0.3 + factor * 0.2})`
          el.style.zIndex = 10
        } else {
          el.style.transform = `translate(${pX}px, ${pY}px) scale(1)`
          el.style.boxShadow = `none`
          el.style.backgroundColor = 'transparent'
          el.style.zIndex = 0
        }
      })
      isMoving = false
    }

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      if (!isMoving) {
        isMoving = true
        rafId = requestAnimationFrame(updateStars)
      }
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
      if (!isMoving) {
        isMoving = true
        rafId = requestAnimationFrame(updateStars)
      }
    }

    hero.addEventListener('mousemove', handleMouseMove, { passive: true })
    hero.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    
    // Initial paint positions
    updateStars()

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(rafId)
    }
  }, [stars])

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-black animate-fade-in"
    >
      {/* 2. STAR FIELD */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={star.id}
            ref={el => starsRef.current[i] = el}
            className="absolute rounded-full transition-all duration-300 ease-out z-0 flex items-center justify-center pointer-events-none"
            style={{
              width: `${star.size}px`, height: `${star.size}px`,
              left: `${star.x}%`, top: `${star.y}%`,
            }}
          >
            <div 
              className={`w-full h-full rounded-full transition-colors duration-500 bg-purple-200 shadow-[0_0_6px_rgba(168,85,247,0.6)] ${star.isTwinkling ? 'animate-twinkle' : 'opacity-60 animate-float-slow'}`}
              style={star.isTwinkling ? { animation: `twinkle ${star.duration}s infinite ease-in-out ${star.delay}s, float-slow 12s infinite ease-in-out ${star.delay}s` } : {}}
            />
          </div>
        ))}
      </div>

      {/* 2.5 Multi-stream Shooting Stars */}
      <div className="absolute top-[10%] left-[40%] md:left-[60%] w-[100px] h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/80 to-white rounded-full blur-[0.5px] pointer-events-none opacity-0 animate-shooting-star-1 z-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      <div className="absolute top-[30%] right-[10%] md:right-[20%] w-[150px] h-[2px] bg-gradient-to-r from-transparent via-purple-500/80 to-white/90 rounded-full blur-[1px] pointer-events-none opacity-0 animate-shooting-star-2 z-0 shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
      <div className="absolute top-[5%] right-[30%] md:right-[40%] w-[120px] h-[1px] bg-gradient-to-r from-transparent via-purple-300/60 to-white/80 rounded-full blur-[0.5px] pointer-events-none opacity-0 animate-shooting-star-3 z-0 shadow-[0_0_6px_rgba(255,255,255,0.5)]" />

      {/* 3. HERO GLOW EFFECT (DEPTH) */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#a855f7]/[0.10] blur-[140px] rounded-full pointer-events-none z-0" />

      {/* 4. Background Image (Zoro) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Subtle purple glow directly behind Zoro */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[60vh] bg-[#a855f7]/[0.12] blur-[150px] rounded-full" />
        
        <img 
          src="/zoro-bg.png" 
          alt="Zoro Background" 
          className="absolute right-0 w-full lg:w-[80%] h-full object-cover object-right lg:object-right-top opacity-40 mix-blend-lighten translate-x-[5vw] lg:translate-x-[12vw] translate-y-[8vh] scale-[1.12] brightness-[1.25] contrast-[1.1] drop-shadow-[0_0_40px_rgba(139,92,246,0.3)]"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 70%)'
          }}
        />
      </div>

      {/* 2. Hero Layout Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left: Text Content */}
        <div className="flex flex-col gap-y-6 max-w-xl w-full">
          
          <div ref={headingRef} className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img 
                src="/pic.jpeg" 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border border-white/10 shadow-lg"
              />
              <div className="flex flex-col">
                {/* 4. Typography: Subtitle */}
                <p className="text-xs font-mono text-gray-400 mb-2 tracking-[0.2em] uppercase">
                  AI / ML Developer
                </p>
                {/* 4. Typography: Name */}
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white m-0 p-0 leading-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                  Anant Singh Tanwar
                </h1>
              </div>
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Building AI systems
              </span>
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Open to collaborate
              </span>
            </div>
          </div>

          {/* 4. Typography: Paragraph */}
          <p className="text-[15px] text-gray-400 leading-relaxed max-w-xl">
            I build <span className="text-gray-200 font-medium">intelligent systems</span> and <span className="text-gray-200 font-medium">scalable applications</span> using machine learning, NLP, and backend engineering. Focused on solving real-world problems with efficient and practical solutions.
          </p>

          {/* 5. Buttons */}
          <div className="flex flex-wrap gap-4 items-center mt-2 lg:mt-0">
            {/* Primary Action */}
            <a
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-medium transition-all duration-300 hover:bg-white/15 hover:border-white/20 active:scale-95 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
            >
              View Work <span className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
            </a>
            
            {/* Secondary Actions */}
            <a
              href="https://github.com/AnantSinghTanwar-ux"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-95 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anant-singh-tanwar-715b54343/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-95 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]"
            >
              <LinkedInIcon />
              LinkedIn
            </a>

            {/* Support Action (Ghost Button) */}
            <div className="w-[1px] h-8 bg-white/10 mx-2 hidden sm:block"></div>
            <a
              href="/gpay-qr.png"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-purple-500/30 bg-transparent text-purple-400 text-sm font-medium transition-all duration-300 hover:bg-purple-500/5 hover:border-purple-500/50 hover:text-purple-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] active:scale-95"
            >
              <span className="text-base">☕</span>
              Buy Me a Coffee
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 pt-8 mt-4 border-t border-white/10">
            {[
              { value: '1+', label: 'Hackathon Win' },
              { value: '3+', label: 'Real Projects' },
              { value: '2026', label: 'Actively Building' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side content buffer for image separation */}
        <div className="hidden lg:block w-full max-w-sm"></div>
      </div>

      {/* Hero Bottom Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}