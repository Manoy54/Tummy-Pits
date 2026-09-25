type LetterTile = {
  fill: string;
  fontFamily: string;
  fontSize: number;
  fontStyle?: 'italic';
  fontWeight: number;
  glyph: string;
  glyphFill: string;
  key: string;
  path: string;
  rotate: number;
  textLength?: number;
  x: number;
  y: number;
};

const block = '"Arial Black", "Franklin Gothic Heavy", Impact, sans-serif';
const rounded = '"Cooper Black", "Rockwell Extra Bold", Rockwell, Georgia, serif';
const serif = 'Georgia, "Times New Roman", serif';
const slab = 'Rockwell, "Roboto Slab", Georgia, serif';
const script = '"Brush Script MT", "Segoe Script", cursive';

const topLetters: LetterTile[] = [
  {
    key: 'happy-h', glyph: 'H', fill: '#4b1d0f', glyphFill: '#ed1018',
    path: 'M173 94 L260 90 L269 99 L272 218 L259 224 L176 220 L169 207 L166 108 Z',
    x: 219, y: 199, fontFamily: block, fontSize: 102, fontWeight: 900, rotate: -2.2, textLength: 67,
  },
  {
    key: 'happy-a', glyph: 'A', fill: '#0b4b78', glyphFill: '#fffdf7',
    path: 'M281 99 L359 98 L369 108 L375 217 L363 224 L282 222 L275 211 L275 110 Z',
    x: 325, y: 203, fontFamily: block, fontSize: 101, fontWeight: 900, rotate: -1.2, textLength: 72,
  },
  {
    key: 'happy-p-one', glyph: 'p', fill: '#efa4b9', glyphFill: '#09689e',
    path: 'M377 105 L452 98 L463 106 L470 224 L460 232 L381 228 L374 216 L370 116 Z',
    x: 420, y: 202, fontFamily: rounded, fontSize: 105, fontWeight: 900, rotate: -2.4, textLength: 63,
  },
  {
    key: 'happy-p-two', glyph: 'p', fill: '#fffdf8', glyphFill: '#090706',
    path: 'M469 104 L533 108 L542 117 L539 221 L530 230 L471 225 L464 216 L462 116 Z',
    x: 501, y: 201, fontFamily: serif, fontSize: 104, fontWeight: 700, rotate: 3.6, textLength: 55,
  },
  {
    key: 'happy-y', glyph: 'y', fill: '#9bd6eb', glyphFill: '#0867a0',
    path: 'M547 101 L626 96 L637 106 L643 211 L635 226 L550 232 L541 222 L539 114 Z',
    x: 590, y: 198, fontFamily: script, fontSize: 108, fontWeight: 700, rotate: -4.2, textLength: 69,
  },
];

const bottomLetters: LetterTile[] = [
  {
    key: 'birthday-b', glyph: 'B', fill: '#ffe89b', glyphFill: '#39a4d0',
    path: 'M108 237 L194 224 L205 234 L209 344 L197 352 L116 360 L105 350 L98 250 Z',
    x: 155, y: 337, fontFamily: slab, fontSize: 98, fontWeight: 900, rotate: -6.1, textLength: 67,
  },
  {
    key: 'birthday-i', glyph: 'i', fill: '#2681ba', glyphFill: '#fffdf7',
    path: 'M203 230 L282 232 L291 241 L291 344 L282 352 L207 350 L199 341 L197 241 Z',
    x: 245, y: 337, fontFamily: block, fontSize: 91, fontWeight: 900, rotate: -1.5, textLength: 26,
  },
  {
    key: 'birthday-r', glyph: 'r', fill: '#f4c5d0', glyphFill: '#ae0718',
    path: 'M292 236 L357 231 L366 239 L370 350 L360 359 L298 356 L289 347 L286 246 Z',
    x: 330, y: 339, fontFamily: script, fontSize: 88, fontWeight: 700, rotate: -1.2, textLength: 44,
  },
  {
    key: 'birthday-t', glyph: 't', fill: '#ff7900', glyphFill: '#050403',
    path: 'M368 225 L428 219 L438 227 L444 350 L435 362 L374 363 L364 353 L360 237 Z',
    x: 402, y: 340, fontFamily: serif, fontSize: 102, fontStyle: 'italic', fontWeight: 900, rotate: 1.5, textLength: 45,
  },
  {
    key: 'birthday-h', glyph: 'h', fill: '#ffe58b', glyphFill: '#e43c09',
    path: 'M440 223 L502 225 L511 236 L513 349 L504 359 L443 355 L435 347 L432 234 Z',
    x: 473, y: 338, fontFamily: slab, fontSize: 91, fontWeight: 900, rotate: 2.2, textLength: 52,
  },
  {
    key: 'birthday-d', glyph: 'd', fill: '#4a231c', glyphFill: '#e6a0b7',
    path: 'M514 234 L577 231 L585 240 L590 350 L581 361 L517 358 L508 349 L506 246 Z',
    x: 549, y: 340, fontFamily: slab, fontSize: 89, fontWeight: 900, rotate: -1.6, textLength: 51,
  },
  {
    key: 'birthday-a', glyph: 'A', fill: '#075d98', glyphFill: '#fffdf7',
    path: 'M587 232 L650 231 L659 239 L663 349 L655 359 L593 360 L584 350 L580 244 Z',
    x: 622, y: 339, fontFamily: block, fontSize: 86, fontWeight: 900, rotate: -0.8, textLength: 57,
  },
  {
    key: 'birthday-y', glyph: 'Y', fill: '#bd4518', glyphFill: '#fffdf7',
    path: 'M660 225 L727 224 L737 233 L742 340 L734 350 L669 354 L659 345 L653 237 Z',
    x: 696, y: 335, fontFamily: slab, fontSize: 88, fontWeight: 900, rotate: 2.2, textLength: 58,
  },
];

function Tiles({ letters }: { letters: LetterTile[] }) {
  return letters.map((letter) => (
    <g key={letter.key} transform={`rotate(${letter.rotate} ${letter.x} ${letter.y - 50})`}>
      <path d={letter.path} fill={letter.fill} filter="url(#paper-shadow)" stroke="#e1d9c9" strokeWidth="1.5" />
      <text
        dominantBaseline="alphabetic"
        fill={letter.glyphFill}
        filter="url(#printed-ink)"
        fontFamily={letter.fontFamily}
        fontSize={letter.fontSize}
        fontStyle={letter.fontStyle}
        fontWeight={letter.fontWeight}
        lengthAdjust="spacingAndGlyphs"
        textAnchor="middle"
        textLength={letter.textLength}
        x={letter.x}
        y={letter.y}
      >
        {letter.glyph}
      </text>
    </g>
  ));
}

export function HappyBirthdayPrototype() {
  return (
    <div className="birthday-reference-art">
      <svg
        aria-labelledby="birthday-art-title birthday-art-description"
        className="birthday-reference-svg"
        role="img"
        viewBox="0 0 828 414"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="birthday-art-title">Happy Birthday</title>
        <desc id="birthday-art-description">
          Happy Birthday in mismatched hand-cut paper letters, with curled ribbons, stars,
          confetti, and a small red crown.
        </desc>

        <defs>
          <filter id="sticker-shadow" x="-20%" y="-20%" width="140%" height="155%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="4.2" result="outline" />
            <feFlood floodColor="#b68a38" floodOpacity="0.9" result="outline-color" />
            <feComposite in="outline-color" in2="outline" operator="in" result="rim" />
            <feDropShadow dx="0" dy="4" floodColor="#725929" floodOpacity="0.32" stdDeviation="3" />
            <feMerge>
              <feMergeNode in="rim" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="paper-shadow" x="-18%" y="-18%" width="136%" height="145%">
            <feTurbulence baseFrequency="0.018" numOctaves="2" result="warp" seed="11" type="fractalNoise" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="0.7" xChannelSelector="R" yChannelSelector="B" />
            <feDropShadow dx="0" dy="2" floodColor="#3e2f1c" floodOpacity="0.23" stdDeviation="1.6" />
          </filter>
          <filter id="printed-ink" x="-14%" y="-14%" width="128%" height="132%">
            <feTurbulence baseFrequency="0.045" numOctaves="2" result="ink-noise" seed="7" type="fractalNoise" />
            <feDisplacementMap in="SourceGraphic" in2="ink-noise" scale="0.42" xChannelSelector="R" yChannelSelector="B" />
          </filter>
          <filter id="paper-grain" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence baseFrequency="0.68" numOctaves="3" result="grain" seed="5" type="fractalNoise" />
            <feColorMatrix in="grain" type="matrix" values="0 0 0 0 .35  0 0 0 0 .28  0 0 0 0 .18  0 0 0 .09 0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>

        <path
          d="M160 91 Q158 79 171 77 L261 72 Q272 72 280 86 L356 84 Q367 84 374 94 L448 86 Q459 84 466 96 L529 92 Q540 90 548 100 L624 88 Q638 87 643 102 L652 215 Q653 222 648 228 L729 218 Q746 217 749 232 L758 343 Q759 359 744 363 L670 368 Q661 369 655 364 L591 373 Q582 375 574 367 L517 372 Q508 373 501 367 L444 376 Q433 379 426 369 L373 374 Q364 376 357 368 L294 370 Q285 371 279 365 L211 369 Q201 370 195 363 L113 371 Q98 372 94 357 L86 249 Q84 235 98 230 L157 221 Q151 212 152 200 Z"
          fill="#fffdf7"
          filter="url(#sticker-shadow)"
        />

        <g filter="url(#sticker-shadow)">
          <path d="M119 90 Q104 82 94 94 Q85 105 92 118 Q97 126 110 130 Q94 135 92 150 Q91 165 105 171 Q114 175 124 171 Q111 183 117 197 Q122 210 136 209 Q149 208 154 196 Q158 184 147 175 Q160 163 155 149 Q151 137 138 135 Q148 125 143 111 Q138 97 119 90 Z" fill="#fffdf7" />
          <path d="M119 100 Q99 108 111 124 Q118 132 132 133 Q145 135 143 147 Q141 159 126 161 Q112 164 119 178 Q126 189 140 194" fill="none" stroke="#df1230" strokeLinecap="round" strokeWidth="13" />
        </g>
        <path d="M103 174 l7 13 15 2-11 10 3 15-14-7-13 8 2-15-11-10 15-2z" fill="#178dc7" />
        <circle cx="145" cy="202" fill="#f25916" r="8" />

        <g filter="url(#sticker-shadow)">
          <path d="M691 91 Q706 82 719 91 Q730 99 727 113 Q725 123 713 130 Q730 134 732 149 Q734 163 722 172 Q713 178 702 173 Q715 184 710 198 Q705 211 690 211 Q675 211 670 198 Q666 186 677 177 Q664 166 668 151 Q672 138 686 135 Q674 124 679 110 Q683 98 691 91 Z" fill="#fffdf7" />
          <path d="M700 101 Q720 107 712 121 Q707 130 692 134 Q678 138 682 150 Q686 161 702 164 Q716 168 708 182 Q702 191 688 197" fill="none" stroke="#f38b00" strokeLinecap="round" strokeWidth="12" />
          <path d="M708 102 Q719 106 716 116" fill="none" stroke="#da1125" strokeLinecap="round" strokeWidth="10" />
          <path d="M693 181 Q686 189 688 197" fill="none" stroke="#da1125" strokeLinecap="round" strokeWidth="10" />
        </g>
        <circle cx="664" cy="207" fill="#ef3b0e" r="7" />

        <g filter="url(#sticker-shadow)">
          <path d="M443 73 Q451 58 465 64 Q475 46 488 58 Q503 45 512 62 Q529 56 535 70 L528 101 Q484 112 448 99 Z" fill="#fffdf7" />
          <path d="M455 91 L451 70 L470 82 L478 61 L491 80 L507 59 L520 84 L515 94 Z" fill="#ca1022" />
          <circle cx="451" cy="66" fill="#ca1022" r="5" />
          <circle cx="479" cy="57" fill="#ca1022" r="5" />
          <circle cx="509" cy="56" fill="#ca1022" r="5" />
        </g>
        <g filter="url(#sticker-shadow)">
          <path d="M545 58 Q563 50 577 62 Q591 76 580 94 Q570 110 551 105 Q534 101 531 85 Q528 68 545 58 Z" fill="#fffdf7" />
          <path d="M557 63 l6 13 15 2-11 10 3 15-13-7-13 8 2-15-11-10 15-2z" fill="#46a9d5" />
        </g>
        <circle cx="434" cy="90" fill="#dd1430" r="8" />

        <Tiles letters={topLetters} />
        <Tiles letters={bottomLetters} />

        <g filter="url(#sticker-shadow)">
          <path d="M83 294 Q98 286 112 294 Q125 304 122 321 Q120 338 103 344 Q87 350 75 338 Q63 326 69 310 Q73 300 83 294 Z" fill="#fffdf7" />
          <path d="M96 299 l7 14 15 2-11 10 3 15-14-7-13 8 3-15-12-10 15-2z" fill="#ffc10a" />
        </g>
        <g filter="url(#sticker-shadow)">
          <path d="M215 355 Q228 347 242 353 Q251 345 264 350 Q280 356 282 371 Q284 387 269 396 Q254 405 241 397 Q226 403 214 393 Q202 383 205 369 Q207 360 215 355 Z" fill="#fffdf7" />
          <circle cx="224" cy="371" fill="#0b83bb" r="7" />
          <path d="M251 354 l6 13 15 2-11 10 3 15-14-7-13 8 2-15-11-10 15-2z" fill="#ef6810" />
        </g>

        <path
          d="M160 91 Q158 79 171 77 L261 72 Q272 72 280 86 L356 84 Q367 84 374 94 L448 86 Q459 84 466 96 L529 92 Q540 90 548 100 L624 88 Q638 87 643 102 L652 215 Q653 222 648 228 L729 218 Q746 217 749 232 L758 343 Q759 359 744 363 L670 368 Q661 369 655 364 L591 373 Q582 375 574 367 L517 372 Q508 373 501 367 L444 376 Q433 379 426 369 L373 374 Q364 376 357 368 L294 370 Q285 371 279 365 L211 369 Q201 370 195 363 L113 371 Q98 372 94 357 L86 249 Q84 235 98 230 L157 221 Q151 212 152 200 Z"
          fill="#8a7045"
          filter="url(#paper-grain)"
          opacity="0.04"
          pointerEvents="none"
        />
      </svg>

      <style>{`
        .birthday-reference-art {
          width: min(94vw, 828px);
          margin-inline: auto;
        }

        .birthday-reference-svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }
      `}</style>
    </div>
  );
}
