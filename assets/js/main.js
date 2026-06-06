// Hardrock — tiny, no-dependency progressive enhancement.
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    // Sticky header gains a border/background once scrolled.
    var header = document.querySelector("[data-header]");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", window.scrollY > 8);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Reveal-on-scroll. If IntersectionObserver is missing, show everything.
    var reveals = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var show = function (el) { el.classList.add("in"); };
    if (!("IntersectionObserver" in window) || reduce) {
      reveals.forEach(show);
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
      // Safety net: anything already on-screen at load reveals immediately,
      // even if the observer is slow to fire (tall monitors, anchor deep-links).
      requestAnimationFrame(function () {
        reveals.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) show(el);
        });
      });
    }

    // Copy-to-clipboard (donation address).
    document.querySelectorAll(".copy-btn").forEach(function (btn) {
      var state = btn.querySelector(".copy-state");
      var original = state ? state.textContent : "";
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy");
        var done = function () {
          if (!state) return;
          state.textContent = "copied ✓";
          setTimeout(function () { state.textContent = original; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(done);
        } else {
          var ta = document.createElement("textarea");
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); } catch (e) {}
          document.body.removeChild(ta); done();
        }
      });
    });
  });
})();
