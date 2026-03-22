import GitHubCalendar from 'react-github-calendar'
import { useRef, useEffect } from 'react'

export default function GitHubGraph() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let checkCount = 0
    const scrollInterval = setInterval(() => {
      // Check if the calendar data has loaded and expanded the container
      if (container.scrollWidth > container.clientWidth) {
        container.scrollTo({
          left: container.scrollWidth,
          behavior: 'smooth'
        })
        clearInterval(scrollInterval)
      }
      
      checkCount++
      if (checkCount > 50) { // Stop checking after 5 seconds to prevent indefinite loops
        clearInterval(scrollInterval)
      }
    }, 100)

    return () => clearInterval(scrollInterval)
  }, [])

  return (
    <section id="github" className="py-12">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="section-title !mb-0 border-none pt-0">Contribution Activity</h2>
          <span className="flex items-center w-max gap-2 px-3 py-1.5 rounded-full bg-gray-500/10 border border-gray-500/20 text-xs text-gray-300 font-medium shadow-[0_0_10px_rgba(156,163,175,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
            Latest Activity
          </span>
        </div>

        <div 
          ref={scrollRef}
          className="bg-zinc-900 border border-gray-500/20 rounded-2xl p-6 sm:p-8 overflow-x-auto transition-all duration-300 hover:border-gray-500/40 hover:shadow-[0_0_20px_rgba(156,163,175,0.15)] group"
        >
          <GitHubCalendar
            username="AnantSinghTanwar-ux"
            colorScheme="dark"
            theme={{
              dark: ['#18181b', '#27272a', '#3f3f46', '#52525b', '#71717a'], // Updated peak color to bright purple
            }}
            labels={{
              totalCount: '{{count}} contributions in the last year',
            }}
            fontSize={12}
            blockSize={13}
            blockMargin={4}
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
        </div>
      </div>
    </section>
  )
}
