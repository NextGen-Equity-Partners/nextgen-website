/* ============================================================
   NEXTGEN EQUITY · DYNAMIC SHADER BACKGROUND
   Dark navy #161933 with slowly flowing organic structure.
   - Layered domain-warped noise → flowing "wave" shapes
   - Faint geometric grid → subtle structural cue
   - Drifts very slowly (~minutes per cycle)
============================================================ */
(function () {
  if (window.__bgDynamicInit) return;
  window.__bgDynamicInit = true;

  // Find the <canvas class="hero-image-bg"> placeholder, or create one
  let canvas = document.querySelector('canvas.hero-image-bg, video.hero-image-bg, img.hero-image-bg');
  if (!canvas || canvas.tagName !== 'CANVAS') {
    const newCanvas = document.createElement('canvas');
    newCanvas.className = 'hero-image-bg';
    newCanvas.setAttribute('aria-hidden', 'true');
    if (canvas) canvas.replaceWith(newCanvas); else document.body.insertBefore(newCanvas, document.body.firstChild);
    canvas = newCanvas;
  }

  const gl = canvas.getContext('webgl', { antialias: true, premultipliedAlpha: false });
  if (!gl) {
    // WebGL fallback: solid color
    canvas.style.background = '#161933';
    return;
  }

  const VS = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;
  const FS = `
precision highp float;
uniform vec2 res;
uniform float time;
uniform vec2 mouse;

// 2D hash
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.,0.)), u.x),
             mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), u.x), u.y);
}

float fbm(vec2 p){
  float v = 0., a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * res) / min(res.x, res.y);
  vec2 m  = (mouse - 0.5 * res) / min(res.x, res.y);

  // Slow time
  float t = time * 0.04;

  // === Domain-warped noise field – flowing organic structure ===
  vec2 q = vec2(fbm(uv * 1.2 + vec2(t, 0.)),
                fbm(uv * 1.2 + vec2(0., t) + 5.0));
  vec2 r = vec2(fbm(uv * 2.0 + 4.0 * q + vec2(1.7, 9.2) + t * 0.7),
                fbm(uv * 2.0 + 4.0 * q + vec2(8.3, 2.8) + t * 0.6));
  float f = fbm(uv * 1.5 + 4.0 * r);

  // === Three layered aurora-like streaks – clearly visible ===
  float w1 = sin(uv.y * 1.4 + t * 1.6 + q.x * 1.8) * 0.5 + 0.5;
  float w2 = sin(uv.y * 2.2 + t * 1.2 + q.y * 1.5 + 1.7) * 0.5 + 0.5;
  float w3 = sin(uv.y * 0.9 + t * 2.0 + r.x * 2.2 + 3.4) * 0.5 + 0.5;

  // Vertical band – streaks fade at top and bottom edges
  float band = smoothstep(-0.95, -0.05, uv.y) * smoothstep(0.95, 0.05, uv.y);
  w1 = pow(w1, 2.0) * band;
  w2 = pow(w2, 2.5) * band;
  w3 = pow(w3, 2.2) * band;

  // === Subtle warped grid ===
  vec2 gridUV = uv * 5.5 + r * 0.4;
  vec2 g = abs(fract(gridUV) - 0.5);
  float gridLine = smoothstep(0.48, 0.50, max(g.x, g.y));
  float gridFade = 1.0 - smoothstep(0.4, 1.2, length(uv));
  float grid = gridLine * gridFade * 0.06;

  // Mouse breath
  float mGlow = exp(-length(uv - m) * 4.0) * 0.05;

  // === Palette · darker NextGen-blue feel ===
  vec3 deep = vec3(0.012, 0.018, 0.055);   // very deep abyss
  vec3 base = vec3(0.055, 0.065, 0.135);   // dark navy
  vec3 lift = vec3(0.110, 0.135, 0.260);   // gentle lift, still dark
  vec3 spec = vec3(0.260, 0.340, 0.620);   // cool blue highlight, muted
  vec3 hi   = vec3(0.420, 0.540, 0.820);   // peak, restrained

  vec3 col = mix(deep, base, smoothstep(0.0, 0.7, f));
  col = mix(col, lift, smoothstep(0.55, 0.95, f) * 0.55);

  // Three waves – each adds its own glow + bright peak
  col += spec * w1 * 0.24 + hi * pow(w1, 3.0) * 0.14;
  col += spec * w2 * 0.20 + hi * pow(w2, 3.0) * 0.12;
  col += spec * w3 * 0.17 + hi * pow(w3, 3.0) * 0.10;

  // Grid + mouse glow
  col += vec3(0.6, 0.7, 1.0) * grid;
  col += vec3(0.5, 0.6, 0.9) * mGlow;

  // Vignette
  float vig = 1.0 - dot(uv, uv) * 0.30;
  col *= clamp(vig, 0., 1.);

  // Grain
  float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - 0.5) * 0.012;

  gl_FragColor = vec4(col, 1.0);
}
`;

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

  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const aP = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(aP);
  gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'res');
  const uTime = gl.getUniformLocation(prog, 'time');
  const uMouse = gl.getUniformLocation(prog, 'mouse');

  const dpr = () => Math.min(window.devicePixelRatio || 1, 1.6);
  function resize() {
    canvas.width = window.innerWidth * dpr();
    canvas.height = window.innerHeight * dpr();
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);

  let mx = window.innerWidth * 0.5, my = window.innerHeight * 0.5;
  let tx = mx, ty = my;
  window.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = window.innerHeight - e.clientY;
  }, { passive: true });

  const start = performance.now();
  function frame(now) {
    const t = (now - start) / 1000;
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;

    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, t);
    gl.uniform2f(uMouse, mx * dpr(), my * dpr());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
