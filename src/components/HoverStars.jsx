import { useEffect, useRef, useMemo } from 'react';

export default function HoverStars() {
  const starsRef = useRef([])

  const stars = useMemo(() => {
    // Generate more stars since it's full screen
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100, // percentage of full document
      size: Math.random() * 1.5 + 0.5,
      isTwinkling: Math.random() > 0.5,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 4,
      parallax: (Math.random() * 0.02) + 0.005
    }))
  }, [])

  useEffect(() => {
    let mouseX = -1000
    let mouseY = -1000
    let scrollY = window.scrollY
    let isMoving = false
    let rafId

    const updateStars = () => {
      const radius = 250 // interactive radius

      starsRef.current.forEach((el, i) => {
        if (!el) return
        const star = stars[i]
        
        // El bounding rect handles fixed positioning naturally
        const rect = el.getBoundingClientRect()
        const starX = rect.left + rect.width / 2
        const starY = rect.top + rect.height / 2

        const dx = mouseX - starX
        const dy = mouseY - starY
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Very subtle parallax logic based on mouse 
        // Note: global width/height instead of hero width/height
        const wW = window.innerWidth
        const wH = window.innerHeight
        const pX = (mouseX - (wW / 2)) * star.parallax
        const pY = (mouseY - (wH / 2)) * star.parallax

        if (dist < radius && mouseX !== -1000) {
          const factor = 1 - dist / radius
          const scale = 1 + factor * 0.4
          const glowBlur = 4 + factor * 6 
          const glowColor = `rgba(156, 163, 175, ${0.1 + factor * 0.2})`
          
          el.style.transform = `translate(${pX}px, ${pY}px) scale(${scale})`
          el.style.boxShadow = `0 0 ${glowBlur}px ${glowColor}`
          el.style.backgroundColor = `rgba(156, 163, 175, ${0.3 + factor * 0.2})`
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
      mouseX = e.clientX
      mouseY = e.clientY
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

    const handleScroll = () => {
      // Small trigger to update on scroll if mouse is active
      if (mouseX !== -1000) {
         if (!isMoving) {
           isMoving = true
           rafId = requestAnimationFrame(updateStars)
         }
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.body.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial paint positions
    updateStars()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [stars])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ position: 'fixed', height: '100vh', width: '100vw' }}>
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
            className={`w-full h-full rounded-full transition-colors duration-500 bg-gray-200 shadow-[0_0_6px_rgba(156,163,175,0.6)] ${star.isTwinkling ? 'animate-twinkle' : 'opacity-60 animate-float-slow'}`}
            style={star.isTwinkling ? { animation: `twinkle ${star.duration}s infinite ease-in-out ${star.delay}s, float-slow 12s infinite ease-in-out ${star.delay}s` } : {}}
          />
        </div>
      ))}
    </div>
  )
}
