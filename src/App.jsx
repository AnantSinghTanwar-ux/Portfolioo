import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GitHubGraph from './components/GitHubGraph'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="noise-bg relative">
      {/* Ambient orbs — 3 now for more depth */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

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
