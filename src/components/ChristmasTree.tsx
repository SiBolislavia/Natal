const ChristmasTree = () => {
  return (
    <div className="flex flex-col items-center float-animate select-none" aria-label="Christmas tree decoration">
      {/* Star on top */}
      <div
        className="text-4xl sm:text-5xl mb-1"
        style={{
          filter: 'drop-shadow(0 0 15px #FFD700) drop-shadow(0 0 30px #FFD700)',
          animation: 'twinkle 1.5s ease-in-out infinite alternate',
        }}
      >
        ⭐
      </div>

      {/* Tree SVG */}
      <svg
        viewBox="0 0 200 220"
        className="w-32 sm:w-40 md:w-52 h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tree layers */}
        <polygon points="100,10 165,80 35,80" fill="#1a5c2a" />
        <polygon points="100,35 175,115 25,115" fill="#1f6b32" />
        <polygon points="100,60 185,155 15,155" fill="#237540" />
        <polygon points="100,85 195,195 5,195" fill="#1a5c2a" />

        {/* Snow on branches */}
        <polygon points="100,10 165,80 35,80" fill="rgba(220,240,255,0.15)" />
        <ellipse cx="100" cy="10" rx="8" ry="4" fill="rgba(220,240,255,0.6)" />
        <ellipse cx="50" cy="78" rx="20" ry="5" fill="rgba(220,240,255,0.5)" />
        <ellipse cx="150" cy="78" rx="20" ry="5" fill="rgba(220,240,255,0.5)" />
        <ellipse cx="38" cy="113" rx="18" ry="5" fill="rgba(220,240,255,0.5)" />
        <ellipse cx="162" cy="113" rx="18" ry="5" fill="rgba(220,240,255,0.5)" />
        <ellipse cx="28" cy="153" rx="22" ry="5" fill="rgba(220,240,255,0.5)" />
        <ellipse cx="172" cy="153" rx="22" ry="5" fill="rgba(220,240,255,0.5)" />

        {/* Ornaments */}
        <circle cx="85" cy="55" r="5" fill="#FF4444" />
        <circle cx="115" cy="50" r="4" fill="#FFD700" />
        <circle cx="70" cy="90" r="5" fill="#4488FF" />
        <circle cx="125" cy="88" r="4" fill="#FF4444" />
        <circle cx="100" cy="95" r="5" fill="#FFD700" />
        <circle cx="60" cy="130" r="5" fill="#FF44FF" />
        <circle cx="140" cy="128" r="4" fill="#44FF88" />
        <circle cx="85" cy="135" r="5" fill="#FFD700" />
        <circle cx="115" cy="132" r="4" fill="#FF4444" />
        <circle cx="50" cy="170" r="5" fill="#44FFFF" />
        <circle cx="155" cy="168" r="4" fill="#FFD700" />
        <circle cx="80" cy="172" r="5" fill="#FF4444" />
        <circle cx="120" cy="170" r="4" fill="#4488FF" />
        <circle cx="100" cy="175" r="5" fill="#FF44FF" />

        {/* Lights glow effect */}
        <circle cx="85" cy="55" r="7" fill="rgba(255,68,68,0.3)" />
        <circle cx="115" cy="50" r="6" fill="rgba(255,215,0,0.3)" />
        <circle cx="100" cy="95" r="7" fill="rgba(255,215,0,0.3)" />

        {/* Trunk */}
        <rect x="85" y="195" width="30" height="22" rx="4" fill="#6B3A2A" />
        <rect x="85" y="195" width="30" height="5" rx="2" fill="#8B4A3A" />
      </svg>

      {/* Snow base */}
      <div
        className="w-36 sm:w-44 md:w-56 h-3 rounded-full -mt-2"
        style={{
          background: 'linear-gradient(to bottom, rgba(220,240,255,0.9), rgba(200,220,255,0.6))',
          boxShadow: '0 2px 10px rgba(200,220,255,0.4)',
          filter: 'blur(1px)',
        }}
      />
    </div>
  );
};

export default ChristmasTree;
