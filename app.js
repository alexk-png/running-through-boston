// app.js — Running Through Boston
// Screens 2 (Route Selector), 3 (Mapbox Map), 4 (Photo Collage)

// ─────────────────────────────────────────────────────────────────────
// ROUTE DATA
// ─────────────────────────────────────────────────────────────────────
const ROUTES = {
  fens: {
    label: 'Back Bay Fens',
    distances: {
      '2 mi': {
        outAndBack: true,
        name: 'Fens Loop',
        center: [-71.09725, 42.34168],
        zoom: 15.0,
        coords: [
          [-71.09195, 42.34282],
          [-71.09241, 42.34175],
          [-71.09368, 42.34107],
          [-71.09508, 42.34063],
          [-71.09649, 42.33998],
          [-71.09743, 42.33904],
          [-71.09878, 42.33928],
          [-71.09977, 42.34018],
          [-71.10104, 42.34078],
          [-71.10207, 42.34172],
          [-71.10299, 42.34270],
          [-71.10201, 42.34254],
          [-71.10108, 42.34157],
          [-71.09989, 42.34074],
          [-71.09865, 42.34049],
          [-71.09825, 42.33963],
          [-71.09701, 42.34032],
          [-71.09595, 42.34087],
          [-71.09554, 42.34157],
          [-71.09534, 42.34213],
          [-71.09441, 42.34226],
          [-71.09412, 42.34117],
          [-71.09280, 42.34112],
          [-71.09202, 42.34207],
          [-71.09195, 42.34282]
        ]
      },
      '3 mi': {
        outAndBack: true,
        name: 'Fens & Audubon',
        center: [-71.09984, 42.34350],
        zoom: 14.3,
        coords: [
          [-71.08934, 42.34641],
          [-71.09091, 42.34638],
          [-71.09095, 42.34443],
          [-71.09198, 42.34286],
          [-71.09304, 42.34138],
          [-71.09519, 42.34156],
          [-71.09749, 42.34141],
          [-71.09945, 42.34066],
          [-71.10121, 42.34188],
          [-71.10277, 42.34330],
          [-71.10448, 42.34406],
          [-71.10636, 42.34301],
          [-71.10789, 42.34195],
          [-71.10988, 42.34109],
          [-71.11034, 42.34058],
          [-71.10847, 42.34160],
          [-71.10782, 42.34287],
          [-71.10608, 42.34392],
          [-71.10419, 42.34431],
          [-71.10257, 42.34309],
          [-71.10104, 42.34154],
          [-71.09905, 42.34053],
          [-71.09695, 42.34164],
          [-71.09449, 42.34126],
          [-71.09207, 42.34160],
          [-71.08934, 42.34641]
        ]
      },
      '4 mi': {
        outAndBack: true,
        name: 'Fens & Riverway',
        center: [-71.10158, 42.34019],
        zoom: 14.0,
        coords: [
          [-71.09175, 42.34320],
          [-71.09319, 42.34126],
          [-71.09614, 42.34020],
          [-71.09841, 42.33918],
          [-71.10069, 42.34069],
          [-71.10271, 42.34242],
          [-71.10402, 42.34405],
          [-71.10586, 42.34407],
          [-71.10833, 42.34259],
          [-71.11050, 42.34084],
          [-71.11129, 42.33855],
          [-71.11141, 42.33636],
          [-71.11013, 42.33630],
          [-71.11086, 42.33836],
          [-71.11030, 42.34062],
          [-71.10772, 42.34193],
          [-71.10544, 42.34350],
          [-71.10294, 42.34333],
          [-71.10076, 42.34136],
          [-71.09820, 42.34084],
          [-71.09609, 42.34217],
          [-71.09579, 42.34314],
          [-71.09889, 42.34237],
          [-71.09632, 42.34309],
          [-71.09471, 42.34267],
          [-71.09175, 42.34320]
        ]
      },
      '5 mi': {
        outAndBack: true,
        name: 'Fens to Longwood',
        center: [-71.10121, 42.34081],
        zoom: 13.8,
        coords: [
          [-71.09196, 42.34311],
          [-71.09423, 42.34087],
          [-71.09730, 42.33909],
          [-71.10017, 42.34048],
          [-71.10288, 42.34255],
          [-71.10647, 42.33959],
          [-71.10914, 42.33853],
          [-71.11033, 42.34046],
          [-71.11142, 42.33836],
          [-71.11126, 42.33570],
          [-71.11097, 42.33742],
          [-71.11045, 42.34013],
          [-71.10740, 42.34204],
          [-71.10458, 42.34401],
          [-71.10180, 42.34235],
          [-71.09902, 42.34053],
          [-71.09569, 42.34196],
          [-71.09515, 42.34059],
          [-71.09793, 42.33895],
          [-71.09644, 42.34071],
          [-71.09467, 42.34253],
          [-71.09269, 42.34435],
          [-71.09353, 42.34569],
          [-71.09100, 42.34592],
          [-71.09166, 42.34319],
          [-71.09196, 42.34311]
        ]
      },
      '6 mi': {
        outAndBack: true,
        name: 'Fens to Olmsted Park',
        center: [-71.10309, 42.33581],
        zoom: 13.2,
        coords: [
          [-71.09152, 42.34327],
          [-71.09486, 42.34066],
          [-71.09870, 42.33926],
          [-71.10200, 42.34164],
          [-71.10440, 42.34406],
          [-71.10762, 42.34298],
          [-71.11073, 42.34050],
          [-71.11182, 42.33721],
          [-71.11237, 42.33428],
          [-71.11286, 42.33346],
          [-71.11418, 42.33029],
          [-71.11570, 42.32697],
          [-71.11634, 42.32569],
          [-71.11488, 42.32883],
          [-71.11342, 42.33189],
          [-71.11124, 42.33492],
          [-71.11138, 42.33829],
          [-71.10968, 42.34155],
          [-71.10619, 42.34385],
          [-71.10283, 42.34326],
          [-71.09946, 42.34058],
          [-71.09523, 42.34215],
          [-71.09420, 42.34541],
          [-71.09089, 42.34593],
          [-71.08984, 42.34429],
          [-71.09152, 42.34327]
        ]
      }
    },
    photos: ['fens1.jpeg', 'fens2.jpeg', 'fens3.jpeg']
  },

  charles: {
    label: 'The Charles River',
    distances: {
      '3 mi': {
        // GPS trace sourced directly from Strava GPX file (real Apple Watch run).
        // Boston Esplanade near Harvard Bridge → NW across Harvard Bridge →
        // east along Memorial Drive (Cambridge) → south across Longfellow Bridge →
        // SW along Boston Esplanade back to start.
        outAndBack: true,
        name: 'Harvard Bridge — Longfellow Loop',
        center: [-71.0824, 42.3546],
        zoom: 13.5,
        coords: [
          [-71.08794, 42.34729],  // Start: Boston Esplanade near Harvard Bridge foot
          [-71.08867, 42.34904],  // NW along Esplanade toward Harvard Bridge
          [-71.08936, 42.35044],  // Continuing NW
          [-71.09004, 42.35226],  // Boston approach to Harvard Bridge
          [-71.09081, 42.35378],  // On Harvard Bridge (crossing north)
          [-71.09156, 42.35528],  // Mid-bridge
          [-71.09232, 42.35686],  // Cambridge side — Harvard Bridge foot
          [-71.09040, 42.35769],  // East on Memorial Drive (Cambridge)
          [-71.08853, 42.35834],  // East on Memorial Drive
          [-71.08658, 42.35899],  // East
          [-71.08473, 42.35959],  // East
          [-71.08280, 42.36021],  // Mid Memorial Drive
          [-71.08077, 42.36066],  // East
          [-71.07887, 42.36094],  // Approaching Longfellow Bridge
          [-71.07830, 42.36185],  // Longfellow Bridge — Cambridge approach
          [-71.07638, 42.36168],  // Crossing Longfellow Bridge
          [-71.07449, 42.36155],  // Mid-bridge
          [-71.07239, 42.36139],  // Boston side — Longfellow Bridge foot
          [-71.07248, 42.36063],  // Turning south on Boston Esplanade
          [-71.07293, 42.35924],  // South along Boston Esplanade
          [-71.07349, 42.35778],  // SW on Esplanade
          [-71.07500, 42.35715],  // SW
          [-71.07657, 42.35624],  // SW
          [-71.07842, 42.35565],  // SW — Hatch Shell area
          [-71.08025, 42.35514],  // SW
          [-71.08213, 42.35462],  // SW
          [-71.08407, 42.35412],  // SW
          [-71.08522, 42.35309],  // SW approaching Harvard Bridge
          [-71.08706, 42.35246],  // SW
          [-71.08794, 42.34729]   // Return to start
        ]
      },
      '4 mi': {
        outAndBack: true,
        name: 'Esplanade to Longfellow',
        center: [-71.08488, 42.35784],
        zoom: 13.5,
        coords: [
          [-71.09027, 42.35218],
          [-71.08978, 42.35138],
          [-71.08870, 42.35221],
          [-71.08579, 42.35300],
          [-71.08366, 42.35419],
          [-71.08072, 42.35499],
          [-71.07782, 42.35585],
          [-71.07518, 42.35709],
          [-71.07315, 42.35852],
          [-71.07302, 42.36075],
          [-71.07287, 42.36299],
          [-71.07150, 42.36482],
          [-71.07290, 42.36329],
          [-71.07334, 42.35814],
          [-71.07542, 42.35689],
          [-71.07817, 42.35579],
          [-71.08108, 42.35487],
          [-71.08407, 42.35410],
          [-71.08612, 42.35277],
          [-71.08914, 42.35220],
          [-71.09227, 42.35177],
          [-71.09519, 42.35086],
          [-71.09302, 42.35148],
          [-71.08977, 42.35210],
          [-71.09027, 42.35218]
        ]
      },
      '8 mi': {
        outAndBack: true,
        name: 'Full Charles Loop — Allston',
        center: [-71.09361, 42.35525],
        zoom: 12.8,
        coords: [
          [-71.08817, 42.34764],
          [-71.08981, 42.35216],
          [-71.08448, 42.35395],
          [-71.07857, 42.35558],
          [-71.07343, 42.35788],
          [-71.07298, 42.36251],
          [-71.07294, 42.36286],
          [-71.07343, 42.35802],
          [-71.07831, 42.35570],
          [-71.08392, 42.35416],
          [-71.08893, 42.35224],
          [-71.09477, 42.35099],
          [-71.10098, 42.35124],
          [-71.10728, 42.35167],
          [-71.11427, 42.35264],
          [-71.11025, 42.35193],
          [-71.10394, 42.35139],
          [-71.09765, 42.35096],
          [-71.09171, 42.35184],
          [-71.08563, 42.35282],
          [-71.08115, 42.35417],
          [-71.08673, 42.35279],
          [-71.08882, 42.34957],
          [-71.08305, 42.35028],
          [-71.08612, 42.34867],
          [-71.08817, 42.34764]
        ]
      }
    },
    photos: ['charles1.jpeg', 'charles2.jpeg', 'charles3.jpeg', 'charles4.jpeg']
  },

  commave: {
    label: 'Commonwealth Avenue',
    distances: {
      '4 mi': {
        outAndBack: true,
        name: 'Esplanade to Beacon Hill',
        center: [-71.07664, 42.35178],
        zoom: 13.5,
        coords: [
          [-71.08807, 42.34738],
          [-71.08672, 42.34936],
          [-71.08301, 42.35031],
          [-71.07947, 42.35128],
          [-71.07655, 42.35204],
          [-71.07302, 42.35302],
          [-71.07091, 42.35285],
          [-71.06815, 42.35278],
          [-71.06932, 42.35538],
          [-71.07121, 42.35456],
          [-71.07067, 42.35213],
          [-71.06782, 42.35309],
          [-71.06750, 42.35520],
          [-71.06887, 42.35618],
          [-71.06683, 42.35467],
          [-71.06493, 42.35473],
          [-71.06671, 42.35312],
          [-71.06867, 42.35461],
          [-71.07090, 42.35581],
          [-71.07406, 42.35495],
          [-71.07675, 42.35390],
          [-71.07907, 42.35274],
          [-71.08223, 42.35187],
          [-71.08425, 42.35061],
          [-71.08741, 42.34969],
          [-71.08807, 42.34738]
        ]
      },
      '5 mi': {
        outAndBack: true,
        name: 'Esplanade to North End',
        center: [-71.06959, 42.35852],
        zoom: 13.0,
        coords: [
          [-71.08487, 42.35314],
          [-71.08168, 42.35468],
          [-71.07782, 42.35585],
          [-71.07418, 42.35720],
          [-71.07262, 42.36005],
          [-71.07285, 42.36308],
          [-71.07027, 42.36476],
          [-71.06810, 42.36716],
          [-71.06527, 42.36812],
          [-71.06391, 42.36539],
          [-71.06091, 42.36581],
          [-71.05756, 42.36771],
          [-71.05387, 42.36771],
          [-71.05106, 42.36569],
          [-71.05096, 42.36262],
          [-71.05467, 42.36068],
          [-71.05688, 42.35909],
          [-71.05974, 42.35871],
          [-71.06204, 42.35661],
          [-71.06594, 42.35504],
          [-71.06993, 42.35412],
          [-71.07354, 42.35316],
          [-71.07685, 42.35197],
          [-71.08069, 42.35092],
          [-71.08444, 42.34994],
          [-71.08487, 42.35314]
        ]
      }
    },
    photos: ['fenway1.jpeg', 'fenway2.jpeg']
  }
};

// ─────────────────────────────────────────────────────────────────────
// PHOTO DESCRIPTIONS
// ─────────────────────────────────────────────────────────────────────
// Photos that should show center of image rather than bottom
const CENTER_CROP = new Set(['fens3.jpeg', 'charles1.jpeg', 'charles2.jpeg', 'charles3.jpeg']);

const DESCRIPTIONS = {
  'charles1.jpeg': 'Took this image on one of my runs as the spring approached. Being able to go from freezing to sweating on my runs was super exciting. I also love seeing how everyone lays out on the docks.',
  'charles2.jpeg': 'This picture is taken near the Charles Eliot Memorial — this stretch of the Charles River is one of my favorite parts.',
  'charles3.jpeg': 'I captured this moment of the river peaking through the trees. This image to me looks like a window revealing the Charles — taken near the esplanade exercise course.',
  'charles4.jpeg': 'Whenever I need to clear my head or escape the rush of my day, I go watch the sunset. My favorite place to go is the Harvard Bridge.',
  'fens1.jpeg':    'I took this image after a huge snow storm. Being from Florida, this was a huge shock but an exciting moment — I had never experienced so much snow!',
  'fens2.jpeg':    'I found the reflection of the trees to almost resemble a portrait. I really liked this image and felt a stillness.',
  'fens3.jpeg':    '',
  'fenway1.jpeg':  'I love the architecture of the brownstones in Boston. I recently took this image on a run.',
  'fenway2.jpeg':  'Running past Whoop always gives me a boost of energy and motivation. Whoop is a dream company to work at and passing the buildings makes me want to continue to push myself.'
};

const DISTANCE_OPTIONS = {
  fens:    ['2 mi', '3 mi', '4 mi', '5 mi', '6 mi'],
  charles: ['3 mi', '4 mi', '8 mi'],
  commave: ['4 mi', '5 mi']
};

// Photo collage layouts — top/left/width as % viewport, rotation in deg
// All photos sit on the left side so the centered route title stays clear.
// Route-specific layouts take priority; count-based are fallbacks.
const LAYOUTS = {
  // ── route-specific ──────────────────────────────────────────────────
  fens: [
    { top:  4, left:  2, w: 21, rot: -3.5 },
    { top: 36, left:  3, w: 21, rot:  3.0 },
    { top: 67, left:  2, w: 20, rot: -2.5 }
  ],
  charles: [
    { top:  3, left:  2, w: 19, rot: -3.0 },
    { top: 25, left:  3, w: 19, rot:  3.5 },
    { top: 48, left:  2, w: 19, rot: -2.5 },
    { top: 70, left:  3, w: 19, rot:  3.0 }
  ],
  commave: [
    { top:  8, left:  2, w: 22, rot: -3.5 },
    { top: 55, left:  3, w: 22, rot:  3.0 }
  ],
  // ── count-based fallbacks ────────────────────────────────────────────
  4: [
    { top:  5, left:  2, w: 21, rot: -3.5 },
    { top:  4, left: 24, w: 19, rot:  4.0 },
    { top: 58, left:  2, w: 19, rot:  3.5 },
    { top: 57, left: 23, w: 21, rot: -3.0 }
  ],
  3: [
    { top:  4, left:  2, w: 21, rot: -3.5 },
    { top: 36, left:  3, w: 21, rot:  3.0 },
    { top: 67, left:  2, w: 20, rot: -2.5 }
  ],
  2: [
    { top:  5, left:  2, w: 21, rot: -3.5 },
    { top: 58, left:  3, w: 21, rot:  4.0 }
  ]
};

// ─────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────
let chosenRoute  = null;
let chosenDist   = null;
let mapInstance  = null;
let screen2Shown = false;
let useKm        = false;

// Convert a "X mi" string to a display label in the current unit
function distLabel(miStr) {
  if (!useKm) return miStr;
  const miles   = parseFloat(miStr);
  const km      = Math.round(miles * 1.60934 * 10) / 10;
  return (km % 1 === 0 ? km.toFixed(0) : km.toFixed(1)) + ' km';
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 2 — ROUTE SELECTOR
// ─────────────────────────────────────────────────────────────────────
function maybeShowScreen2() {
  if (screen2Shown) return;
  if (typeof introPhase !== 'undefined' &&
      (introPhase === 'settled' || introPhase === 'scattering') &&
      window.scrollY > 60) {
    screen2Shown = true;
    document.getElementById('screen2').classList.add('visible');
    document.body.style.overflow = 'hidden';
  }
}
setInterval(maybeShowScreen2, 150);

function backToCover() {
  if (!screen2Shown) return;
  screen2Shown = false;

  // Reset selection state
  chosenRoute = null;
  chosenDist  = null;
  document.querySelectorAll('.route-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('distance-section').classList.remove('visible');
  document.getElementById('lets-go-btn').classList.remove('visible');

  // Fade out screen 2
  const s2 = document.getElementById('screen2');
  s2.classList.remove('visible');

  // Re-enable scroll and jump to top so particles reassemble
  document.body.style.overflow = '';
  window.scrollTo(0, 0);
}

// Scroll up on screen 2 → return to cover
window.addEventListener('wheel', (e) => {
  if (screen2Shown && e.deltaY < 0) backToCover();
});

// Touch swipe down (= scroll up) on screen 2 → return to cover
let _touchStartY = 0;
window.addEventListener('touchstart', (e) => { _touchStartY = e.touches[0].clientY; }, { passive: true });
window.addEventListener('touchend', (e) => {
  if (screen2Shown && (e.changedTouches[0].clientY - _touchStartY) > 50) backToCover();
});

// ── Miles / KM toggle ─────────────────────────────────────────────────
document.querySelectorAll('.unit-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    useKm = btn.dataset.unit === 'km';
    document.querySelectorAll('.unit-btn').forEach(b => b.classList.toggle('active', b.dataset.unit === (useKm ? 'km' : 'mi')));
    // Re-render distance buttons in the new unit if a route is already selected
    if (chosenRoute) {
      chosenDist = null;
      document.querySelectorAll('.dist-btn').forEach(b => b.classList.remove('selected'));
      document.getElementById('lets-go-btn').classList.remove('visible');
      renderDistanceButtons();
    }
  });
});

// ── "← Change route" button inside distance section ───────────────────
document.getElementById('change-route-btn').addEventListener('click', () => {
  chosenRoute = null;
  chosenDist  = null;
  document.querySelectorAll('.route-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('distance-section').classList.remove('visible');
  document.getElementById('lets-go-btn').classList.remove('visible');
});

// Route buttons
document.querySelectorAll('.route-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.route-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    chosenRoute = btn.dataset.route;
    chosenDist  = null;
    renderDistanceButtons();
    document.getElementById('lets-go-btn').classList.remove('visible');
  });
});

function renderDistanceButtons() {
  const section  = document.getElementById('distance-section');
  const container = document.getElementById('dist-btns');
  container.innerHTML = '';

  DISTANCE_OPTIONS[chosenRoute].forEach(d => {
    const btn = document.createElement('button');
    btn.className   = 'dist-btn';
    btn.textContent = distLabel(d);   // display in current unit
    btn.dataset.dist = d;             // internal miles key stays unchanged
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dist-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      chosenDist = d;                 // always store the miles key internally
      document.getElementById('lets-go-btn').classList.add('visible');
    });
    container.appendChild(btn);
  });

  section.classList.add('visible');
}

document.getElementById('lets-go-btn').addEventListener('click', () => {
  if (!chosenRoute || !chosenDist) return;
  transitionToMap();
});

// ── "← Back" button on the map screen ────────────────────────────────
document.getElementById('map-back-btn').addEventListener('click', () => {
  backToScreen2();
});

function backToScreen2() {
  // Clear photo collage
  const s4 = document.getElementById('screen4');
  s4.querySelectorAll('.photo-card').forEach(c => c.classList.remove('show'));
  setTimeout(() => { s4.innerHTML = ''; }, 600);

  // Fade out map screen
  const s3 = document.getElementById('screen3');
  s3.classList.remove('visible');

  // Destroy map instance so it can be recreated cleanly next time
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
  document.getElementById('route-label').classList.remove('visible');

  // Reset distance selection only — keep the route so user lands
  // straight on the "How far?" step to change it or pick a new one
  chosenDist = null;
  document.querySelectorAll('.dist-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('lets-go-btn').classList.remove('visible');

  // Re-show Screen 2
  const s2 = document.getElementById('screen2');
  s2.style.display  = '';
  s2.style.opacity  = '';
  s2.style.pointerEvents = '';
  setTimeout(() => s2.classList.add('visible'), 50);
}

// ─────────────────────────────────────────────────────────────────────
// SCREEN 3 — MAPBOX MAP
// ─────────────────────────────────────────────────────────────────────

// Returns the 0–1 progress value along the line where the x direction
// (longitude) reverses — i.e. where the runner turns around.
// Heading west → turnaround is the westernmost (min longitude) point.
// Heading east → turnaround is the easternmost (max longitude) point.
function findTurnaroundProgress(coords) {
  if (coords.length < 4) return 0.5;

  const quarterIdx = Math.max(1, Math.floor(coords.length * 0.25));
  const initDir    = coords[quarterIdx][0] - coords[0][0]; // negative = heading west

  let extremeIdx = 0;
  if (initDir < 0) {
    let minLon = coords[0][0];
    for (let i = 1; i < coords.length; i++) {
      if (coords[i][0] < minLon) { minLon = coords[i][0]; extremeIdx = i; }
    }
  } else {
    let maxLon = coords[0][0];
    for (let i = 1; i < coords.length; i++) {
      if (coords[i][0] > maxLon) { maxLon = coords[i][0]; extremeIdx = i; }
    }
  }

  return extremeIdx / (coords.length - 1);
}

function transitionToMap() {
  const s2 = document.getElementById('screen2');
  s2.style.opacity = '0';
  s2.style.pointerEvents = 'none';

  setTimeout(() => {
    s2.style.display = 'none';
    document.getElementById('screen3').classList.add('visible');
    initMap();
  }, 500);
}

function initMap() {
  const data = ROUTES[chosenRoute].distances[chosenDist];

  mapboxgl.accessToken = 'pk.eyJ1IjoicnVubmluZzk1Njk4MDMiLCJhIjoiY21ueTQ4Yzk2MDlpbDJycHZneXJ4ZHNpaSJ9.VxQVwvAZgTZiU1sZ_k2FXA';

  mapInstance = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: data.center,
    zoom: data.zoom,
    attributionControl: false
  });

  mapInstance.on('load', () => {
    // Route label
    const label = document.getElementById('route-label');
    label.textContent = `${ROUTES[chosenRoute].label}  ·  ${distLabel(chosenDist)}`;
    label.classList.add('visible');

    const isOutAndBack = data.outAndBack === true;

    // lineMetrics required for line-gradient paint property
    mapInstance.addSource('route', {
      type: 'geojson',
      lineMetrics: isOutAndBack,
      data: { type: 'Feature', geometry: { type: 'LineString', coordinates: [] } }
    });

    // Out-and-back routes: red (#b31319) outbound, transitioning to deep navy
    // (#0d1e36) exactly at the turnaround point where the x direction reverses,
    // then stays navy for the return leg.
    // Loop routes get a solid crimson line.
    const linePaint = isOutAndBack
      ? (() => {
          const tp = findTurnaroundProgress(data.coords);
          return {
            'line-width': 4,
            'line-opacity': 0.95,
            'line-gradient': ['interpolate', ['linear'], ['line-progress'],
              0,  '#b31319',  // start — crimson
              tp, '#0d1e36',  // turnaround — deep navy
              1,  '#0d1e36'   // return — deep navy
            ]
          };
        })()
      : {
          'line-color': '#b31319',
          'line-width': 4,
          'line-opacity': 0.95
        };

    mapInstance.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route',
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: linePaint
    });

    // Start animation after map settles
    setTimeout(() => animateRoute(data.coords), 700);
  });
}

function animateRoute(coords) {
  const DURATION = 3000;
  const start    = performance.now();
  const total    = coords.length;

  function frame(now) {
    const t  = Math.min((now - start) / DURATION, 1);
    const n  = Math.max(2, Math.floor(t * total));
    const pts = coords.slice(0, n);

    // Smooth the leading edge between two waypoints
    if (n < total) {
      const frac = (t * total) % 1;
      const a = coords[n - 1], b = coords[n];
      if (b) pts.push([a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac]);
    }

    mapInstance.getSource('route').setData({
      type: 'Feature',
      geometry: { type: 'LineString', coordinates: pts }
    });

    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      setTimeout(showCollage, 1200);
    }
  }
  requestAnimationFrame(frame);
}

// ─────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────
function openLightbox(src) {
  const lb   = document.getElementById('lightbox');
  const img  = document.getElementById('lightbox-img');
  const desc = document.getElementById('lightbox-desc');
  img.src       = src;
  desc.textContent = DESCRIPTIONS[src] || '';
  lb.classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-backdrop').addEventListener('click', closeLightbox);

// ─────────────────────────────────────────────────────────────────────
// SCREEN 4 — PHOTO COLLAGE (overlays the map)
// ─────────────────────────────────────────────────────────────────────
function showCollage() {
  const photos  = ROUTES[chosenRoute].photos;
  const s4      = document.getElementById('screen4');
  const count   = Math.min(photos.length, 4);
  const layouts = LAYOUTS[chosenRoute] || LAYOUTS[count] || LAYOUTS[2];
  const vw = window.innerWidth, vh = window.innerHeight;

  s4.innerHTML = '';

  photos.slice(0, count).forEach((src, i) => {
    const L    = layouts[i];
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.style.setProperty('--rot', L.rot + 'deg');

    const cardW = (L.w / 100) * vw;
    const cardH = Math.floor(vh * 0.82 / count);   // divide usable height evenly
    card.style.width  = cardW + 'px';
    card.style.height = cardH + 'px';
    card.style.top    = (L.top  / 100) * vh + 'px';
    card.style.left   = (L.left / 100) * vw + 'px';

    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.style.objectPosition = CENTER_CROP.has(src) ? 'center center' : 'center bottom';
    card.appendChild(img);
    card.addEventListener('click', () => openLightbox(src));
    s4.appendChild(card);
  });

  s4.classList.add('visible');

  // Stagger each card in
  s4.querySelectorAll('.photo-card').forEach((card, i) => {
    setTimeout(() => card.classList.add('show'), 300 + i * 350);
  });
}
