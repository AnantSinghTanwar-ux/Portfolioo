const fs = require('fs');

let hero = fs.readFileSync('src/components/Hero.jsx', 'utf8');

// Replace the Hero Layout Container contents to perfectly align it and make it structured
hero = hero.replace(
  /\{\/\* 2\. Hero Layout Container \*\/\}[\s\S]*?<\/section>/,
  `{/* 2. Hero Layout Container */}
      <div className="relative z-10 w-full section-container flex flex-col lg:flex-row items-center justify-between">
        
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
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white m-0 p-0 leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  Anant Singh Tanwar
                </h1>
              </div>
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
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
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-95 mx-1"
            >
              <GithubIcon />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anant-singh-tanwar-715b54343/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-95 mx-1"
            >
              <LinkedInIcon />
              LinkedIn
            </a>

            {/* Support Action */}
            <div className="w-[1px] h-8 bg-white/10 mx-2 hidden sm:block"></div>
            <a
              href="/gpay-qr.png"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-500/30 bg-transparent text-gray-300 text-sm font-medium transition-all duration-300 hover:bg-gray-500/5 hover:border-gray-500/50 hover:text-white active:scale-95"
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
        <div className="hidden lg:block w-full max-w-sm pointer-events-none"></div>
      </div>
    </section>`
);

fs.writeFileSync('src/components/Hero.jsx', hero);
