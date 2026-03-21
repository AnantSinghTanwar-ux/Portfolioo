import { useState, useEffect } from 'react'
const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Stack', href: '#techstack' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      scrolled ? 'bg-white/5 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
    }`} >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(139,92,246,0.7)] group-hover:scale-105">
            A
          </span>
          <span className="text-sm font-semibold text-[#f1f0ff] tracking-wide">
            Anant<span className="text-gradient">.</span>
          </span>
        </a>
        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link text-gray-200 hover:text-purple-400 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-[#9ca3af] hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            ) : (
              <>
                <rect y="3" width="20" height="2" rx="1" />
                <rect y="9" width="20" height="2" rx="1" />
                <rect y="15" width="20" height="2" rx="1" />
              </>
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-glass border-b border-white/5 px-6 py-4 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="nav-link text-sm relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full hover:text-white transition-colors duration-300" >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
