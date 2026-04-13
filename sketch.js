// Running Through Boston
// ARTG-2262+63 Final Project
// Alexandra Katz

let letters = [
  { char: 'B', fontName: 'Bebas Neue',       color: '#FFE600', size: 160 },
  { char: 'O', fontName: 'Playfair Display', color: '#FF2D8B', size: 130 },
  { char: 'S', fontName: 'Lora',             color: '#1A56DB', size: 150 },
  { char: 'T', fontName: 'Bebas Neue',       color: '#E8000D', size: 175 },
  { char: 'O', fontName: 'Poppins',          color: '#5DB800', size: 125 },
  { char: 'N', fontName: 'EB Garamond',      color: '#FF6B00', size: 155 },
];

let tagline = "Come run with me.";
let scrollY = 0;
let dotOffset = 0;
let watchSeconds = 0;
let SCENE_H = 600;
let shoesImg;

// ── Particle intro ────────────────────────────────────────────────────
let particles      = [];   // flat array, sorted by letter so fill() batches
let particlesReady = false;
let introPhase     = 'assembling'; // 'assembling' | 'settled' | 'scattering'
let taglineAlpha   = 0;
let settledFrames  = 0;

// scene order:
// 0 = apartment / hokas
// 1 = watch
// 2 = charles river
// 3 = fenway

function preload() {
  shoesImg = loadImage('shoes.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(LEFT, BASELINE);

  let totalH = windowHeight + SCENE_H * 5;
  let scrollDiv = createDiv('');
  scrollDiv.style('height', totalH + 'px');
  scrollDiv.style('position', 'absolute');
  scrollDiv.style('top', '0');
  scrollDiv.style('width', '1px');

  let cnv = document.querySelector('canvas');
  cnv.style.position = 'fixed';
  cnv.style.top = '0';
  cnv.style.left = '0';

  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  // Wait for Google Fonts to be ready before sampling letter pixels
  document.fonts.ready.then(setupParticles);
}

function draw() {
  background(255);

  let scrollPast = scrollY - windowHeight * 0.4;

  let s0p = constrain(scrollPast / SCENE_H, 0, 1);
  let s0a = constrain(map(s0p, 0, 0.25, 0, 255), 0, 255);

  let s1p = constrain((scrollPast - SCENE_H) / SCENE_H, 0, 1);
  let s1a = constrain(map(s1p, 0, 0.25, 0, 255), 0, 255);

  let s2p = constrain((scrollPast - SCENE_H*2) / SCENE_H, 0, 1);
  let s2a = constrain(map(s2p, 0, 0.25, 0, 255), 0, 255);

  let s3p = constrain((scrollPast - SCENE_H*3) / SCENE_H, 0, 1);
  let s3a = constrain(map(s3p, 0, 0.25, 0, 255), 0, 255);

  if (s0a > 0) drawApartment(s0a, s0p);
  if (s1a > 0) drawWatch(s1a, s1p);
  if (s2a > 0) drawCharlesRiver(s2a, s2p);
  if (s3a > 0) drawFenway(s3a, s3p);

  drawParticleIntro();

  dotOffset += 1.5;
  if (dotOffset > 24) dotOffset = 0;

  // tick watch timer when watch scene is active
  if (s1a > 200) watchSeconds += 0.04;
}

// ============================================================
// SCENE 0 — APARTMENT / HOKAS
// ============================================================
function drawApartment(alpha, progress) {
  // warm golden background
  fill(245, 220, 170, alpha);
  noStroke();
  rect(0, 0, width, height);

  // golden light glow from above
  fill(255, 230, 130, alpha * 0.3);
  ellipse(width/2, height * 0.1, width * 0.8, height * 0.4);

  // wood floor — fill whole scene
  let planks = [
    [80, 60, 40], [90, 65, 42], [75, 55, 38],
    [95, 68, 44], [82, 62, 41], [88, 63, 43],
  ];
  let plankH = height / planks.length;
  for (let i = 0; i < planks.length; i++) {
    let c = planks[i];
    fill(c[0] + 100, c[1] + 80, c[2] + 50, alpha);
    noStroke();
    rect(0, i * plankH, width, plankH);
    // plank grain lines
    stroke(c[0] + 85, c[1] + 65, c[2] + 38, alpha * 0.4);
    strokeWeight(0.5);
    for (let x = 0; x < width; x += 80) {
      line(x, i * plankH, x + 40, (i+1) * plankH);
    }
  }
  noStroke();

  // warm light patch on floor where shoes are
  fill(255, 220, 100, alpha * 0.2);
  ellipse(width/2, height * 0.62, width * 0.5, height * 0.35);

  // ---- SHOES PHOTO ----
  // Size the image to fill the lower portion of the scene naturally.
  // Constrain to 65% of screen width or 80% of screen height, whichever fits.
  if (shoesImg) {
    let aspect = shoesImg.width / shoesImg.height;
    let maxW   = width * 0.65;
    let maxH   = height * 0.80;
    let imgW   = min(maxW, maxH * aspect);
    let imgH   = imgW / aspect;
    let imgX   = width / 2 - imgW / 2;
    let imgY   = height * 0.18;

    tint(255, alpha);
    image(shoesImg, imgX, imgY, imgW, imgH);
    noTint();
  }

  // ---- LABEL ----
  let labelAlpha = constrain(map(progress, 0.2, 0.5, 0, 255), 0, 255);
  textFont('Playfair Display');
  textSize(28);
  textAlign(CENTER, CENTER);
  fill(80, 50, 20, labelAlpha);
  text('lacing up.', width/2, height * 0.12);
  textAlign(LEFT, BASELINE);
}

// ============================================================
// SCENE 1 — APPLE WATCH
// ============================================================
function drawWatch(alpha, progress) {
  // outside — bright morning
  fill(200, 225, 245, alpha);
  noStroke();
  rect(0, 0, width, height);

  // soft ground
  fill(175, 195, 160, alpha);
  rect(0, height*0.65, width, height*0.35);

  // wrist / hand holding watch up
  let wx = width/2;
  let wy = height/2;
  let ww = min(width, height) * 0.38;
  let wh = ww * 1.18;

  // hand/wrist skin
  fill(195, 150, 110, alpha);
  noStroke();
  ellipse(wx, wy + wh*0.55, ww*1.1, wh*0.7);
  rect(wx - ww*0.38, wy, ww*0.76, wh*0.6);

  // watch band — cream/starlight
  fill(225, 215, 200, alpha);
  noStroke();
  rect(wx - ww*0.28, wy - wh*0.72, ww*0.56, wh*0.15, 4); // top band
  rect(wx - ww*0.28, wy + wh*0.08, ww*0.56, wh*0.18, 4); // bottom band

  // watch case — rounded rect, cream aluminum
  fill(218, 210, 198, alpha);
  noStroke();
  rect(wx - ww*0.38, wy - wh*0.58, ww*0.76, wh*0.66, ww*0.12);

  // digital crown — right side
  fill(200, 195, 185, alpha);
  rect(wx + ww*0.37, wy - wh*0.12, ww*0.06, wh*0.18, 3);

  // watch screen
  fill(10, 30, 12, alpha);
  noStroke();
  rect(wx - ww*0.32, wy - wh*0.52, ww*0.64, wh*0.54, ww*0.08);

  let sx = wx - ww*0.32; // screen left
  let sy = wy - wh*0.52; // screen top
  let sw = ww*0.64;      // screen width
  let sh = wh*0.54;      // screen height

  // ---- WATCH SCREEN CONTENT ----
  // time
  textFont('Bebas Neue');
  textSize(sw * 0.28);
  fill(255, 255, 255, alpha);
  textAlign(CENTER, CENTER);
  text('12:00', sx + sw/2, sy + sh*0.18);

  // top left icon circle
  fill(30, 60, 32, alpha);
  ellipse(sx + sw*0.22, sy + sh*0.18, sw*0.22, sw*0.22);
  fill(180, 220, 180, alpha);
  textSize(sw * 0.12);
  text('⊞', sx + sw*0.22, sy + sh*0.18);

  // top right icon circle
  fill(30, 60, 32, alpha);
  ellipse(sx + sw*0.78, sy + sh*0.18, sw*0.22, sw*0.22);
  stroke(180, 220, 180, alpha);
  strokeWeight(1.5);
  noFill();
  arc(sx + sw*0.78, sy + sh*0.18, sw*0.13, sw*0.13, -PI*0.8, PI*0.5);
  noStroke();

  // running figure icon — lime green
  fill(160, 230, 0, alpha);
  noStroke();
  // head
  ellipse(sx + sw*0.5, sy + sh*0.38, sw*0.09, sw*0.09);
  // body
  stroke(160, 230, 0, alpha);
  strokeWeight(2.5);
  // torso
  line(sx+sw*0.5, sy+sh*0.42, sx+sw*0.48, sy+sh*0.55);
  // left arm forward
  line(sx+sw*0.5, sy+sh*0.45, sx+sw*0.42, sy+sh*0.50);
  // right arm back
  line(sx+sw*0.5, sy+sh*0.45, sx+sw*0.57, sy+sh*0.52);
  // left leg
  line(sx+sw*0.48, sy+sh*0.55, sx+sw*0.43, sy+sh*0.65);
  // right leg forward
  line(sx+sw*0.48, sy+sh*0.55, sx+sw*0.56, sy+sh*0.63);
  noStroke();

  // Outdoor Run text
  textFont('Bebas Neue');
  textSize(sw * 0.14);
  fill(255, 255, 255, alpha);
  textAlign(CENTER, CENTER);
  text('Outdoor Run', sx + sw/2, sy + sh*0.72);

  // bottom buttons
  // left — shuffle
  fill(30, 70, 32, alpha);
  ellipse(sx + sw*0.2, sy + sh*0.88, sw*0.22, sw*0.22);
  stroke(180, 220, 180, alpha);
  strokeWeight(1.5);
  noFill();
  line(sx+sw*0.14, sy+sh*0.85, sx+sw*0.19, sy+sh*0.88);
  line(sx+sw*0.19, sy+sh*0.88, sx+sw*0.14, sy+sh*0.91);
  line(sx+sw*0.20, sy+sh*0.85, sx+sw*0.25, sy+sh*0.88);
  line(sx+sw*0.25, sy+sh*0.88, sx+sw*0.20, sy+sh*0.91);
  noStroke();

  // center — big green play button
  fill(160, 230, 0, alpha);
  ellipse(sx + sw*0.5, sy + sh*0.88, sw*0.28, sw*0.28);
  fill(10, 30, 12, alpha);
  triangle(
    sx+sw*0.46, sy+sh*0.83,
    sx+sw*0.46, sy+sh*0.93,
    sx+sw*0.57, sy+sh*0.88
  );

  // right — bell
  fill(30, 70, 32, alpha);
  ellipse(sx + sw*0.8, sy + sh*0.88, sw*0.22, sw*0.22);
  stroke(180, 220, 180, alpha);
  strokeWeight(1.5);
  noFill();
  arc(sx+sw*0.8, sy+sh*0.87, sw*0.10, sw*0.10, PI, TWO_PI);
  line(sx+sw*0.75, sy+sh*0.87, sx+sw*0.75, sy+sh*0.91);
  line(sx+sw*0.85, sy+sh*0.87, sx+sw*0.85, sy+sh*0.91);
  line(sx+sw*0.78, sy+sh*0.91, sx+sw*0.82, sy+sh*0.91);
  noStroke();

  // ---- LABEL ----
  let labelAlpha = constrain(map(progress, 0.2, 0.5, 0, 255), 0, 255);
  textFont('Playfair Display');
  textSize(28);
  textAlign(CENTER, CENTER);
  fill(40, 60, 40, labelAlpha);
  text("let's go.", width/2, height * 0.88);
  textAlign(LEFT, BASELINE);
}

// ============================================================
// SCENE 2 — CHARLES RIVER
// ============================================================
function drawCharlesRiver(alpha, progress) {
  let horizonY = height * 0.45;
  let bankY    = height * 0.65;
  let pathY    = bankY + 14;

  noStroke();
  fill(135, 195, 235, alpha);
  rect(0, 0, width, horizonY);

  fill(255, 255, 255, alpha);
  drawCloud(width*0.15, height*0.10, 130, 38, alpha);
  drawCloud(width*0.55, height*0.07, 160, 42, alpha);
  drawCloud(width*0.82, height*0.14, 100, 30, alpha);

  fill(80, 95, 115, alpha);
  noStroke();
  let blds = [
    [0.05,0.16],[0.09,0.11],[0.12,0.20],[0.155,0.13],[0.185,0.09],
    [0.21,0.14],[0.235,0.08],[0.26,0.11],
    [0.65,0.07],[0.68,0.09],[0.71,0.06],[0.74,0.08],
    [0.77,0.05],[0.85,0.07],[0.88,0.09],[0.91,0.06],
  ];
  for (let b of blds) rect(b[0]*width, horizonY-b[1]*height, width*0.028, b[1]*height);

  fill(55, 110, 60, alpha);
  for (let x = 0; x < width; x += 20) {
    let h = 18 + noise(x*0.08)*20;
    ellipse(x, horizonY-h*0.4, 24, h);
  }

  fill(80, 145, 195, alpha);
  noStroke();
  rect(0, horizonY, width, bankY-horizonY);

  stroke(100, 165, 210, alpha*0.6);
  strokeWeight(1.5);
  for (let i = 1; i <= 5; i++) {
    let wy = horizonY + (i/6)*(bankY-horizonY);
    for (let x = 0; x < width; x += 60) {
      let wx = x + (frameCount*0.4*(i%2===0?1:-1))%60;
      arc(wx, wy, 30, 8, PI, TWO_PI);
    }
  }
  noStroke();

  drawSailboat(width*0.22, horizonY+18, 1.0, alpha);
  drawSailboat(width*0.48, horizonY+12, 0.8, alpha);
  drawSailboat(width*0.68, horizonY+16, 0.9, alpha);

  fill(100, 170, 75, alpha);
  noStroke();
  beginShape();
  vertex(0, bankY);
  for (let x = 0; x <= width; x += 40) vertex(x, bankY+sin(x*0.018)*5);
  vertex(width, bankY);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  fill(210, 190, 150, alpha);
  noStroke();
  rect(0, pathY, width, 26);

  fill(255, 90, 40, alpha);
  noStroke();
  for (let x = -24+dotOffset; x < width+24; x += 24) ellipse(x, pathY+13, 7, 7);

  fill(70, 140, 55, alpha);
  noStroke();
  rect(0, pathY+26, width, height);

  let labelAlpha = constrain(map(progress, 0.2, 0.5, 0, 255), 0, 255);
  textFont('Playfair Display');
  textSize(62);
  textAlign(CENTER, CENTER);
  fill(255, 255, 255, labelAlpha);
  text('The Charles River', width/2, height*0.87);
  textAlign(LEFT, BASELINE);
}

// ============================================================
// SCENE 3 — FENWAY PARK
// ============================================================
function drawFenway(alpha, progress) {
  let sidewalkY = height * 0.78;
  let buildingTop = height * 0.38;
  let buildingBot = sidewalkY;
  let bldL = width * 0.04;
  let bldR = width * 0.72;

  noStroke();
  fill(160, 200, 230, alpha);
  rect(0, 0, width, sidewalkY);
  drawCloud(width*0.08, height*0.07, 130, 35, alpha);
  drawCloud(width*0.55, height*0.05, 160, 38, alpha);

  stroke(80, 100, 80, alpha);
  strokeWeight(6);
  line(width*0.82, height*0.10, width*0.82, sidewalkY);
  line(width*0.90, height*0.14, width*0.90, sidewalkY);
  strokeWeight(3);
  for (let y = 0.20; y < 0.75; y += 0.10) line(width*0.82, height*y, width*0.90, height*y);
  noStroke();
  fill(70, 90, 70, alpha);
  rect(width*0.79, height*0.10, width*0.06, height*0.03, 2);
  rect(width*0.87, height*0.14, width*0.06, height*0.03, 2);

  let signL   = width*0.10, signR = width*0.75;
  let signTop = height*0.04, signBot = height*0.34;

  fill(34, 100, 55, alpha);
  noStroke();
  rect(signL, signBot-height*0.25, width*0.04, height*0.25);
  rect(signR-width*0.04, signBot-height*0.25, width*0.04, height*0.25);
  rect(width*0.40, signBot-height*0.20, width*0.04, height*0.20);
  rect(signL, signBot-height*0.25, signR-signL, height*0.025);
  rect(signL, signBot-height*0.14, signR-signL, height*0.018);

  fill(34, 110, 58, alpha);
  noStroke();
  rect(signL, signTop, signR-signL, signBot-signTop-height*0.02, 4);
  stroke(20, 80, 40, alpha);
  strokeWeight(4);
  noFill();
  rect(signL+6, signTop+6, signR-signL-12, signBot-signTop-height*0.02-12, 3);
  noStroke();

  drawSock(signL+width*0.07, signTop+(signBot-signTop)*0.42, 38, alpha);
  drawSock(signR-width*0.07, signTop+(signBot-signTop)*0.42, 38, alpha);

  fill(255, 255, 255, alpha);
  textFont('Bebas Neue');
  textAlign(CENTER, CENTER);
  textSize(22);
  text('FENWAY PARK', width*0.42, signTop+(signBot-signTop)*0.20);
  textSize(16);
  fill(220, 220, 220, alpha);
  text('HOME OF THE', width*0.42, signTop+(signBot-signTop)*0.33);
  fill(220, 30, 30, alpha);
  textSize(48);
  text('BOSTON', width*0.42, signTop+(signBot-signTop)*0.55);
  textSize(44);
  text('RED SOX', width*0.42, signTop+(signBot-signTop)*0.76);

  fill(155, 72, 48, alpha);
  noStroke();
  rect(bldL, buildingTop, bldR-bldL, buildingBot-buildingTop);
  drawBricks(bldL, buildingTop, bldR-bldL, buildingBot-buildingTop, alpha);

  let winW = (bldR-bldL)*0.18, winH = (buildingBot-buildingTop)*0.28;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      let wx = bldL+(bldR-bldL)*(0.08+c*0.23);
      let wy = buildingTop+(buildingBot-buildingTop)*(0.12+r*0.48);
      fill(30, 35, 40, alpha); noStroke();
      rect(wx, wy, winW, winH, 2);
      stroke(50, 55, 60, alpha); strokeWeight(2);
      line(wx+winW/2, wy, wx+winW/2, wy+winH);
      line(wx, wy+winH/2, wx+winW, wy+winH/2);
      noStroke();
      fill(180, 200, 220, alpha*0.25);
      rect(wx+3, wy+3, winW*0.45, winH*0.45);
    }
  }

  fill(25, 30, 35, alpha); noStroke();
  rect(bldL+(bldR-bldL)*0.44, buildingBot-height*0.18, width*0.10, height*0.18, 2,2,0,0);
  arc(bldL+(bldR-bldL)*0.44+width*0.05, buildingBot-height*0.18, width*0.10, height*0.06, PI, TWO_PI);

  fill(34, 100, 55, alpha); noStroke();
  rect(bldL+(bldR-bldL)*0.38, buildingBot-height*0.22, width*0.14, height*0.04, 2);
  fill(255,255,255,alpha);
  textFont('Bebas Neue'); textSize(14); textAlign(CENTER,CENTER);
  text('FENWAY PARK', bldL+(bldR-bldL)*0.45, buildingBot-height*0.20);

  stroke(60,55,50,alpha); strokeWeight(3);
  line(width*0.08, buildingBot, width*0.08, buildingBot-height*0.22);
  line(width*0.08, buildingBot-height*0.22, width*0.11, buildingBot-height*0.22);
  noStroke(); fill(240,230,180,alpha);
  ellipse(width*0.11, buildingBot-height*0.22, 14, 10);

  fill(185, 175, 160, alpha); noStroke();
  rect(0, sidewalkY, width, height-sidewalkY);
  stroke(165,155,140,alpha*0.5); strokeWeight(1);
  for (let x = 0; x < width; x += 55) line(x, sidewalkY, x, height);
  noStroke();

  fill(255, 90, 40, alpha); noStroke();
  for (let x = -24+dotOffset; x < width+24; x += 24) ellipse(x, sidewalkY+18, 7, 7);

  let labelAlpha = constrain(map(progress, 0.2, 0.5, 0, 255), 0, 255);
  textFont('Playfair Display'); textSize(62);
  textAlign(CENTER, CENTER);
  fill(255, 255, 255, labelAlpha);
  text('Fenway Park', width/2, height*0.91);
  textAlign(LEFT, BASELINE);
}

// ============================================================
// SHARED HELPERS
// ============================================================
function drawCloud(cx, cy, w, h, alpha) {
  fill(255,255,255,alpha); noStroke();
  ellipse(cx, cy, w, h);
  ellipse(cx+w*0.28, cy+h*0.12, w*0.65, h*0.75);
  ellipse(cx-w*0.25, cy+h*0.12, w*0.55, h*0.70);
  ellipse(cx+w*0.05, cy+h*0.22, w*0.80, h*0.60);
}

function drawSailboat(x, y, scale, alpha) {
  let s = scale; noStroke();
  fill(160, 80, 30, alpha);
  beginShape();
  vertex(x-28*s,y); vertex(x+28*s,y);
  vertex(x+20*s,y+14*s); vertex(x-20*s,y+14*s);
  endShape(CLOSE);
  fill(200,110,50,alpha);
  rect(x-28*s, y, 56*s, 4*s);
  stroke(60,45,30,alpha); strokeWeight(2.5*s);
  line(x, y, x, y-70*s); noStroke();
  fill(250,250,250,alpha*0.95);
  beginShape();
  vertex(x+1,y-68*s); vertex(x+1,y-2); vertex(x+38*s,y-10*s);
  endShape(CLOSE);
  fill(220,235,250,alpha*0.9);
  beginShape();
  vertex(x-1,y-55*s); vertex(x-1,y-2); vertex(x-30*s,y-8*s);
  endShape(CLOSE);
}

function drawBricks(x, y, w, h, alpha) {
  let bw = 42, bh = 16; noStroke();
  for (let row = 0; row*bh < h; row++) {
    let offsetX = (row%2===0) ? 0 : bw/2;
    for (let col = -1; col*bw < w+bw; col++) {
      let vary = (row*7+col*3)%20-10;
      fill(165+vary, 72+vary*0.3, 48, alpha);
      stroke(125,50,32,alpha*0.4); strokeWeight(1);
      rect(x+col*bw+offsetX+1, y+row*bh+1, bw-2, bh-2, 1);
    }
  }
  noStroke();
}

function drawSock(cx, cy, size, alpha) {
  fill(220,30,30,alpha); noStroke();
  ellipse(cx, cy-size*0.2, size*0.55, size*0.7);
  rect(cx-size*0.27, cy, size*0.55, size*0.35);
  ellipse(cx+size*0.05, cy+size*0.35, size*0.45, size*0.25);
  fill(255,255,255,alpha);
  rect(cx-size*0.27, cy+size*0.05, size*0.55, size*0.08);
  rect(cx-size*0.27, cy+size*0.18, size*0.55, size*0.08);
}

// ============================================================
// INTRO
// ============================================================
// ============================================================
// PARTICLE INTRO — setup
// Renders each letter into an off-screen buffer, samples pixels,
// and creates one particle per sampled point.
// ============================================================
function setupParticles() {
  particles      = [];
  introPhase     = 'assembling';
  taglineAlpha   = 0;
  settledFrames  = 0;
  particlesReady = false;

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
  let step = 4; // ~3 000 particles total across all letters
  let curX = startX;

  for (let i = 0; i < letters.length; i++) {
    let l    = letters[i];
    let bufW = ceil(widths[i]) + 12;
    let bufH = ceil(l.size)    + 12;

    // Render white letter on black buffer, pixelDensity 1 so indices are 1:1
    let pg = createGraphics(bufW, bufH);
    pg.pixelDensity(1);
    pg.background(0);
    pg.noStroke();
    pg.fill(255);
    pg.textAlign(LEFT, BASELINE);
    pg.textFont(l.fontName);
    pg.textSize(l.size);
    pg.text(l.char, 2, l.size); // baseline at y = l.size inside buffer

    pg.loadPixels();

    // Buffer baseline (l.size) maps to screen baseline (baseY + l.size*0.3)
    let screenBaseX = curX - 2;
    let screenBaseY = baseY + l.size * 0.3 - l.size;

    for (let py = 0; py < bufH; py += step) {
      for (let px = 0; px < bufW; px += step) {
        let brightness = pg.pixels[(py * bufW + px) * 4]; // R channel
        if (brightness > 110) {
          let tx = screenBaseX + px;
          let ty = screenBaseY  + py;

          // Scatter direction: radially away from canvas centre + small wobble
          let ang   = atan2(ty - height / 2, tx - width / 2) + random(-0.4, 0.4);
          let speed = random(14, 32);

          particles.push({
            x:  random(-50, width  + 50), // start anywhere off or on screen
            y:  random(-50, height + 50),
            targetX: tx,
            targetY: ty,
            vx: random(-4, 4),
            vy: random(-4, 4),
            svx: cos(ang) * speed,  // pre-baked scatter impulse
            svy: sin(ang) * speed,
            col: l.color,           // hex string — fill() accepts these
            sz:  random(2, 4),
          });
        }
      }
    }

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
    // User scrolled back to top — reset and reassemble
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

  // Hide entirely once scrolled well past the intro
  if (scrollY > windowHeight * 0.45 && introPhase !== 'scattering') return;

  // ── Update + draw particles ──────────────────────────────────────────
  noStroke();
  let settled     = 0;
  let currentCol  = '';

  for (let p of particles) {
    // ── Physics ──────────────────────────────────────────────────────
    if (introPhase === 'assembling' || introPhase === 'settled') {
      // Spring toward target
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
      // Scatter: apply pre-baked impulse every frame (builds up quickly)
      p.vx += p.svx * 0.28;
      p.vy += p.svy * 0.28;
      p.x  += p.vx;
      p.y  += p.vy;
    }

    // ── Draw (skip if off-screen) ─────────────────────────────────────
    if (p.x < -60 || p.x > width + 60 || p.y < -60 || p.y > height + 60) continue;

    // Batch fill calls — particles are stored in letter order so
    // color only changes 6 times per frame
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
    fill(80, 80, 80, taglineAlpha);
    text(tagline, width / 2, height / 2 + 130);
    textAlign(LEFT, BASELINE);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Rebuild particles for new canvas dimensions
  document.fonts.ready.then(setupParticles);
}
