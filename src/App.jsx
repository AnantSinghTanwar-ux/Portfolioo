import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GitHubGraph from './components/GitHubGraph'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="relative bg-black min-h-screen">
      {/* 3. Dotted Margins (Vertical Guide Lines) */}
      <div 
        className="fixed top-0 bottom-0 pointer-events-none z-0 border-l-[1.5px] border-dashed"
        style={{ left: '15vw', borderColor: 'rgba(168, 85, 247, 0.3)' }}
      />
      <div 
        className="fixed top-0 bottom-0 pointer-events-none z-0 border-r-[1.5px] border-dashed"
        style={{ right: '15vw', borderColor: 'rgba(168, 85, 247, 0.3)' }}
      />

      <div className="relative z-10">
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
