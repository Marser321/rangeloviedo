(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroes = Array.from(document.querySelectorAll(".scrolly-hero"));

  const STAGES = [
    { from: 0.0, to: 0.18, stage: "0" },
    { from: 0.18, to: 0.38, stage: "1" },
    { from: 0.38, to: 0.58, stage: "2" },
    { from: 0.58, to: 0.78, stage: "3" },
    { from: 0.78, to: 1.01, stage: "4" },
  ];

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const padFrame = (value) => String(value).padStart(4, "0");
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  class HeroScroller {
    constructor(section) {
      this.section = section;
      this.sequence = section.dataset.sequence;
      this.frameCount = Number(section.dataset.frameCount || 90);
      this.canvas = section.querySelector(".hero-canvas");
      this.ctx = this.canvas.getContext("2d", { alpha: false });
      this.panels = Array.from(section.querySelectorAll(".stage-panel"));
      this.frames = new Array(this.frameCount);
      this.loaded = new Set();
      this.currentFrame = -1;
      this.assetSize = this.pickAssetSize();

      this.resize();
      this.loadFrame(0).then(() => {
        this.render(0);
        this.update(0);
      });

      if (!prefersReducedMotion) {
        this.preloadProgressively();
      } else {
        this.panels.forEach((panel) => panel.classList.add("is-active"));
      }
    }

    pickAssetSize() {
      return window.matchMedia("(max-width: 760px)").matches ? "mobile" : "desktop";
    }

    frameUrl(index) {
      return `assets/${this.sequence}/${this.assetSize}/frame_${padFrame(index + 1)}.webp`;
    }

    loadFrame(index) {
      if (this.frames[index]) return Promise.resolve(this.frames[index]);

      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          this.frames[index] = img;
          this.loaded.add(index);
          resolve(img);
        };
        img.onerror = () => {
          console.warn(`Missing frame: ${this.frameUrl(index)}`);
          resolve(null);
        };
        img.src = this.frameUrl(index);
      });
    }

    async preloadProgressively() {
      for (let index = 3; index < this.frameCount; index += 3) {
        await this.loadFrame(index);
      }
      for (let index = 1; index < this.frameCount; index += 1) {
        if (!this.frames[index]) await this.loadFrame(index);
      }
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = this.canvas.getBoundingClientRect();
      this.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      this.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.currentFrame = -1;
    }

    render(index) {
      if (index === this.currentFrame && this.loaded.has(index)) return;

      const img = this.frames[index] || this.frames.find(Boolean);
      if (!img) return;

      const rect = this.canvas.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;
      const imageRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let x = 0;
      let y = 0;

      if (imageRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imageRatio;
        x = (canvasWidth - drawWidth) / 2;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imageRatio;
        y = (canvasHeight - drawHeight) / 2;
      }

      this.ctx.fillStyle = "#0b0a08";
      this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      this.ctx.drawImage(img, x, y, drawWidth, drawHeight);
      this.currentFrame = index;
    }

    getProgress() {
      const scrollable = Math.max(1, this.section.offsetHeight - window.innerHeight);
      const sectionScroll = window.scrollY - this.section.offsetTop;
      return clamp(sectionScroll / scrollable, 0, 1);
    }

    activeStage(progress) {
      return STAGES.find((stage) => progress >= stage.from && progress < stage.to) || STAGES[0];
    }

    update(progress = this.getProgress()) {
      const frameIndex = prefersReducedMotion
        ? 0
        : Math.round(progress * (this.frameCount - 1));

      if (!prefersReducedMotion) {
        this.loadFrame(frameIndex).then(() => this.render(frameIndex));
      } else {
        this.render(0);
      }

      this.section.style.setProperty("--progress", progress.toFixed(4));

      if (prefersReducedMotion) return;

      const active = this.activeStage(progress);
      const localProgress = clamp((progress - active.from) / (active.to - active.from), 0, 1);
      const parallaxY = `${(localProgress - 0.5) * -26}px`;
      const parallaxX = `${(localProgress - 0.5) * 12}px`;

      this.panels.forEach((panel) => {
        const isActive = panel.dataset.stage === active.stage;
        panel.classList.toggle("is-active", isActive);
        if (isActive) {
          panel.style.setProperty("--card-shift-y", parallaxY);
          panel.style.setProperty("--card-shift-x", parallaxX);
        }
      });
    }

    onResize() {
      const nextSize = this.pickAssetSize();
      if (nextSize !== this.assetSize) {
        this.assetSize = nextSize;
        this.frames = new Array(this.frameCount);
        this.loaded.clear();
      }
      this.resize();
      this.update();
    }
  }

  const scrollers = heroes.map((hero) => new HeroScroller(hero));
  let ticking = false;

  function updateAll() {
    scrollers.forEach((scroller) => scroller.update());
    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateAll);
  }

  function updateNow() {
    if (ticking) ticking = false;
    updateAll();
  }

  function scrollerFor(target) {
    return scrollers.find((scroller) => scroller.section === target);
  }

  function targetTop(target, progress = 0) {
    const scroller = scrollerFor(target);
    if (!scroller) return target.getBoundingClientRect().top + window.scrollY;

    const scrollable = Math.max(1, target.offsetHeight - window.innerHeight);
    return target.offsetTop + scrollable * progress;
  }

  function setScrollPosition(top, behavior = "auto") {
    if (typeof window.scrollTo === "function") {
      window.scrollTo({ top, left: 0, behavior });
    }

    if (behavior === "auto") {
      document.documentElement.scrollTop = top;
      document.body.scrollTop = top;
    }
  }

  function syncAfterNavigation(target, progress = null) {
    const scroller = scrollerFor(target);
    if (scroller && progress !== null) {
      scroller.update(progress);
    }
    updateNow();
    requestAnimationFrame(updateNow);
    window.setTimeout(updateNow, 80);
    window.setTimeout(updateNow, 240);
  }

  function scrollToTarget(target, options = {}) {
    const {
      behavior = "smooth",
      updateHash = true,
      progress = 0,
    } = options;

    const top = targetTop(target, progress);
    setScrollPosition(top, behavior);

    if (updateHash && target.id && window.location.hash !== `#${target.id}`) {
      window.history.pushState(null, "", `#${target.id}`);
    }

    syncAfterNavigation(target, progress);
  }

  function handleHash(hash, options = {}) {
    if (!hash || hash === "#") return false;

    const id = decodeURIComponent(hash.replace(/^#/, ""));
    const target = document.getElementById(id);
    if (!target) return false;

    scrollToTarget(target, {
      behavior: options.behavior || "auto",
      updateHash: options.updateHash ?? false,
      progress: options.progress ?? 0,
    });
    return true;
  }

  function bindHashNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const id = decodeURIComponent(href.slice(1));
        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        scrollToTarget(target, {
          behavior: "auto",
          updateHash: true,
          progress: 0,
        });
      });
    });
  }

  function recoverCurrentHash() {
    handleHash(window.location.hash, { behavior: "auto", updateHash: false });
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", () => {
    scrollers.forEach((scroller) => scroller.onResize());
    requestUpdate();
  });

  async function applyReviewJump() {
    const jump = new URLSearchParams(window.location.search).get("jump");
    if (!jump) return false;

    const [targetId, rawProgress] = jump.split(":");
    const target = document.getElementById(targetId);
    const progress = clamp(Number(rawProgress), 0, 1);
    if (!target || Number.isNaN(progress)) return false;

    const scroller = scrollers.find((item) => item.section === target);
    if (scroller) {
      const frameIndex = Math.round(progress * (scroller.frameCount - 1));
      await scroller.loadFrame(frameIndex);
    }

    requestAnimationFrame(() => {
      scrollToTarget(target, {
        behavior: "auto",
        updateHash: false,
        progress,
      });
    });
    return true;
  }

  window.addEventListener("hashchange", () => {
    recoverCurrentHash();
  });

  window.addEventListener("load", () => {
    recoverCurrentHash();
    window.setTimeout(recoverCurrentHash, 180);
    window.setTimeout(recoverCurrentHash, 520);
  });

  bindHashNavigation();
  requestUpdate();
  applyReviewJump().then((jumpApplied) => {
    if (jumpApplied) return;
    recoverCurrentHash();
    window.setTimeout(recoverCurrentHash, 80);
    window.setTimeout(recoverCurrentHash, 300);
    window.setTimeout(recoverCurrentHash, 760);
  });
})();
