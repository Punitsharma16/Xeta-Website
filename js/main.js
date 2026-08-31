/* XetaX CRM marketing site — zero dependencies, everything progressive. */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------- sticky nav state */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* -------------------------------------------------------- mobile menu */
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");
  if (burger && links) {
    burger.addEventListener("click", () => links.classList.toggle("is-open"));
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") links.classList.remove("is-open");
    });
  }

  /* ------------------------------------------------------ scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add("is-visible"), delay);
        io.unobserve(entry.target);
      }),
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------- counters */
  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion || target === 0) { el.textContent = target; return; }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 900, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      runCounter(entry.target);
      cio.unobserve(entry.target);
    }), { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  /* ------------------------------------------------- product tour tabs */
  const tourTabs = document.getElementById("tourTabs");
  const tourImg = document.getElementById("tourImg");
  const tourCap = document.getElementById("tourCap");
  if (tourTabs && tourImg) {
    tourTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".tour__tab");
      if (!tab) return;
      tourTabs.querySelectorAll(".tour__tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      tourImg.classList.add("is-swapping");
      setTimeout(() => {
        tourImg.src = tab.dataset.shot;
        tourCap.textContent = tab.dataset.cap;
        tourImg.onload = () => tourImg.classList.remove("is-swapping");
      }, reduceMotion ? 0 : 180);
    });
  }

  /* ------------------------------------------------------ business tabs */
  const bizTabs = document.getElementById("bizTabs");
  if (bizTabs) {
    const panels = document.querySelectorAll(".biz__panel");
    bizTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".biz__tab");
      if (!tab) return;
      bizTabs.querySelectorAll(".biz__tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      panels.forEach((p) => p.classList.toggle("is-active", p.dataset.biz === tab.dataset.biz));
    });
  }
})();
