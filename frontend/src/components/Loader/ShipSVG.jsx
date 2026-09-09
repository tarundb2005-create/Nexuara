import React from 'react';

export default function ShipSVG(props) {
  return (
    <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff4040" />
          <stop offset="40%" stopColor="#c0102a" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Rigging (Creepy spider-web like ropes) */}
      <path d="M154,20 L65,145 M159,20 L245,145 M154,60 L75,145 M159,60 L235,145 M154,90 L85,145 M159,90 L225,145" stroke="rgba(40,10,15,0.8)" strokeWidth="0.8" fill="none" />

      {/* Main Mast */}
      <rect x="153" y="2" width="7" height="161" fill="#1a0505" />
      
      {/* Fore Mast */}
      <rect x="100" y="30" width="5" height="115" fill="#1a0505" />
      
      {/* Mizzen Mast */}
      <rect x="205" y="45" width="4" height="100" fill="#1a0505" />

      {/* Yard arms */}
      <rect x="108" y="42" width="96" height="4" fill="#111" rx="2" />
      <rect x="65" y="62" width="70" height="3" fill="#111" rx="1.5" />
      <rect x="175" y="72" width="60" height="3" fill="#111" rx="1.5" />

      {/* Fore Sails (Tattered Black) */}
      <path d="M102,62 L70,62 Q65,85 75,115 Q82,108 90,115 Q95,108 102,115 Z" fill="#0f0c0f" stroke="#300" strokeWidth="1" />
      <path d="M102,62 L130,62 Q135,85 125,115 Q115,108 102,115 Z" fill="#141014" stroke="#300" strokeWidth="1" />

      {/* Mizzen Sails (Tattered Black) */}
      <path d="M207,72 L180,72 Q175,90 185,120 Q195,112 207,120 Z" fill="#0f0c0f" stroke="#300" strokeWidth="1" />
      <path d="M207,72 L230,72 Q235,90 225,120 Q215,112 207,120 Z" fill="#141014" stroke="#300" strokeWidth="1" />

      {/* Main Sails (Tattered Black) */}
      <path d="M156,46 L113,46 Q105,75 113,125 Q125,115 135,125 Q145,115 156,125 Z" fill="#110d11" stroke="#400" strokeWidth="1.5" />
      <path d="M156,46 L202,46 Q210,75 202,125 Q185,115 175,125 Q165,115 156,125 Z" fill="#161216" stroke="#400" strokeWidth="1.5" />

      {/* Top sails */}
      <rect x="134" y="20" width="42" height="3" fill="#111" rx="1.5" />
      <path d="M156,23 L136,23 Q132,35 138,45 Q145,40 156,45 Z" fill="#0f0c0f" stroke="#300" strokeWidth="1" />
      <path d="M156,23 L178,23 Q182,35 176,45 Q165,40 156,45 Z" fill="#141014" stroke="#300" strokeWidth="1" />

      {/* Giant Glowing Skull on Main Sail */}
      <g opacity="0.9" transform="translate(133, 58) scale(1.1)">
        {/* Base Skull */}
        <circle cx="21" cy="20" r="14" fill="#900" filter="url(#lanternGlow)" />
        <path d="M7,20 C7,5 35,5 35,20 L32,32 L10,32 Z" fill="#e01020" />
        {/* Eyes */}
        <path d="M11,18 L18,22 L16,14 Z" fill="#000" />
        <path d="M31,18 L24,22 L26,14 Z" fill="#000" />
        {/* Nose */}
        <polygon points="21,24 19,28 23,28" fill="#000" />
        {/* Teeth */}
        <line x1="13" y1="32" x2="13" y2="40" stroke="#000" strokeWidth="1.5" />
        <line x1="17" y1="32" x2="17" y2="40" stroke="#000" strokeWidth="1.5" />
        <line x1="21" y1="32" x2="21" y2="40" stroke="#000" strokeWidth="1.5" />
        <line x1="25" y1="32" x2="25" y2="40" stroke="#000" strokeWidth="1.5" />
        <line x1="29" y1="32" x2="29" y2="40" stroke="#000" strokeWidth="1.5" />
        <rect x="10" y="32" width="22" height="8" fill="#e01020" />
        {/* Crossbones */}
        <line x1="2" y1="42" x2="40" y2="2" stroke="#e01020" strokeWidth="3" strokeLinecap="round" />
        <line x1="2" y1="2" x2="40" y2="42" stroke="#e01020" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* NEXAURA flag (Torn) */}
      <path d="M156,2 L240,2 L230,9 L240,16 L156,16 Z" fill="#120005" stroke="#400" strokeWidth="1" />
      <text x="193" y="12" textAnchor="middle" fontSize="9" fill="#e0102a" fontFamily="Cinzel,serif" fontWeight="bold" letterSpacing="1">NEXAURA</text>

      {/* Hull (Jagged, dark, demonic) */}
      <path d="M45,135 Q78,142 100,139 L212,139 Q244,142 268,125 L262,184 Q250,205 160,210 Q70,205 52,184 Z" fill="#080305" stroke="#25000a" strokeWidth="1.5" />
      
      {/* Planks (Darker and distressed) */}
      {[148,157,166,175,184,193].map(y => (
        <path key={y} d={`M${55 + (y-148)/3},${y} Q160,${y+3} ${255 - (y-148)/2},${y}`} stroke="#1a0208" strokeWidth="1" opacity="0.8" fill="none" />
      ))}

      {/* Creepy Figurehead at Bow */}
      <path d="M45,135 L30,125 L40,145 Z" fill="#1a0208" />
      <circle cx="35" cy="130" r="5" fill="#c0102a" />
      <circle cx="35" cy="130" r="8" fill="url(#lanternGlow)" opacity="0.6" />

      {/* Side Lanterns */}
      <circle cx="95" cy="142" r="10" fill="url(#lanternGlow)" />
      <circle cx="95" cy="142" r="2" fill="#fff" />
      
      <circle cx="215" cy="142" r="10" fill="url(#lanternGlow)" />
      <circle cx="215" cy="142" r="2" fill="#fff" />

      {/* Demonic Cannons */}
      {[115,145,175].map(x => (
        <g key={x}>
          <rect x={x} y="152" width="18" height="14" rx="2" fill="#030001" stroke="#350010" strokeWidth="1"/>
          <circle cx={x+9} cy="159" r="3" fill="#c0102a" filter="drop-shadow(0 0 3px red)"/>
        </g>
      ))}

      {/* Deck railing with spikes */}
      <path d="M72,135 L230,135 L233,125 L69,125 Z" fill="#0a0205" stroke="#2a0010" strokeWidth="1" />
      {[78,98,118,138,158,178,198,218].map(x => (
        <path key={x} d={`M${x},125 L${x+2},115 L${x+4},125 Z`} fill="#1a0208" />
      ))}
      <line x1="72" y1="125" x2="230" y2="125" stroke="#30000a" strokeWidth="1.5" />

      {/* Water shadow */}
      <ellipse cx="160" cy="208" rx="116" ry="10" fill="#000" opacity="0.9" filter="blur(4px)" />

      {/* Bow waves (Blood red tinted) */}
      {[0,1,2,3].map(i => (
        <path key={i} d={`M${52-i*12},${184+i*6} Q${40-i*12},${178+i*6} ${32-i*12},${184+i*6}`} fill="none" stroke="rgba(220,10,30,0.4)" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}
