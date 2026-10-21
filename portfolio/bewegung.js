/* ===========================================================================
   Bewegung im Portfolio: Fortschrittslinie, Kugel im Hero, Scramble auf der
   Augenbraue, Kacheln steigen beim Scrollen auf. Uebernommen aus der
   Amana-Seite (amana/index.html), damit sich beide Seiten gleich bewegen.
   Laeuft nach portfolio.js, weil die Kacheln erst dort entstehen.
=========================================================================== */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.hero');

  /* Fortschrittslinie */
  var bar = document.getElementById('progress');
  function onScroll(){
    var max = document.body.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    var hp = heroProgress();
    hero.style.setProperty('--hp', hp.toFixed(4));
  }
  function heroProgress(){
    if (!hero) return 0;
    var span = hero.offsetHeight - innerHeight;
    if (span <= 0) return 0;
    return Math.min(Math.max(-hero.getBoundingClientRect().top / span, 0), 1);
  }
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  if (reduce) return;

  /* Scramble auf dem Eyebrow */
  document.querySelectorAll('[data-scramble]').forEach(function(el){
    var target = el.textContent, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·', frame = 0;
    var id = setInterval(function(){
      frame++;
      el.textContent = target.split('').map(function(c, i){
        if (c === ' ') return ' ';
        return i < frame - 4 ? c : chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (frame - 4 > target.length){ clearInterval(id); el.textContent = target; }
    }, 34);
  });

  /* Eintreten beim Scrollen */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('seen'); io.unobserve(en.target); } });
  }, {rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rise').forEach(function(el){ io.observe(el); });

  /* ---------- Die Kugel ---------- */
  if (typeof THREE === 'undefined') return;
  var cv = document.getElementById('crystal');
  var mobile = innerWidth < 720;
  var dpr = Math.min(devicePixelRatio || 1, 2);

  var renderer = new THREE.WebGLRenderer({canvas:cv, antialias:!mobile, alpha:true});
  renderer.setPixelRatio(dpr);
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, .1, 100);

  /* Facettenkörper mit Fresnel-Rand — in Amanas Farben */
  var shell = new THREE.ShaderMaterial({
    transparent:true, depthWrite:false, side:THREE.DoubleSide,
    uniforms:{
      uBase:{value:new THREE.Color(0xD95F1E)},
      uDeep:{value:new THREE.Color(0x4A1C08)},
      uRim:{value:new THREE.Color(0xFFC46B)},
      uOpacity:{value:1}
    },
    vertexShader:[
      'varying vec3 vNormal;','varying vec3 vView;','varying vec3 vPos;',
      'void main(){',
      '  vNormal = normalize(normalMatrix * normal);',
      '  vec4 mv = modelViewMatrix * vec4(position,1.0);',
      '  vView = normalize(-mv.xyz);','  vPos = position;',
      '  gl_Position = projectionMatrix * mv;','}'
    ].join('\n'),
    fragmentShader:[
      'uniform vec3 uBase;','uniform vec3 uDeep;','uniform vec3 uRim;','uniform float uOpacity;',
      'varying vec3 vNormal;','varying vec3 vView;','varying vec3 vPos;',
      'void main(){',
      '  vec3 n = normalize(vNormal);',
      '  float fres = pow(1.0 - abs(dot(n, normalize(vView))), 2.2);',
      '  float depth = smoothstep(-1.6, 1.6, vPos.y);',
      '  float facet = pow(0.5 + 0.5 * dot(n, normalize(vec3(0.4,0.9,0.6))), 1.6);',
      '  vec3 col = mix(uDeep, uBase, depth * 0.45 + facet * 0.55);',
      '  col = mix(col, uRim, fres);',
      '  float a = (0.22 + facet * 0.16 + fres * 0.66) * uOpacity;',
      '  gl_FragColor = vec4(col, a);','}'
    ].join('\n')
  });

  var body = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 0), shell);
  var wireMat = new THREE.LineBasicMaterial({color:0xF68A0A, transparent:true, opacity:.42});
  var wire = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.5, 0)), wireMat);
  var innerMat = new THREE.LineBasicMaterial({color:0xFFC46B, transparent:true, opacity:.16});
  var inner = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(.82, 0)), innerMat);

  var group = new THREE.Group();
  group.add(body, wire, inner);
  scene.add(group);

  /* Sandstaub */
  var count = mobile ? 110 : 240;
  var pos = new Float32Array(count * 3), speed = new Float32Array(count);
  for (var i = 0; i < count; i++){
    pos[i*3]   = (Math.random() - .5) * 12;
    pos[i*3+1] = (Math.random() - .5) * 8;
    pos[i*3+2] = (Math.random() - .5) * 6 - 1;
    speed[i]   = .05 + Math.random() * .22;
  }
  var pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  var pMat = new THREE.ShaderMaterial({
    transparent:true, depthWrite:false,
    uniforms:{uDpr:{value:dpr}},
    vertexShader:[
      'uniform float uDpr;',
      'void main(){',
      '  vec4 mv = modelViewMatrix * vec4(position,1.0);',
      '  gl_PointSize = (36.0 / -mv.z) * uDpr * 0.35;',
      '  gl_Position = projectionMatrix * mv;','}'
    ].join('\n'),
    fragmentShader:[
      'void main(){',
      '  float d = length(gl_PointCoord - 0.5);',
      '  float a = smoothstep(0.5, 0.05, d) * 0.42;',
      '  gl_FragColor = vec4(1.0, 0.77, 0.42, a);','}'
    ].join('\n')
  });
  scene.add(new THREE.Points(pGeo, pMat));

  function resize(){
    var w = cv.clientWidth || cv.parentElement.clientWidth;
    var h = cv.clientHeight || cv.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w < 720 ? 8.4 : 6;
    camera.updateProjectionMatrix();
  }
  resize();
  addEventListener('resize', resize);

  var px = 0, py = 0, tx = 0, ty = 0;
  if (!mobile) addEventListener('pointermove', function(e){
    tx = (e.clientX / innerWidth - .5) * 2;
    ty = (e.clientY / innerHeight - .5) * 2;
  }, {passive:true});

  var visible = true;
  if ('IntersectionObserver' in window){
    new IntersectionObserver(function(e){ visible = e[0].isIntersecting; }).observe(cv);
  }

  var clock = new THREE.Clock();
  function frame(){
    var t = clock.getElapsedTime(), hp = heroProgress();
    group.rotation.y = t * .12 + hp * 2.4 + px * .22;
    group.rotation.x = .42 + Math.sin(t * .18) * .05 + hp * .5 + py * .14;
    inner.rotation.y = -t * .2 - hp * 1.2;
    inner.rotation.z = t * .08;
    var s = .74 + hp * .5;
    group.scale.set(s, s, s);
    group.position.y = Math.sin(t * .4) * .06 + hp * .9;
    shell.uniforms.uOpacity.value = 1 - Math.max(0, hp - .72) / .28;
    wireMat.opacity = .42 * (1 - hp * .5);

    var arr = pGeo.attributes.position.array;
    for (var j = 0; j < count; j++){
      arr[j*3+1] += speed[j] * .004;
      if (arr[j*3+1] > 4.2) arr[j*3+1] = -4.2;
    }
    pGeo.attributes.position.needsUpdate = true;

    px += (tx - px) * .04;
    py += (ty - py) * .04;
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(function(){ if (visible && !document.hidden) frame(); });
})();
