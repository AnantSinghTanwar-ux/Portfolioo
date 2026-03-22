const fs = require('fs');

let hero = fs.readFileSync('src/components/Hero.jsx', 'utf8');

hero = hero.replace(
  /<div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex justify-center">[\s\S]*?\{\/\* 2\. Hero Layout Container \*\/\}/,
  `<div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Subtle glow directly behind Zoro */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[60vh] bg-white/[0.04] blur-[150px] rounded-full" />
        
        <img 
          src="/zoro-bg.png" 
          alt="Zoro Background" 
          className="absolute right-0 w-full lg:w-[80%] h-full object-cover object-right lg:object-right-top opacity-40 mix-blend-lighten translate-x-[15vw] lg:translate-x-[25vw] translate-y-[8vh] scale-[1.15] brightness-[1.25] contrast-[1.1] drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 70%)',
            maskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 70%)'
          }}
        />
      </div>

      {/* 2. Hero Layout Container */}`
);

fs.writeFileSync('src/components/Hero.jsx', hero);
