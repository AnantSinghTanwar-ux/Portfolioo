import { useEffect, useState } from 'react';

export default function HoverStars() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate fewer stars for low density
    const newStars = Array.from({ length: 30 }).map(() => {
      const isTwinkling = Math.random() > 0.5;
      return {
        id: Math.random(),
        x: Math.random() * 100, // vw
        y: Math.random() * 100, // vh
        size: Math.random() * 1.5 + 1, // 1-2.5px
        isTwinkling,
        delay: Math.random() * 5, // animation delay
        duration: isTwinkling ? 3 + Math.random() * 3 : null, // 3-6s twinkling
      };
    });
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-white transition-all duration-300 pointer-events-none ${
            star.isTwinkling ? 'animate-twinkle' : 'opacity-20'
          }`}
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}vw`,
            top: `${star.y}vh`,
            ...(star.isTwinkling && {
              animation: `twinkle ${star.duration}s infinite ease-in-out ${star.delay}s`
            })
          }}
        />
      ))}
    </div>
  );
}
