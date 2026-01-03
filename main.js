(function () {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });

    mainNav.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-link")) {
        mainNav.classList.remove("open");
      }
    });
  }

  const yearSpanList = document.querySelectorAll("#yearSpan");
  const currentYear = new Date().getFullYear();
  yearSpanList.forEach((el) => (el.textContent = currentYear));

  const orbitWrap = document.getElementById("hubOrbitWrap");
  if (orbitWrap) {
    const originalTransform = orbitWrap.style.transform || "";
    window.addEventListener("mousemove", (e) => {
      const rect = orbitWrap.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const rotateX = (y / rect.height) * -10;
      const rotateY = (x / rect.width) * 10;
      orbitWrap.style.transform =
        originalTransform +
        ` rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    window.addEventListener("mouseleave", () => {
      orbitWrap.style.transform = originalTransform;
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  const observer =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        )
      : null;

  if (observer) {
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("visible"));
  }

  const slider = document.getElementById("testimonialsSlider");
  if (slider) {
    const track = slider.querySelector(".testimonial-track");
    if (track) {
      track.innerHTML = track.innerHTML + track.innerHTML;
      slider.addEventListener("mouseenter", () => {
        track.style.animationPlayState = "paused";
      });
      slider.addEventListener("mouseleave", () => {
        track.style.animationPlayState = "running";
      });
    }
  }

  const COOKIE_KEY = "mahadev_cookie_pref";
  const cookiePopup = document.getElementById("cookiePopup");
  const cookieModal = document.getElementById("cookieModal");
  const cookieAccept = document.getElementById("cookieAccept");
  const cookieCustomise = document.getElementById("cookieCustomise");
  const cookieSave = document.getElementById("cookieSave");

  function showCookiePopupOnce() {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored && cookiePopup) {
        cookiePopup.classList.add("active");
      }
    } catch (e) {
      if (cookiePopup) cookiePopup.classList.add("active");
    }
  }

  function saveCookiePref(pref) {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify(pref));
    } catch (e) {
    }
  }

  if (cookieAccept && cookiePopup) {
    cookieAccept.addEventListener("click", () => {
      saveCookiePref({ analytics: true });
      cookiePopup.classList.remove("active");
    });
  }

  if (cookieCustomise && cookieModal) {
    cookieCustomise.addEventListener("click", () => {
      cookieModal.classList.add("active");
    });
  }

  if (cookieSave && cookieModal && cookiePopup) {
    cookieSave.addEventListener("click", () => {
      const analyticsToggle = document.getElementById("analyticsToggle");
      const analyticsEnabled = analyticsToggle ? analyticsToggle.checked : false;
      saveCookiePref({ analytics: analyticsEnabled });
      cookieModal.classList.remove("active");
      cookiePopup.classList.remove("active");
    });
  }

  if (cookieModal) {
    cookieModal.addEventListener("click", (e) => {
      if (e.target === cookieModal) {
        cookieModal.classList.remove("active");
      }
    });
  }

  // Cursor glow
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow) {
    let shrinkTimeout;

    document.body.classList.add("cursor-hidden");

    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
      cursorGlow.classList.add("visible");
      cursorGlow.classList.remove("shrink");

      clearTimeout(shrinkTimeout);
      shrinkTimeout = setTimeout(() => {
        cursorGlow.classList.add("shrink");
      }, 120);
    });

    document.addEventListener("mouseleave", () => {
      cursorGlow.classList.remove("visible");
    });
  }

  document.addEventListener("DOMContentLoaded", showCookiePopupOnce);
})();

function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const status = document.getElementById("formStatus");
  if (!status) return false;

  const name = form.name.value.trim();
  status.textContent =
    "Thank you, " +
    name +
    ". The details have been captured locally. The team will contact you shortly via phone or email.";
  return false;
}
