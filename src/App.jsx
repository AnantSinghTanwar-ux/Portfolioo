import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GitHubGraph from './components/GitHubGraph'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import HoverStars from './components/HoverStars'

export default function App() {
  return (
    <div className="relative bg-zinc-950 min-h-screen z-0">
      <HoverStars />
      
      {/* 3. Dotted Margins (Vertical Guide Lines) */}
      <div 
        className="fixed top-0 bottom-0 pointer-events-none z-0 border-l-[1.5px] border-dashed hidden md:block"
        style={{ left: '8vw', borderColor: 'rgba(156, 163, 175, 0.15)' }}
      />
      <div 
        className="fixed top-0 bottom-0 pointer-events-none z-0 border-r-[1.5px] border-dashed hidden md:block"
        style={{ right: '8vw', borderColor: 'rgba(156, 163, 175, 0.15)' }}
      />

      <div className="relative z-10 w-full overflow-hidden">
        <Navbar />
        <main>
          <Hero />
          <GitHubGraph />
          <Projects />
          <TechStack />
          <Achievements />
        </main>
        <Contact />
      </div>
    </div>
  )
}
