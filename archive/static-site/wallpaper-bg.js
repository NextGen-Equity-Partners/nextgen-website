/* ============================================================
   NEXTGEN EQUITY · LIVE WALLPAPER BACKGROUND
   Five interactive shader backgrounds, slow & blue, with picker.
   Replaces the static cosmic background.
============================================================ */
(function () {
  if (window.__wallpaperInit) return;
  window.__wallpaperInit = true;

  // -------- Shared vertex shader --------
  const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

  // -------- Shader sources (subtle, slow, blue) --------
  const SHADERS = {
    liquid: {
      label: 'Liquid',
      fs: `
precision highp float;
uniform vec2 res; uniform float time; uniform vec2 mouse; uniform float click;
float ball(vec2 p, vec2 c, float r){ return r / max(length(p - c), 0.001); }
void main(){
  vec2 uv = (gl_FragCoord.xy - .5*res) / min(res.x,res.y);
  vec2 m  = (mouse - .5*res) / min(res.x,res.y);
  float t = time * 0.10;
  float v = 0.;
  v += ball(uv, vec2(sin(t*1.10)*.55,  cos(t*1.30)*.42), .19);
  v += ball(uv, vec2(cos(t*0.90)*.62,  sin(t*0.70)*.50), .17);
  v += ball(uv, vec2(sin(t*1.50+1.0)*.42,  cos(t*1.20+2.0)*.58), .15);
  v += ball(uv, vec2(cos(t*1.05+3.0)*.55,  sin(t*1.40+1.5)*.46), .16);
  v += ball(uv, vec2(sin(t*0.80+4.5)*.30,  cos(t*1.10+0.5)*.30), .12);
  v += ball(uv, m, 0.20 + click * 0.25);
  float metal = smoothstep(.85, 1.45, v);
  float core  = smoothstep(1.20, 1.55, v);
  vec3 deep = vec3(0.012, 0.030, 0.080);
  vec3 mid  = vec3(0.060, 0.180, 0.480);
  vec3 hi   = vec3(0.380, 0.620, 0.950);
  vec3 spec = vec3(0.800, 0.920, 1.000);
  vec3 col = mix(deep, mid, metal);
  col = mix(col, hi, smoothstep(.95, 1.30, v) * .55);
  col += spec * core * .25;
  float vig = 1. - dot(uv, uv) * .35;
  col *= clamp(vig, 0., 1.);
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - .5) * .010;
  gl_FragColor = vec4(col, 1.0);
}`
    },

    aurora: {
      label: 'Aurora',
      fs: `
precision highp float;
uniform vec2 res; uniform float time; uniform vec2 mouse; uniform float click;
float curtain(vec2 uv, float t, float seed){
  float v = 0.;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float speed = 0.08 + fi * 0.035;
    float scale = 1.5 + fi * 0.55;
    v += sin(uv.x * scale + uv.y * (1.4 + fi * .3) + t * speed + seed + fi * 1.3) * .5 + .5;
  }
  return v / 4.;
}
void main(){
  vec2 uv = gl_FragCoord.xy / res;
  vec2 m  = mouse / res;
  vec2 toMouse = uv - m;
  float dm = length(toMouse);
  uv += normalize(toMouse + vec2(.0001)) * exp(-dm * 5.0) * 0.045;
  float t = time * 0.14;
  float a1 = curtain(uv * vec2(2.4, 1.4) + vec2(0., t * 0.05), t, 0.0);
  float a2 = curtain(uv * vec2(1.6, 2.0) - vec2(t * 0.04, 0.), t * 0.85, 2.7);
  float a = mix(a1, a2, 0.55);
  a *= smoothstep(-0.05, 0.45, uv.y) * smoothstep(1.05, 0.55, uv.y);
  a += pow(a, 2.) * 0.4;
  vec3 deep  = vec3(0.005, 0.012, 0.045);
  vec3 mid   = vec3(0.060, 0.150, 0.420);
  vec3 hi    = vec3(0.300, 0.560, 0.950);
  vec3 glow  = vec3(0.620, 0.840, 1.000);
  vec3 col = mix(deep, mid, a);
  col = mix(col, hi, smoothstep(.55, .92, a));
  col = mix(col, glow, smoothstep(.85, 1.00, a) * .25);
  col += vec3(0.10, 0.25, 0.55) * exp(-dm * 6.0) * 0.14;
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - .5) * .010;
  gl_FragColor = vec4(col, 1.0);
}`
    },

    plasma: {
      label: 'Plasma',
      fs: `
precision highp float;
uniform vec2 res; uniform float time; uniform vec2 mouse; uniform float click;
float n2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(n2(i), n2(i+vec2(1,0)), u.x),
             mix(n2(i+vec2(0,1)), n2(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0., a = .5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= .5; }
  return v;
}
void main(){
  vec2 uv = (gl_FragCoord.xy - .5*res) / min(res.x,res.y);
  vec2 m  = (mouse - .5*res) / min(res.x,res.y);
  vec2 toM = uv - m;
  float dm = length(toM);
  uv += normalize(toM + vec2(.0001)) * exp(-dm * 4.0) * 0.06;
  float t = time * 0.10;
  float f = fbm(uv * 1.8 + vec2(t * .3, t * .15));
  f += 0.4 * fbm(uv * 4.0 - vec2(t * .15, t * .25));
  // Star twinkles
  float star = 0.;
  for(int i=0;i<6;i++){
    float fi = float(i);
    vec2 sp = vec2(sin(t*.4+fi*1.7), cos(t*.5+fi*2.1)) * .8;
    star += smoothstep(0.04, 0.0, length(uv - sp)) * (.5 + .5 * sin(time + fi*3.));
  }
  vec3 deep  = vec3(0.008, 0.020, 0.060);
  vec3 mid   = vec3(0.040, 0.110, 0.380);
  vec3 hi    = vec3(0.250, 0.500, 0.950);
  vec3 glow  = vec3(0.600, 0.820, 1.000);
  vec3 col = mix(deep, mid, smoothstep(0.2, 0.85, f));
  col = mix(col, hi, smoothstep(0.55, 0.95, f) * .55);
  col += glow * star * .3;
  col += vec3(0.10, 0.25, 0.55) * exp(-dm * 5.0) * 0.16;
  float vig = 1. - dot(uv, uv) * .30;
  col *= clamp(vig, 0., 1.);
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - .5) * .010;
  gl_FragColor = vec4(col, 1.0);
}`
    },

    voronoi: {
      label: 'Voronoi',
      fs: `
precision highp float;
uniform vec2 res; uniform float time; uniform vec2 mouse; uniform float click;
vec2 hash(vec2 p){
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}
vec3 voronoi(vec2 uv, float t){
  vec2 g = floor(uv);
  vec2 f = fract(uv);
  float md1 = 8., md2 = 8.;
  vec2 mP = vec2(0.);
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      vec2 o = vec2(float(x), float(y));
      vec2 r = hash(g + o);
      r = 0.5 + 0.5 * sin(t + 6.2831 * r);
      vec2 p = o + r - f;
      float d = dot(p, p);
      if (d < md1) { md2 = md1; md1 = d; mP = g + o + r; }
      else if (d < md2) { md2 = d; }
    }
  }
  return vec3(sqrt(md1), sqrt(md2) - sqrt(md1), mP.x + mP.y);
}
void main(){
  vec2 uv = (gl_FragCoord.xy - .5*res) / min(res.x,res.y);
  vec2 m  = (mouse - .5*res) / min(res.x,res.y);
  vec2 toM = uv - m;
  float dm = length(toM);
  uv += normalize(toM + vec2(.0001)) * exp(-dm * 2.5) * 0.14;
  vec3 v = voronoi(uv * 4.0, time * 0.14);
  float cell = v.x;
  float edge = v.y;
  float seed = v.z;
  float tint = sin(seed * 1.7) * .5 + .5;
  float line = 1.0 - smoothstep(0.0, 0.05, edge);
  vec3 deep   = vec3(0.010, 0.025, 0.075);
  vec3 mid    = vec3(0.055, 0.145, 0.400);
  vec3 light  = vec3(0.220, 0.450, 0.850);
  vec3 spec   = vec3(0.620, 0.820, 1.000);
  vec3 col = mix(deep, mid, smoothstep(0.0, 0.55, cell));
  col = mix(col, light, tint * .25);
  col += spec * line * 0.30;
  col += vec3(0.10, 0.25, 0.55) * exp(-dm * 5.0) * 0.16;
  float vig = 1. - dot(uv, uv) * .25;
  col *= clamp(vig, 0., 1.);
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - .5) * .010;
  gl_FragColor = vec4(col, 1.);
}`
    },

    grid: {
      label: 'Depth Grid',
      fsExtension: '#extension GL_OES_standard_derivatives : enable\n',
      fs: `
precision highp float;
uniform vec2 res; uniform float time; uniform vec2 mouse; uniform float click;
float grid(vec2 p, float w){
  vec2 g = abs(fract(p - 0.5) - 0.5) / fwidth(p);
  return 1.0 - smoothstep(0.0, w, min(g.x, g.y));
}
void main(){
  vec2 uv = (gl_FragCoord.xy - .5*res) / res.y;
  vec2 m  = (mouse - .5*res) / res.y;
  float horizon = 0.05;
  float depth = uv.y - horizon;
  vec2 floorUV = uv;
  if (depth < 0.0) {
    floorUV.y = -1.0 / (depth - 0.001) * 0.20;
    floorUV.x = uv.x / (-depth + 0.05) * 0.55;
  }
  float t = time * 0.14;
  floorUV.y += t;
  float wave = 0.;
  if (m.y < horizon) {
    vec2 mFloor;
    mFloor.y = -1.0 / (m.y - horizon - 0.001) * 0.20 + t;
    mFloor.x = m.x / (-(m.y - horizon) + 0.05) * 0.55;
    float dm = length(floorUV - mFloor);
    wave += sin(dm * 6.0 - time * 1.0) * exp(-dm * 1.3) * 0.10;
  }
  wave += sin(floorUV.x * 1.5 + time * 0.32) * sin(floorUV.y * 1.2 - time * 0.24) * 0.03;
  vec2 gridUV = floorUV + vec2(0., wave * 0.6);
  float onFloor = step(depth, 0.0);
  float lineMajor = grid(gridUV * 4.0, 1.4);
  float lineMinor = grid(gridUV * 16.0, 1.0) * 0.30;
  float lines = max(lineMajor, lineMinor);
  float far = clamp(1.0 + depth * 4.0, 0., 1.);
  lines *= far;
  vec3 floorBase = mix(vec3(0.005, 0.015, 0.060), vec3(0.025, 0.070, 0.200), far);
  vec3 floorLine = mix(vec3(0.10, 0.30, 0.85), vec3(0.40, 0.70, 1.00), wave * 4. + .5);
  vec3 floorCol = mix(floorBase, floorLine, lines * .85);
  float skyT = clamp(uv.y * 1.8, 0., 1.);
  vec3 sky = mix(vec3(0.020, 0.055, 0.150), vec3(0.005, 0.012, 0.040), skyT);
  sky += vec3(0.10, 0.25, 0.55) * exp(-abs(uv.y - horizon) * 18.0) * 0.45;
  vec2 mEye = m;
  float dEye = length(uv - mEye);
  if (mEye.y >= horizon) sky += vec3(0.30, 0.55, 1.0) * exp(-dEye * 6.0) * 0.22;
  vec3 col = mix(sky, floorCol, onFloor);
  col += vec3(0.20, 0.40, 0.80) * exp(-abs(depth) * 80.0) * 0.25;
  float vig = 1. - dot(uv, uv) * .25;
  col *= clamp(vig, 0., 1.);
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - .5) * .010;
  gl_FragColor = vec4(col, 1.);
}`
    }
  };

  const ORDER = ['aurora', 'liquid', 'plasma', 'voronoi', 'grid'];

  // -------- Mount canvas --------
  const canvas = document.createElement('canvas');
  canvas.id = 'wallpaper-canvas';
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0',
    width: '100vw', height: '100vh',
    zIndex: '-3',
    pointerEvents: 'none',
    display: 'block'
  });
  document.body.insertBefore(canvas, document.body.firstChild);

  // Hide the static .site-bg gradient since we now render dynamically
  const staticBg = document.querySelector('.site-bg');
  if (staticBg) staticBg.style.display = 'none';

  const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: false });
  if (!gl) {
    if (staticBg) staticBg.style.display = '';
    return;
  }
  gl.getExtension('OES_standard_derivatives');

  // -------- Shader compilation --------
  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error('Shader error:', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }
  function buildProgram(fsSrc, ext) {
    const fsFinal = (ext || '') + fsSrc;
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsFinal));
    gl.linkProgram(prog);
    return {
      prog,
      uRes: gl.getUniformLocation(prog, 'res'),
      uTime: gl.getUniformLocation(prog, 'time'),
      uMouse: gl.getUniformLocation(prog, 'mouse'),
      uClick: gl.getUniformLocation(prog, 'click')
    };
  }

  const programs = {};
  ORDER.forEach(key => {
    const def = SHADERS[key];
    programs[key] = buildProgram(def.fs, def.fsExtension);
  });

  // Shared fullscreen quad
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

  function bindAttrib(p) {
    const aP = gl.getAttribLocation(p.prog, 'p');
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);
  }

  // -------- State --------
  const dpr = () => Math.min(window.devicePixelRatio || 1, 1.6);
  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    canvas.width = w * dpr();
    canvas.height = h * dpr();
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  let active = localStorage.getItem('ngeWallpaper') || 'aurora';
  if (!ORDER.includes(active)) active = 'aurora';

  let mx = window.innerWidth * 0.5, my = window.innerHeight * 0.5;
  let tx = mx, ty = my;
  let click = 0, clickTarget = 0;

  window.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = window.innerHeight - e.clientY;
  }, { passive: true });
  window.addEventListener('mousedown', () => { clickTarget = 1; });
  window.addEventListener('mouseup',   () => { clickTarget = 0; });

  // -------- Render loop --------
  const start = performance.now();
  function frame(now) {
    const t = (now - start) / 1000;
    mx += (tx - mx) * 0.06;
    my += (ty - my) * 0.06;
    click += (clickTarget - click) * 0.15;

    const p = programs[active];
    gl.useProgram(p.prog);
    bindAttrib(p);
    gl.uniform2f(p.uRes, canvas.width, canvas.height);
    gl.uniform1f(p.uTime, t);
    gl.uniform2f(p.uMouse, mx * dpr(), my * dpr());
    gl.uniform1f(p.uClick, click);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // -------- Picker UI --------
  const picker = document.createElement('div');
  picker.id = 'wallpaper-picker';
  picker.innerHTML = `
    <button class="wp-toggle" aria-label="Hintergrund wählen">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.4"/>
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2.5" opacity=".7"/>
      </svg>
    </button>
    <div class="wp-panel" role="menu">
      <div class="wp-panel-label">Live-Hintergrund</div>
      <div class="wp-panel-options"></div>
    </div>
  `;
  document.body.appendChild(picker);

  const optionsEl = picker.querySelector('.wp-panel-options');
  ORDER.forEach((key, i) => {
    const def = SHADERS[key];
    const btn = document.createElement('button');
    btn.className = 'wp-opt' + (key === active ? ' active' : '');
    btn.dataset.key = key;
    btn.innerHTML = `
      <span class="wp-dot" data-shader="${key}"></span>
      <span class="wp-name">${String(i+1).padStart(2,'0')} · ${def.label}</span>
    `;
    btn.addEventListener('click', () => {
      active = key;
      localStorage.setItem('ngeWallpaper', key);
      optionsEl.querySelectorAll('.wp-opt').forEach(o => o.classList.toggle('active', o.dataset.key === key));
    });
    optionsEl.appendChild(btn);
  });

  const toggleBtn = picker.querySelector('.wp-toggle');
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    picker.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!picker.contains(e.target)) picker.classList.remove('open');
  });
})();
