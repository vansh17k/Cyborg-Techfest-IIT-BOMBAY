/* ==========================================================================
   IIT BOMBAY TECHFEST 2026 - FUTURISTIC CYBERNETIC ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  /* --------------------------------------------------------------------------
     01. INITIALIZING STATES & CONSTANTS
     -------------------------------------------------------------------------- */
  const state = {
    isBooted: false,
    mouseX: 0,
    mouseY: 0,
    cursorX: 0,
    cursorY: 0,
    ringX: 0,
    ringY: 0,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    activeDay: 1,
  };

  // Cache major DOM nodes
  const body = document.body;
  const loadingScreen = document.getElementById("loading-screen");
  const progressBar = document.getElementById("progress-bar");
  const loadingPercentage = document.getElementById("loading-percentage");
  const loadingConsole = document.getElementById("loading-console");
  const customCursor = document.getElementById("customCursor");
  const cursorDot = customCursor ? customCursor.querySelector(".cursor-dot") : null;
  const cursorRing = customCursor ? customCursor.querySelector(".cursor-ring") : null;
  const navbar = document.getElementById("navbar");
  const mobileToggle = document.getElementById("mobileToggle");
  const navMenu = document.getElementById("navMenu");
  const cyborgHeadContainer = document.getElementById("cyborgHeadContainer");
  const cyborgHead = document.getElementById("cyborgHead");
  const particleCanvas = document.getElementById("particleCanvas");
  const holoGraphCanvas = document.getElementById("holoGraphCanvas");

  /* --------------------------------------------------------------------------
     02. SYSTEM BOOT / LOADING CONTROLLER
     -------------------------------------------------------------------------- */
  const bootMessages = [
    { text: "ESTABLISHING NEURAL LINK...", type: "system" },
    { text: "ALLOCATING LOCAL SYNAPSE CORES...", type: "system" },
    { text: "NEURAL INTERFACE ONLINE.", type: "success" },
    { text: "SYNCING COORDINATES // Powai, Mumbai...", type: "system" },
    { text: "OPTICAL SENSORS ACTIVE.", type: "success" },
    { text: "CONNECTING AI COGNITIVE LOGIC...", type: "system" },
    { text: "AI CORE CONNECTED.", type: "success" },
    { text: "VERIFYING CRYPTO TOKEN: STATUS OK.", type: "system" },
    { text: "ENERGY SHIELD CORES STABLE.", type: "success" },
    { text: "SYS_ACCESS // GRANTED.", type: "success" }
  ];

  function runBootSequence() {
    let progress = 0;
    let messageIndex = 0;
    const duration = 2000; // 2 seconds total boot
    const intervalTime = 20; // Update every 20ms
    const step = 100 / (duration / intervalTime);

    // Initial console welcome
    addConsoleLine("CYBORG BOOT SEQUENCE PROTOCOL v2.6.0", "system");

    const timer = setInterval(() => {
      progress += step;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        completeBoot();
      }

      // Update progress bar & label
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (loadingPercentage) loadingPercentage.innerText = `${Math.floor(progress)}%`;

      // Trigger console log injections at progress intervals
      const targetMessageIndex = Math.floor((progress / 100) * bootMessages.length);
      while (messageIndex < targetMessageIndex && messageIndex < bootMessages.length) {
        const msg = bootMessages[messageIndex];
        addConsoleLine(msg.text, msg.type);
        messageIndex++;
      }
    }, intervalTime);
  }

  function addConsoleLine(text, type) {
    if (!loadingConsole) return;
    const line = document.createElement("div");
    line.className = `console-line ${type === "success" ? "success" : ""}`;
    line.innerHTML = `<span class="prompt">&gt;</span> ${text}`;
    loadingConsole.appendChild(line);
    loadingConsole.scrollTop = loadingConsole.scrollHeight;
  }

  function completeBoot() {
    state.isBooted = true;
    sessionStorage.setItem("techfest_booted", "true");
    
    // Add access granted sound/vibe indicators
    addConsoleLine("ACCESS PROTOCOLS INITIATED. ENJOY THE MATRIX.", "success");
    
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";
      }
      
      // Trigger entrance animations
      revealHeroContent();
    }, 400);
  }

  function checkSessionBootStatus() {
    const wasBooted = sessionStorage.getItem("techfest_booted");
    if (wasBooted === "true") {
      // Skip loader instantly
      if (loadingScreen) {
        loadingScreen.style.display = "none";
      }
      state.isBooted = true;
      revealHeroContent();
    } else {
      // Run normal boot
      runBootSequence();
    }
  }

  function revealHeroContent() {
    const badge = document.getElementById("heroBadge");
    const title = document.getElementById("heroTitle");
    const subtitle = document.getElementById("heroSubtitle");
    const cta = document.getElementById("heroCta");
    
    // Smooth stagger entrance via delays
    if (badge) setTimeout(() => badge.classList.add("scroll-fade-in", "is-visible"), 100);
    if (title) setTimeout(() => title.classList.add("scroll-fade-in", "is-visible"), 250);
    if (subtitle) setTimeout(() => subtitle.classList.add("scroll-fade-in", "is-visible"), 400);
    if (cta) setTimeout(() => cta.classList.add("scroll-fade-in", "is-visible"), 550);
    
    // Start dynamic typing effect
    startTypingEffect();
  }

  /* --------------------------------------------------------------------------
     03. CUSTOM VISUAL CURSOR ENGINE
     -------------------------------------------------------------------------- */
  function initCustomCursor() {
    if (!customCursor) return;

    window.addEventListener("mousemove", (e) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      
      // Instantly position the small dot
      if (cursorDot) {
        cursorDot.style.left = `${state.mouseX}px`;
        cursorDot.style.top = `${state.mouseY}px`;
      }
    });

    // Handle interactive hovers to apply visual effects
    const hoverables = document.querySelectorAll("a, button, .feature-card, .timeline-tab-btn, .social-link, input");
    hoverables.forEach(elem => {
      elem.addEventListener("mouseenter", () => {
        body.classList.add("cursor-hover");
      });
      elem.addEventListener("mouseleave", () => {
        body.classList.remove("cursor-hover");
      });
    });

    // Click Ripple Animation
    window.addEventListener("mousedown", () => {
      body.classList.add("cursor-active");
      const ripple = customCursor.querySelector(".cursor-ripple");
      if (ripple) {
        ripple.style.left = `${state.mouseX}px`;
        ripple.style.top = `${state.mouseY}px`;
      }
    });

    window.addEventListener("mouseup", () => {
      // Small cooldown delay before removing click effect
      setTimeout(() => {
        body.classList.remove("cursor-active");
      }, 350);
    });
  }

  // Double elements easing interpolation loop
  function updateCursorPhysics() {
    if (customCursor && cursorRing) {
      // Linear interpolation (Lerp) with 0.15 easing constant
      state.ringX += (state.mouseX - state.ringX) * 0.15;
      state.ringY += (state.mouseY - state.ringY) * 0.15;

      cursorRing.style.left = `${state.ringX}px`;
      cursorRing.style.top = `${state.ringY}px`;
    }
    requestAnimationFrame(updateCursorPhysics);
  }

  /* --------------------------------------------------------------------------
     04. CYBORG HEAD 3D INTERACTIVE PARALLAX
     -------------------------------------------------------------------------- */
  function initCyborgHeadParallax() {
    if (!cyborgHeadContainer || !cyborgHead) return;

    window.addEventListener("mousemove", (e) => {
      // Calculate coordinates relative to screen center
      const centerX = state.windowWidth / 2;
      const centerY = state.windowHeight / 2;
      const diffX = e.clientX - centerX;
      const diffY = e.clientY - centerY;

      // Limit max deflection rotation (degrees)
      const maxRotateY = 14;
      const maxRotateX = 10;
      
      const rotateY = (diffX / centerX) * maxRotateY;
      const rotateX = -(diffY / centerY) * maxRotateX;

      // Apply subtle 3D tilt directly to the SVG chassis container
      cyborgHead.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Parallax offset depth multiplier for inner layers
      const parallaxLayers = cyborgHead.querySelectorAll(".parallax-layer");
      parallaxLayers.forEach(layer => {
        const depth = parseFloat(layer.getAttribute("data-depth") || "0.2");
        const moveX = (diffX / centerX) * (40 * depth);
        const moveY = (diffY / centerY) * (30 * depth);
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  }

  /* --------------------------------------------------------------------------
     05. ATMOSPHERIC PARTICLE MATRIX (CANVAS)
     -------------------------------------------------------------------------- */
  function initParticleCanvas() {
    if (!particleCanvas) return;
    const ctx = particleCanvas.getContext("2d");
    if (!ctx) return;

    let particles = [];
    const particleCount = 65;

    function resizeCanvas() {
      state.windowWidth = window.innerWidth;
      state.windowHeight = window.innerHeight;
      particleCanvas.width = state.windowWidth;
      particleCanvas.height = state.windowHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height + particleCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = -(Math.random() * 0.7 + 0.2);
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.15;
        this.hue = Math.random() > 0.5 ? 180 : 270; // Cyan or Purple tint
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        // Reset if particles travel above screen top or drift off limits
        if (this.y < 0 || this.x < 0 || this.x > particleCanvas.width) {
          this.reset();
          this.y = particleCanvas.height;
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.alpha})`;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 50%, 0.5)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles array
    for (let i = 0; i < particleCount; i++) {
      const p = new Particle();
      p.y = Math.random() * particleCanvas.height; // Distribute evenly at start
      particles.push(p);
    }

    function animateParticles() {
      ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  /* --------------------------------------------------------------------------
     06. HOLOGRAPHIC WAVE SCOPE DRAWING (CANVAS)
     -------------------------------------------------------------------------- */
  function initHoloGraphCanvas() {
    if (!holoGraphCanvas) return;
    const ctx = holoGraphCanvas.getContext("2d");
    if (!ctx) return;

    let animFrame;
    let waveOffset = 0;

    function resizeGraph() {
      const rect = holoGraphCanvas.parentElement.getBoundingClientRect();
      holoGraphCanvas.width = rect.width;
      holoGraphCanvas.height = rect.height;
    }

    window.addEventListener("resize", resizeGraph);
    resizeGraph();

    function drawHoloGraph() {
      ctx.clearRect(0, 0, holoGraphCanvas.width, holoGraphCanvas.height);
      const width = holoGraphCanvas.width;
      const height = holoGraphCanvas.height;
      const centerY = height / 2;

      // Draw subtle background auxiliary guide markers
      ctx.strokeStyle = "rgba(0, 245, 255, 0.04)";
      ctx.lineWidth = 0.5;
      
      // Horizontal guides
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(0, centerY - 60);
      ctx.lineTo(width, centerY - 60);
      ctx.moveTo(0, centerY + 60);
      ctx.lineTo(width, centerY + 60);
      ctx.stroke();

      // Dynamic Oscilloscope Waveform (Cyan)
      ctx.strokeStyle = "rgba(0, 245, 255, 0.65)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(0, 245, 255, 0.5)";
      ctx.shadowBlur = 10;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        // Multi-frequency sine wave calculations
        const angle1 = (x / width) * Math.PI * 4 + waveOffset;
        const angle2 = (x / width) * Math.PI * 8 - waveOffset * 0.5;
        const amp = Math.sin(x / 50 + waveOffset) * 20; // Amplitude modulation
        
        const y = centerY + Math.sin(angle1) * (35 + amp) + Math.cos(angle2) * 15;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Secondary purple harmonic waveform
      ctx.strokeStyle = "rgba(157, 78, 221, 0.4)";
      ctx.lineWidth = 1;
      ctx.shadowBlur = 0;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        const angle1 = (x / width) * Math.PI * 6 - waveOffset * 0.8;
        const y = centerY + Math.cos(angle1) * 25 + Math.sin(x / 10 + waveOffset) * 5;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw active coordinates tracking box
      ctx.fillStyle = "#00FFC6";
      ctx.shadowColor = "#00FFC6";
      ctx.shadowBlur = 6;
      
      const locatorX = (width * 0.6) + Math.sin(waveOffset) * 30;
      const locatorY = centerY + Math.sin((locatorX / width) * Math.PI * 4 + waveOffset) * 35;
      
      ctx.beginPath();
      ctx.arc(locatorX, locatorY, 3, 0, Math.PI * 2);
      ctx.fill();

      waveOffset += 0.035;
      animFrame = requestAnimationFrame(drawHoloGraph);
    }

    drawHoloGraph();
  }

  /* --------------------------------------------------------------------------
     07. GLITCHING TYPIST ENGINE
     -------------------------------------------------------------------------- */
  const words = ["TOMORROW", "THE SYSTEM", "THE FUTURE", "EVOLUTION"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typing-text");

  function startTypingEffect() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typingElement.innerHTML = currentWord.substring(0, charIndex);

    let speed = 120; // Typing speed

    if (isDeleting) {
      speed /= 2; // Delete twice as fast
    }

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400; // Pause before typing next word
    }

    setTimeout(startTypingEffect, speed);
  }

  /* --------------------------------------------------------------------------
     08. COMPONENT GLASS TILT EFFECT (MOUSE FOLLOW INTERACTION)
     -------------------------------------------------------------------------- */
  function initGlassTiltEffect() {
    const cards = document.querySelectorAll(".tilt-element");
    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Custom properties set on elements to update background neon glow gradient position
        card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
        card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);

        // Compute tilted angle bounds (max 8 degrees tilt)
        const tiltX = -((y / rect.height) - 0.5) * 16;
        const tiltY = ((x / rect.width) - 0.5) * 16;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
      });

      card.addEventListener("mouseleave", () => {
        // Smoothly restore defaults
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });
    });
  }

  /* --------------------------------------------------------------------------
     09. NUMERIC RUN-UP intersection counters
     -------------------------------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll(".counter-element");
    
    const observerOptions = {
      root: null,
      threshold: 0.15,
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetNum = parseInt(target.getAttribute("data-target") || "0");
          animateCounter(target, targetNum);
          observer.unobserve(target); // Prevent multi-triggers on re-scroll
        }
      });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(element, targetNum) {
    let start = 0;
    const duration = 1500; // 1.5 seconds animation
    const startTime = performance.now();

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing out quadratic curves
      const easedProgress = progress * (2 - progress);
      const current = Math.floor(easedProgress * targetNum);
      
      element.innerText = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.innerText = targetNum; // Ensure final target resolution
      }
    }

    requestAnimationFrame(step);
  }

  /* --------------------------------------------------------------------------
     10. INTERACTIVE CHRONO TIMELINE PROTOCOL
     -------------------------------------------------------------------------- */
  function initTimeline() {
    const tabBtns = document.querySelectorAll(".timeline-tab-btn");
    const connectorProgress = document.getElementById("connectorProgress");
    const dayPanels = document.querySelectorAll(".timeline-day-panel");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const selectedDay = parseInt(btn.getAttribute("data-day") || "1");
        
        // Remove active markers
        tabBtns.forEach(b => b.classList.remove("active"));
        dayPanels.forEach(p => {
          p.classList.remove("active");
          p.style.display = "none";
        });

        // Set active markers
        btn.classList.add("active");
        
        const currentPanel = document.getElementById(`day-panel-${selectedDay}`);
        if (currentPanel) {
          currentPanel.style.display = "block";
          // Trigger force layout reflow before starting transition
          currentPanel.offsetHeight;
          currentPanel.classList.add("active");
        }

        // Adjust HUD connection bar width percentage
        if (connectorProgress) {
          const widths = { 1: "15%", 2: "50%", 3: "100%" };
          connectorProgress.style.width = widths[selectedDay];
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     11. SIMULATED SECURE ACCESS REGISTRATION PORTAL
     -------------------------------------------------------------------------- */
  window.handleRegistration = function() {
    const nameInput = document.getElementById("regName");
    const emailInput = document.getElementById("regEmail");
    const submitBtn = document.getElementById("regSubmitBtn");
    const feedback = document.getElementById("formFeedback");

    if (!nameInput || !emailInput || !submitBtn || !feedback) return;

    // Standard DOM sanitizations
    const userName = nameInput.value.trim().toUpperCase();
    const userEmail = emailInput.value.trim();

    if (!userName || !userEmail) {
      feedback.className = "form-feedback error";
      feedback.innerText = "CRITICAL_ERR // SECURE FIELDS INCOMPLETE.";
      return;
    }

    // Initiate terminal progress simulated states
    submitBtn.disabled = true;
    submitBtn.classList.add("btn-disabled");
    const originalText = submitBtn.querySelector(".btn-text").innerText;
    submitBtn.querySelector(".btn-text").innerText = "COMMENCING UPLINK...";
    feedback.className = "form-feedback";
    feedback.innerText = "";

    const simulationSteps = [
      "Establishing server uplink pipeline...",
      "Syncing secure master ledger nodes...",
      "Cryptographic signature verified...",
      "SYS_REGIST_GRANTED // ACCESS KEY ISSUED."
    ];

    let stepIndex = 0;
    
    function playStep() {
      if (stepIndex < simulationSteps.length) {
        feedback.innerText = `STATUS: ${simulationSteps[stepIndex]}`;
        stepIndex++;
        setTimeout(playStep, 600);
      } else {
        // Final success state resolving
        const cryptoKey = `TF-2026-${Math.floor(1000 + Math.random() * 9000)}-X85A`;
        feedback.className = "form-feedback success";
        feedback.innerHTML = `SUCCESS // GATE ACCESS OPENED.<br>UPLINK_TOKEN: <strong style="color:#00FFC6;">${cryptoKey}</strong>`;
        submitBtn.querySelector(".btn-text").innerText = "UPLINK ESTABLISHED";
        
        // Reset fields
        nameInput.value = "";
        emailInput.value = "";
        
        // Re-enable after cooling down
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.classList.remove("btn-disabled");
          submitBtn.querySelector(".btn-text").innerText = originalText;
        }, 5000);
      }
    }

    playStep();
  };

  /* --------------------------------------------------------------------------
     12. SCROLL REVEALS & ACTIVE LINK INTERACTION OBSERVER
     -------------------------------------------------------------------------- */
  function initScrollObservers() {
    const revealElements = document.querySelectorAll(".scroll-fade-in");
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(elem => revealObserver.observe(elem));

    // Navbar Scrolled dark background transition
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });

    // Tracking active links on scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      let currentSectionId = "";
      const scrollPos = window.scrollY + 120; // Offset calculation

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute("id");
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${currentSectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. MOBILE MENU COLLAPSIBLE CONTROLLER
     -------------------------------------------------------------------------- */
  function initMobileMenu() {
    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !isExpanded);
      mobileToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when links are clicked
    const links = navMenu.querySelectorAll(".nav-link");
    links.forEach(link => {
      link.addEventListener("click", () => {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  /* --------------------------------------------------------------------------
     14. DELEGATED EXECUTION PROTOCOL
     -------------------------------------------------------------------------- */
  checkSessionBootStatus();
  initCustomCursor();
  requestAnimationFrame(updateCursorPhysics);
  initCyborgHeadParallax();
  initParticleCanvas();
  initHoloGraphCanvas();
  initGlassTiltEffect();
  initCounters();
  initTimeline();
  initScrollObservers();
  initMobileMenu();
});
