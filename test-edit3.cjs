const fs = require('fs');

let hero = fs.readFileSync('src/components/Hero.jsx', 'utf8');

hero = hero.replace(
  /\{\/\* 4\. Background Image[\s\S]*?\{\/\* 2\. Hero Layout Container \*\/\}/m,
  `{/* 4. Background Image (Zoro) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex justify-center">
        <div className="w-full section-container relative h-full">
          {/* Subtle glow directly behind Zoro */}
          <div className="absolute right-0 md:right-[-5%] top-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] h-[60vh] bg-white/[0.03] blur-[120px] rounded-full" />
          
          <img 
            src="/zoro-bg.png" 
            alt="Zoro Background" 
            className="absolute right-0 lg:-right-8 top-[10%] md:top-1/2 md:-translate-y-1/2 w-[85%] md:w-[60%] lg:w-[500px] h-[70vh] md:h-[95vh] object-cover md:object-contain object-right opacity-30 mix-blend-lighten brightness-[1.25] contrast-[1.1]"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 40%, transparent 75%)',
              maskImage: 'radial-gradient(ellipse at 70% 50%, black 40%, transparent 75%)'
            }}
          />
        </div>
      </div>

      {/* 2. Hero Layout Container */}`
);

fs.writeFileSync('src/components/Hero.jsx', hero);
