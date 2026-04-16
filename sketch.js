// Running Through Boston
// ARTG-2262+63 Final Project
// Alexandra Katz

let letters = [
  { char: 'B', fontName: 'Bebas Neue',       color: '#b31319', size: 160 },  // crimson
  { char: 'O', fontName: 'Playfair Display', color: '#4e5e79', size: 130 },  // slate blue
  { char: 'S', fontName: 'Lora',             color: '#b31319', size: 150 },  // crimson
  { char: 'T', fontName: 'Bebas Neue',       color: '#4e5e79', size: 175 },  // slate blue
  { char: 'O', fontName: 'Poppins',          color: '#b31319', size: 125 },  // crimson
  { char: 'N', fontName: 'EB Garamond',      color: '#4e5e79', size: 155 },  // slate blue
];

let tagline = "Come run with me.";
let scrollY = 0;

// ── Images (all preloaded — photos used in Screen 4 collage) ──────────
let shoesImg;
let mapImg, redSoxImg, northeasternImg, sailboatMapImg;
let charles1Img, charles2Img, charles3Img, charles4Img;
let fens1Img, fens2Img, fens3Img;
let fenway1Img, fenway2Img;
let hokaImg, hokaWalkingImg;

// ── Particle intro ────────────────────────────────────────────────────
let particles      = [];
let particlesReady = false;
let introPhase     = 'assembling'; // 'assembling' | 'settled' | 'scattering'
let taglineAlpha   = 0;
let settledFrames  = 0;
let solidAlpha     = 0;
let letterPositions = [];

function preload() {
  shoesImg        = loadImage('shoes.png');
  mapImg          = loadImage('map.png');
  redSoxImg       = loadImage('red sox B.png');
  northeasternImg = loadImage('Northeaster N.png');
  sailboatMapImg  = loadImage('sailboat.png');
  charles1Img     = loadImage('charles1.jpeg');
  charles2Img     = loadImage('charles2.jpeg');
  charles3Img     = loadImage('charles3.jpeg');
  charles4Img     = loadImage('charles4.jpeg');
  fens1Img        = loadImage('fens1.jpeg');
  fens2Img        = loadImage('fens2.jpeg');
  fens3Img        = loadImage('fens3.jpeg');
  fenway1Img      = loadImage('fenway1.jpeg');
  fenway2Img      = loadImage('fenway2.jpeg');
  hokaImg         = loadImage('HOKA.png');
  hokaWalkingImg  = loadImage('HOKA-walking.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, BASELINE);

  // Small scroll buffer — just enough to trigger Screen 2 transition
  let scrollDiv = createDiv('');
  scrollDiv.style('height', (windowHeight + 300) + 'px');
  scrollDiv.style('position', 'absolute');
  scrollDiv.style('top', '0');
  scrollDiv.style('width', '1px');

  let cnv = document.querySelector('canvas');
  cnv.style.position = 'fixed';
  cnv.style.top  = '0';
  cnv.style.left = '0';

  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  document.fonts.ready.then(setupParticles);
}

function draw() {
  background(13, 30, 54);
  drawParticleIntro();
}

// ============================================================
// PARTICLE INTRO — setup
// Renders each letter into an off-screen buffer, samples pixels,
// and creates one particle per sampled point.
// ============================================================
function setupParticles() {
  particles       = [];
  letterPositions = [];
  introPhase      = 'assembling';
  taglineAlpha    = 0;
  solidAlpha      = 0;
  settledFrames   = 0;
  particlesReady  = false;

  let gap = 12;

  // ── Measure letter widths ──────────────────────────────────────────
  let widths = [], totalW = 0;
  let measure = createGraphics(10, 10);
  measure.textAlign(LEFT, BASELINE);
  for (let l of letters) {
    measure.textFont(l.fontName);
    measure.textSize(l.size);
    let w = measure.textWidth(l.char);
    widths.push(w);
    totalW += w;
  }
  measure.remove();
  totalW += gap * (letters.length - 1);

  let startX = width  / 2 - totalW / 2;
  let baseY  = height / 2;

  // ── Sample each letter ─────────────────────────────────────────────
  let step = 1; // sample every pixel for maximum density
  let curX = startX;

  for (let i = 0; i < letters.length; i++) {
    let l    = letters[i];
    let bufW = ceil(widths[i]) + 12;
    let bufH = ceil(l.size)    + 12;

    let pg = createGraphics(bufW, bufH);
    pg.pixelDensity(1);
    pg.background(0);
    pg.noStroke();
    pg.fill(255);
    pg.textAlign(LEFT, BASELINE);
    pg.textFont(l.fontName);
    pg.textSize(l.size);
    pg.text(l.char, 2, l.size);

    pg.loadPixels();

    let screenBaseX = curX - 2;
    let screenBaseY = baseY + l.size * 0.3 - l.size;

    for (let py = 0; py < bufH; py += step) {
      for (let px = 0; px < bufW; px += step) {
        let brightness = pg.pixels[(py * bufW + px) * 4];
        if (brightness > 110) {
          let tx = screenBaseX + px;
          let ty = screenBaseY  + py;

          let ang   = atan2(ty - height / 2, tx - width / 2) + random(-0.4, 0.4);
          let speed = random(14, 32);

          particles.push({
            x:  random(-50, width  + 50),
            y:  random(-50, height + 50),
            targetX: tx,
            targetY: ty,
            vx: random(-4, 4),
            vy: random(-4, 4),
            svx: cos(ang) * speed,
            svy: sin(ang) * speed,
            col: l.color,
            sz:  1.5,
          });
        }
      }
    }

    // Store screen position for solid-text rendering
    letterPositions.push({ x: curX, y: baseY + l.size * 0.3 });

    curX += widths[i] + gap;
    pg.remove();
  }

  particlesReady = true;
}

// ============================================================
// PARTICLE INTRO — draw (called every frame from draw())
// ============================================================
function drawParticleIntro() {
  if (!particlesReady) return;

  // ── Scroll → scatter / reassemble ───────────────────────────────────
  if (scrollY > 8 && introPhase !== 'scattering') {
    introPhase = 'scattering';
  }
  if (scrollY === 0 && introPhase === 'scattering') {
    for (let p of particles) {
      p.x  = random(-50, width  + 50);
      p.y  = random(-50, height + 50);
      p.vx = random(-4, 4);
      p.vy = random(-4, 4);
    }
    introPhase    = 'assembling';
    taglineAlpha  = 0;
    settledFrames = 0;
  }

  if (scrollY > windowHeight * 0.45 && introPhase !== 'scattering') return;

  // ── Update + draw particles ──────────────────────────────────────────
  noStroke();
  let settled     = 0;
  let currentCol  = '';

  for (let p of particles) {
    if (introPhase === 'assembling' || introPhase === 'settled') {
      p.vx += (p.targetX - p.x) * 0.055;
      p.vy += (p.targetY - p.y) * 0.055;
      p.vx *= 0.80;
      p.vy *= 0.80;
      p.x  += p.vx;
      p.y  += p.vy;

      let dx = p.targetX - p.x;
      let dy = p.targetY - p.y;
      if (abs(dx) < 1.5 && abs(dy) < 1.5) settled++;

    } else {
      p.vx += p.svx * 0.28;
      p.vy += p.svy * 0.28;
      p.x  += p.vx;
      p.y  += p.vy;
    }

    if (p.x < -60 || p.x > width + 60 || p.y < -60 || p.y > height + 60) continue;

    if (p.col !== currentCol) {
      fill(p.col);
      currentCol = p.col;
    }
    circle(p.x, p.y, p.sz);
  }

  // ── Phase transitions ────────────────────────────────────────────────
  if (introPhase === 'assembling') {
    if (settled / particles.length > 0.92) {
      settledFrames++;
      if (settledFrames > 40) introPhase = 'settled';
    } else {
      settledFrames = 0;
    }
  }

  // ── Tagline ──────────────────────────────────────────────────────────
  if (introPhase === 'settled') {
    taglineAlpha = min(taglineAlpha + 5, 255);
  } else if (introPhase === 'scattering') {
    taglineAlpha = max(taglineAlpha - 12, 0);
  }

  if (taglineAlpha > 0) {
    textFont('Playfair Display');
    textSize(22);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, taglineAlpha);
    text(tagline, width / 2, height / 2 + 130);
    textAlign(LEFT, BASELINE);
  }

  // ── Decorative images ─────────────────────────────────────────────────
  if (taglineAlpha > 0) {
    if (hokaImg) {
      let buf  = 60;
      let maxS = min(160, (width / 2) - buf, (height / 2) - buf);
      let camW = hokaImg.width  > hokaImg.height ? maxS : maxS * (hokaImg.width  / hokaImg.height);
      let camH = hokaImg.height > hokaImg.width  ? maxS : maxS * (hokaImg.height / hokaImg.width);
      let cx   = buf + camW / 2;
      let cy   = buf + camH / 2;
      let rot  = sin(frameCount * 0.025) * 0.10;
      push();
      translate(cx, cy);
      rotate(rot);
      tint(255, taglineAlpha);
      image(hokaImg, -camW / 2, -camH / 2, camW, camH);
      noTint();
      pop();
    }

    if (hokaWalkingImg) {
      let buf  = 60;
      let maxS = min(160, (width / 2) - buf, (height / 2) - buf);
      let runW = hokaWalkingImg.width  > hokaWalkingImg.height ? maxS : maxS * (hokaWalkingImg.width  / hokaWalkingImg.height);
      let runH = hokaWalkingImg.height > hokaWalkingImg.width  ? maxS : maxS * (hokaWalkingImg.height / hokaWalkingImg.width);
      let rx   = width  - buf - runW / 2;
      let ry   = height - buf - runH / 2;
      let rot  = sin(frameCount * 0.030 + 1.2) * 0.12;
      push();
      translate(rx, ry);
      rotate(rot);
      tint(255, taglineAlpha);
      image(hokaWalkingImg, -runW / 2, -runH / 2, runW, runH);
      noTint();
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  document.fonts.ready.then(setupParticles);
}
