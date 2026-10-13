import * as THREE from 'three';

/**
 * Creates procedural texture for architectural concrete with tactile grain and panel lines.
 */
function createConcreteTextures() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Base concrete grey
  ctx.fillStyle = '#6e727a';
  ctx.fillRect(0, 0, size, size);

  // Subtle aggregate grain noise
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 36;
    data[i] = Math.min(255, Math.max(0, data[i] + grain));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
  }
  ctx.putImageData(imgData, 0, 0);

  // Subtle architectural formwork panel seams
  ctx.strokeStyle = 'rgba(40, 42, 48, 0.45)';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, size, size);
  ctx.strokeRect(size / 2, 0, size / 2, size);
  ctx.strokeRect(0, size / 2, size, size / 2);

  // Formwork tie-rod holes (typical of cast concrete architecture)
  ctx.fillStyle = 'rgba(25, 27, 32, 0.55)';
  const tiePoints = [
    [24, 24], [size / 2 - 24, 24], [size / 2 + 24, 24], [size - 24, 24],
    [24, size / 2 - 24], [size - 24, size / 2 - 24],
    [24, size / 2 + 24], [size - 24, size / 2 + 24],
    [24, size - 24], [size / 2 - 24, size - 24], [size / 2 + 24, size - 24], [size - 24, size - 24]
  ];
  tiePoints.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  return texture;
}

/**
 * Initializes the interactive 3D Architectural Scene in the specified container.
 */
export function initArchitecturalScene(container) {
  if (!container) return null;

  // WebGL availability check
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      throw new Error('WebGL not supported');
    }
  } catch (err) {
    renderFallback(container);
    return null;
  }

  const width = container.clientWidth || 600;
  const height = container.clientHeight || 560;

  // Scene
  const scene = new THREE.Scene();
  scene.background = null; // Transparent to blend seamlessly with UI background

  // Camera
  const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
  const defaultCamPos = new THREE.Vector3(13.5, 9.2, 14.5);
  camera.position.copy(defaultCamPos);
  const targetLook = new THREE.Vector3(0, 1.2, 0);
  camera.lookAt(targetLook);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  container.appendChild(renderer.domElement);

  // Textures & Materials
  const concreteTexture = createConcreteTextures();

  const concreteMatLight = new THREE.MeshStandardMaterial({
    color: 0x9fa4ad,
    roughness: 0.82,
    metalness: 0.08,
    bumpMap: concreteTexture,
    bumpScale: 0.04
  });

  const concreteMatDark = new THREE.MeshStandardMaterial({
    color: 0x3a3d45,
    roughness: 0.88,
    metalness: 0.12,
    bumpMap: concreteTexture,
    bumpScale: 0.04
  });

  const brushedSteelMat = new THREE.MeshStandardMaterial({
    color: 0x22252c,
    roughness: 0.28,
    metalness: 0.88
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xd8e4ed,
    transparent: true,
    opacity: 0.38,
    roughness: 0.12,
    metalness: 0.15,
    depthWrite: false
  });

  const orangeEmissiveMat = new THREE.MeshStandardMaterial({
    color: 0xff5500,
    emissive: 0xff5500,
    emissiveIntensity: 2.8,
    roughness: 0.3,
    metalness: 0.1
  });

  const subtleEdgeMat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18
  });

  // Master Root Object for the Architectural Pavilion
  const pavilionGroup = new THREE.Group();
  scene.add(pavilionGroup);

  // Store interactive parts for raycasting annotations
  const interactiveParts = [];

  function registerPart(mesh, name, detail) {
    mesh.userData = { name, detail };
    interactiveParts.push(mesh);
  }

  // 1. Monolithic Ground Plinth / Podium (Stepped architectural terrace)
  const plinthGeo1 = new THREE.BoxGeometry(11, 0.45, 11);
  const plinth1 = new THREE.Mesh(plinthGeo1, concreteMatDark);
  plinth1.position.y = -0.225;
  plinth1.receiveShadow = true;
  pavilionGroup.add(plinth1);
  registerPart(plinth1, "Podium Terrace", "Cast charcoal concrete foundational platform");

  const plinthGeo2 = new THREE.BoxGeometry(9, 0.35, 9);
  const plinth2 = new THREE.Mesh(plinthGeo2, concreteMatLight);
  plinth2.position.y = 0.175;
  plinth2.receiveShadow = true;
  pavilionGroup.add(plinth2);
  registerPart(plinth2, "Upper Plinth", "Stepped architectural reveal slab");

  // Subtle ground grid coordinate wireframe
  const gridHelper = new THREE.GridHelper(12, 12, 0xff5500, 0x2e3340);
  gridHelper.position.y = -0.44;
  pavilionGroup.add(gridHelper);

  // 2. Primary Vertical Monolith / Shear Wall Core
  const coreGeo = new THREE.BoxGeometry(1.6, 5.5, 4.2);
  const coreMesh = new THREE.Mesh(coreGeo, concreteMatDark);
  coreMesh.position.set(-1.2, 2.75, -0.6);
  coreMesh.castShadow = true;
  coreMesh.receiveShadow = true;
  pavilionGroup.add(coreMesh);
  registerPart(coreMesh, "Structural Shear Core", "Reinforced vertical load-bearing monolith");

  // 3. Cantilevered Main Platform (Mid Level)
  const slabGeo1 = new THREE.BoxGeometry(7.5, 0.45, 5.2);
  const slab1 = new THREE.Mesh(slabGeo1, concreteMatLight);
  slab1.position.set(0.6, 2.6, 0.4);
  slab1.castShadow = true;
  slab1.receiveShadow = true;
  pavilionGroup.add(slab1);
  registerPart(slab1, "Main Cantilever Deck", "Post-tensioned horizontal cantilevered slab");

  // Recessed orange light ribbon beneath cantilever slab 1
  const lightRibbonGeo1 = new THREE.BoxGeometry(7.0, 0.08, 0.15);
  const lightRibbon1 = new THREE.Mesh(lightRibbonGeo1, orangeEmissiveMat);
  lightRibbon1.position.set(0.6, 2.34, 2.85);
  pavilionGroup.add(lightRibbon1);

  // 4. Upper Roof Pavilion & Floating Canopy
  const roofGeo = new THREE.BoxGeometry(6.2, 0.38, 4.8);
  const roofMesh = new THREE.Mesh(roofGeo, concreteMatLight);
  roofMesh.position.set(-0.2, 5.2, -0.2);
  roofMesh.castShadow = true;
  roofMesh.receiveShadow = true;
  pavilionGroup.add(roofMesh);
  registerPart(roofMesh, "Floating Roof Canopy", "Beveled architectural shading roof slab");

  // Recessed orange light ribbon beneath roof
  const lightRibbonGeo2 = new THREE.BoxGeometry(5.8, 0.08, 0.15);
  const lightRibbon2 = new THREE.Mesh(lightRibbonGeo2, orangeEmissiveMat);
  lightRibbon2.position.set(-0.2, 4.98, 2.05);
  pavilionGroup.add(lightRibbon2);

  // 5. Cylindrical Steel Pilotis (Columns)
  const colGeo = new THREE.CylinderGeometry(0.09, 0.09, 2.6, 16);
  const colCoords = [
    [2.8, 1.3, 2.2],
    [3.8, 1.3, -1.2],
    [1.8, 1.3, -1.8]
  ];
  colCoords.forEach(([x, y, z], idx) => {
    const col = new THREE.Mesh(colGeo, brushedSteelMat);
    col.position.set(x, y, z);
    col.castShadow = true;
    col.receiveShadow = true;
    pavilionGroup.add(col);
    registerPart(col, `Steel Column P-${idx + 1}`, "Brushed titanium structural pilotis");
  });

  // Upper level columns
  const upperColGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.4, 16);
  const upperColCoords = [
    [2.4, 3.9, 1.8],
    [2.4, 3.9, -1.8]
  ];
  upperColCoords.forEach(([x, y, z], idx) => {
    const col = new THREE.Mesh(upperColGeo, brushedSteelMat);
    col.position.set(x, y, z);
    col.castShadow = true;
    col.receiveShadow = true;
    pavilionGroup.add(col);
    registerPart(col, `Upper Pilotis C-${idx + 1}`, "High-tensile architectural column");
  });

  // 6. Translucent Glass Curtain Walls
  const glassGeo1 = new THREE.BoxGeometry(4.2, 2.3, 0.06);
  const glassWall1 = new THREE.Mesh(glassGeo1, glassMat);
  glassWall1.position.set(1.4, 3.85, 0.8);
  pavilionGroup.add(glassWall1);
  registerPart(glassWall1, "Glass Curtain Enclosure", "Translucent low-iron architectural glazing");

  const glassGeo2 = new THREE.BoxGeometry(0.06, 2.3, 2.8);
  const glassWall2 = new THREE.Mesh(glassGeo2, glassMat);
  glassWall2.position.set(3.4, 3.85, -0.6);
  pavilionGroup.add(glassWall2);
  registerPart(glassWall2, "Fluted Glass Partition", "Acoustic reflective architectural panel");

  // 7. Architectural Brise-Soleil / Rhythmic Louvers
  const louverGeo = new THREE.BoxGeometry(0.06, 2.8, 0.4);
  const louverCount = 7;
  for (let i = 0; i < louverCount; i++) {
    const louver = new THREE.Mesh(louverGeo, brushedSteelMat);
    const zPos = -1.8 + i * 0.55;
    louver.position.set(-2.15, 2.7, zPos);
    louver.rotation.y = 0.35; // Rhythmic angle
    louver.castShadow = true;
    louver.receiveShadow = true;
    pavilionGroup.add(louver);
    registerPart(louver, `Brise-Soleil Fin [${i + 1}]`, "Architectural solar louver element");
  }

  // 8. Sculptural Water / Stone Basin on lower terrace
  const poolGeo = new THREE.BoxGeometry(3.6, 0.12, 2.6);
  const poolMat = new THREE.MeshStandardMaterial({
    color: 0x1a212d,
    roughness: 0.15,
    metalness: 0.7
  });
  const pool = new THREE.Mesh(poolGeo, poolMat);
  pool.position.set(2.4, 0.38, -1.8);
  pavilionGroup.add(pool);
  registerPart(pool, "Reflective Water Court", "Polished dark stone water feature");

  // 9. Floating Minimalist Architectural Coordinate Rings & Dimension Guides
  const ringGeo = new THREE.RingGeometry(6.8, 6.84, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xff5500,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.22
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = -0.42;
  pavilionGroup.add(ring);

  // Add subtle geometric edge outlines to key slabs for crisp architectural drafting feel
  [slab1, roofMesh, coreMesh, plinth2].forEach(mesh => {
    const edges = new THREE.EdgesGeometry(mesh.geometry);
    const line = new THREE.LineSegments(edges, subtleEdgeMat);
    mesh.add(line);
  });

  // --- LIGHTING RIG ---
  // Key Studio Sunlight
  const dirLightKey = new THREE.DirectionalLight(0xfff5ea, 2.4);
  dirLightKey.position.set(16, 20, 15);
  dirLightKey.castShadow = true;
  dirLightKey.shadow.mapSize.width = 2048;
  dirLightKey.shadow.mapSize.height = 2048;
  dirLightKey.shadow.camera.near = 1;
  dirLightKey.shadow.camera.far = 45;
  dirLightKey.shadow.camera.left = -9;
  dirLightKey.shadow.camera.right = 9;
  dirLightKey.shadow.camera.top = 9;
  dirLightKey.shadow.camera.bottom = -9;
  dirLightKey.shadow.bias = -0.0004;
  dirLightKey.shadow.radius = 2.5;
  scene.add(dirLightKey);

  // Secondary Architectural Fill Light
  const fillLight = new THREE.DirectionalLight(0x404859, 1.1);
  fillLight.position.set(-15, 12, -12);
  scene.add(fillLight);

  // Soft Ambient Fill
  const ambientLight = new THREE.AmbientLight(0x232630, 0.9);
  scene.add(ambientLight);

  // Electric-Orange Cove Point Light 1 (Under Cantilever)
  const orangePoint1 = new THREE.PointLight(0xff5500, 3.2, 14, 1.8);
  orangePoint1.position.set(0.6, 2.1, 2.2);
  orangePoint1.castShadow = false;
  scene.add(orangePoint1);

  // Electric-Orange Cove Point Light 2 (Inside Pavilion Colonnade)
  const orangePoint2 = new THREE.PointLight(0xff7722, 2.4, 12, 1.8);
  orangePoint2.position.set(1.2, 3.2, -0.4);
  scene.add(orangePoint2);

  // Dusk Mode state
  let isDuskMode = false;
  function setLightingMode(dusk) {
    isDuskMode = dusk;
    if (dusk) {
      dirLightKey.intensity = 0.6;
      dirLightKey.color.setHex(0x3a4866);
      fillLight.intensity = 0.7;
      fillLight.color.setHex(0x252a38);
      ambientLight.intensity = 0.4;
      ambientLight.color.setHex(0x141824);
      orangePoint1.intensity = 5.5;
      orangePoint2.intensity = 4.8;
      orangeEmissiveMat.emissiveIntensity = 4.2;
      renderer.toneMappingExposure = 1.05;
    } else {
      dirLightKey.intensity = 2.4;
      dirLightKey.color.setHex(0xfff5ea);
      fillLight.intensity = 1.1;
      fillLight.color.setHex(0x404859);
      ambientLight.intensity = 0.9;
      ambientLight.color.setHex(0x232630);
      orangePoint1.intensity = 3.2;
      orangePoint2.intensity = 2.4;
      orangeEmissiveMat.emissiveIntensity = 2.8;
      renderer.toneMappingExposure = 1.15;
    }
  }

  // --- INTERACTION & CONTROLS ---
  // Mouse parallax & Drag rotation state
  let isDragging = false;
  let previousMouseX = 0;
  let previousMouseY = 0;
  let targetRotationY = 0.15;
  let targetRotationX = 0.05;
  let currentRotationY = 0.15;
  let currentRotationX = 0.05;
  let pointerNormX = 0;
  let pointerNormY = 0;
  let autoRotate = true;
  let isVisible = true;

  // Raycasting for subtle inspection annotations
  const raycaster = new THREE.Raycaster();
  const mouseVec = new THREE.Vector2(-999, -999);
  let hoveredMesh = null;

  const onPointerMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    pointerNormX = (x / rect.width) * 2 - 1;
    pointerNormY = -(y / rect.height) * 2 + 1;

    mouseVec.x = pointerNormX;
    mouseVec.y = pointerNormY;

    if (isDragging) {
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotationY += deltaX * 0.007;
      targetRotationX = Math.max(-0.35, Math.min(0.45, targetRotationX + deltaY * 0.007));

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
      autoRotate = false;
    }
  };

  const onPointerDown = (e) => {
    isDragging = true;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
    container.style.cursor = 'grabbing';
  };

  const onPointerUp = () => {
    isDragging = false;
    container.style.cursor = 'grab';
  };

  container.style.cursor = 'grab';
  container.addEventListener('pointermove', onPointerMove);
  container.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointerup', onPointerUp);

  // Resize handling
  const onResize = () => {
    if (!container) return;
    const w = container.clientWidth || 600;
    const h = container.clientHeight || 560;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  const resizeObserver = new ResizeObserver(() => {
    onResize();
  });
  resizeObserver.observe(container);

  // Visibility observer to pause RAF when off-screen
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.1 });
  intersectionObserver.observe(container);

  // Reset View action
  function resetCamera() {
    targetRotationY = 0.15;
    targetRotationX = 0.05;
    autoRotate = true;
  }

  // Animation Loop
  let animationFrameId;
  const clock = new THREE.Clock();

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    if (!isVisible) return;

    const delta = clock.getDelta();

    // Gentle auto-rotation when user is not dragging
    if (autoRotate) {
      targetRotationY += delta * 0.08;
    }

    // Smooth lerp damping
    const parallaxTargetY = targetRotationY + pointerNormX * 0.15;
    const parallaxTargetX = targetRotationX - pointerNormY * 0.12;

    currentRotationY += (parallaxTargetY - currentRotationY) * 0.05;
    currentRotationX += (parallaxTargetX - currentRotationX) * 0.05;

    pavilionGroup.rotation.y = currentRotationY;
    pavilionGroup.rotation.x = currentRotationX;

    // Raycast check for hover info callback
    raycaster.setFromCamera(mouseVec, camera);
    const intersects = raycaster.intersectObjects(interactiveParts, false);

    if (intersects.length > 0) {
      const topHit = intersects[0].object;
      if (hoveredMesh !== topHit) {
        hoveredMesh = topHit;
        if (window.__onArchitecturalHover) {
          window.__onArchitecturalHover(topHit.userData);
        }
      }
    } else {
      if (hoveredMesh !== null) {
        hoveredMesh = null;
        if (window.__onArchitecturalHover) {
          window.__onArchitecturalHover(null);
        }
      }
    }

    renderer.render(scene, camera);
  }

  animate();

  return {
    destroy: () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    },
    toggleLighting: () => {
      setLightingMode(!isDuskMode);
      return !isDuskMode;
    },
    resetView: resetCamera,
    isDusk: () => isDuskMode
  };
}

/**
 * Fallback renderer when WebGL is unavailable or fails.
 */
function renderFallback(container) {
  container.innerHTML = `
    <div class="architectural-fallback-card" role="img" aria-label="Isometric Architectural Pavilion Illustration">
      <div class="fallback-blueprint-grid"></div>
      <svg class="fallback-svg" viewBox="0 0 500 420" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="concreteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4a4d55" />
            <stop offset="100%" stop-color="#1f2228" />
          </linearGradient>
          <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ff5500" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#ff7722" stop-opacity="0.2" />
          </linearGradient>
        </defs>
        <!-- Stepped Base -->
        <polygon points="250,340 420,260 250,180 80,260" fill="#181a20" stroke="#2d313b" stroke-width="2"/>
        <polygon points="80,260 250,340 250,360 80,280" fill="#121418" />
        <polygon points="420,260 250,340 250,360 420,280" fill="#1e2129" />
        <!-- Monolith Shear Core -->
        <polygon points="180,220 230,195 230,80 180,105" fill="#2c303a" stroke="#ff5500" stroke-width="1.2"/>
        <polygon points="230,195 280,220 280,105 230,80" fill="#3c414e"/>
        <!-- Cantilever Platform -->
        <polygon points="250,210 390,140 250,70 110,140" fill="url(#concreteGrad)" stroke="#525763" stroke-width="1.5"/>
        <polygon points="110,140 250,210 250,225 110,155" fill="#17191f"/>
        <polygon points="390,140 250,210 250,225 390,155" fill="#292c35"/>
        <!-- Orange Cove Light Accent -->
        <line x1="120" y1="150" x2="250" y2="218" stroke="url(#orangeGlow)" stroke-width="4"/>
        <!-- Upper Canopy -->
        <polygon points="240,110 350,55 240,0 130,55" fill="#363a44" stroke="#606674" stroke-width="1.2"/>
        <!-- Architectural Annotations -->
        <circle cx="250" cy="210" r="4" fill="#ff5500"/>
        <text x="260" y="214" fill="#ff5500" font-family="monospace" font-size="11">[CANTILEVER VOID // LEVEL 02]</text>
      </svg>
      <div class="fallback-note">
        <span>ARCHITECTURAL ISOMETRIC BLUEPRINT</span>
        <span class="sub">Hardware-accelerated WebGL fallback view active</span>
      </div>
    </div>
  `;
}
