/* ================= HAMBURGER ================= */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
/* ================= SEARCH DATA ================= */
const searchData = [
  { name: "Attorney Services" },
  { name: "Legal Consultation" },
  { name: "Business Legal Support" },
  { name: "Bookkeeping" },
  { name: "Accounting Services" },
  { name: "Financial Reporting" },
  { name: "Tax Services" },
  { name: "IRS Compliance" },
  { name: "Tax Filing" }
];
/* ================= SEARCH FUNCTION ================= */
function setupSearch(inputId, resultsId) {
  const input = document.getElementById(inputId);
  const resultsBox = document.getElementById(resultsId);
  let activeIndex = -1;
  if (!input || !resultsBox) return;
  input.addEventListener("input", () => {
    const value = input.value.trim().toLowerCase();
    resultsBox.innerHTML = "";
    activeIndex = -1;
    if (!value) {
      resultsBox.style.display = "none";
      return;
    }
    const matches = searchData.filter(item =>
      item.name.toLowerCase().includes(value)
    );
    if (matches.length === 0) {
      resultsBox.innerHTML = `<div class="search-item">No results found</div>`;
    } else {
      matches.forEach(item => {
        const div = document.createElement("div");
        div.className = "search-item";
        div.innerHTML = item.name.replace(
          new RegExp(value, "gi"),
          match => `<mark>${match}</mark>`
        );
        div.addEventListener("click", () => {
          window.location.href =
            `search.html?q=${encodeURIComponent(item.name)}`;
        });
        resultsBox.appendChild(div);
      });
    }
    resultsBox.style.display = "block";
  });
  input.addEventListener("keydown", (e) => {
    const items = resultsBox.querySelectorAll(".search-item");
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.value.trim()) {
        window.location.href =
          `search.html?q=${encodeURIComponent(input.value.trim())}`;
      }
      return;
    }
    if (!items.length) return;
    if (e.key === "ArrowDown") {
      activeIndex = (activeIndex + 1) % items.length;
    } else if (e.key === "ArrowUp") {
      activeIndex = (activeIndex - 1 + items.length) % items.length;
    }
    items.forEach(item => item.classList.remove("active"));
    if (activeIndex >= 0) items[activeIndex].classList.add("active");
  });
  document.addEventListener("click", (e) => {
    if (!resultsBox.contains(e.target) && e.target !== input) {
      resultsBox.style.display = "none";
    }
  });
}
/* ================= INIT ================= */
setupSearch("searchInput", "searchResults");
setupSearch("searchInputMobile", "searchResultsMobile");
  /* ================= HERO SLIDER ================= */
/* ================= HERO SLIDER (RIGHT → LEFT) ================= */
const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
const slider = document.getElementById("heroSlider");
const progress = document.querySelector(".progress-bar");
let index = 0;
let slideInterval = null;
let progressInterval = null;
/* RESPONSIVE SLIDE TIME */
function getSlideTime() {
  const w = window.innerWidth;
  if (w <= 480) return 4000;   // mobile
  if (w <= 900) return 3000;   // tablet
  return 2000;                // desktop
}
let slideTime = getSlideTime();
/* ================= SHOW SLIDE ================= */
function showSlide(newIndex) {
  if (newIndex === index) return;
  const currentSlide = slides[index];
  const nextSlide = slides[newIndex];
  slides.forEach(slide => {
    slide.classList.remove("active", "exit-left");
    slide.style.transform = "translateX(100%)";
    slide.style.opacity = "0";
  });
  currentSlide.classList.add("exit-left");
  currentSlide.style.transform = "translateX(-100%)";
  currentSlide.style.opacity = "0";
  nextSlide.classList.add("active");
  nextSlide.style.transform = "translateX(0)";
  nextSlide.style.opacity = "1";
  dots.forEach(dot => dot.classList.remove("active"));
  dots[newIndex].classList.add("active");
  index = newIndex;
  startProgress();
}
/* ================= AUTO SLIDE ================= */
function startAutoSlide() {
  stopAutoSlide();
  slideTime = getSlideTime();
  slideInterval = setInterval(() => {
    const nextIndex = (index + 1) % slides.length;
    showSlide(nextIndex);
  }, slideTime);
}
function stopAutoSlide() {
  if (slideInterval) clearInterval(slideInterval);
  if (progressInterval) clearInterval(progressInterval);
}
/* ================= PROGRESS BAR ================= */
function startProgress() {
  let width = 0;
  progress.style.width = "0%";
  if (progressInterval) clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    width += 100 / (slideTime / 100);
    progress.style.width = width + "%";
    if (width >= 100) clearInterval(progressInterval);
  }, 100);
}
/* ================= DOT CLICK ================= */
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const target = Number(dot.dataset.slide);
    showSlide(target);
    startAutoSlide();
  });
});
/* ================= PAUSE ON HOVER ================= */
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);
/* ================= HANDLE RESIZE ================= */
window.addEventListener("resize", () => {
  slideTime = getSlideTime();
  startAutoSlide();
});
/* ================= INIT ================= */
slides.forEach((slide, i) => {
  slide.style.transform = i === 0 ? "translateX(0)" : "translateX(100%)";
  slide.style.opacity = i === 0 ? "1" : "0";
});
slides[0].classList.add("active");
dots[0].classList.add("active");
startProgress();
startAutoSlide();
/* ================= TRUST BAR ================= */
const heroSection = document.querySelector(".hero");
const trustBarEl = document.getElementById("trustBar");

if (heroSection && trustBarEl) {
  const heroObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          trustBarEl.classList.add("sticky-show");
        } else {
          trustBarEl.classList.remove("sticky-show");
        }
      });
    },
    { threshold: 0.1 }
  );

  heroObserver.observe(heroSection);
}

window.addEventListener("resize", () => {
  slideTime = getSlideTime();
  startAutoSlide();
});
/* FAQ ACCORDION */
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    item.classList.toggle("active");
  });
});

/* FORM VALIDATION */
const form = document.getElementById("contactForm");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const successBox = document.getElementById("formSuccess");

if (form && emailInput && emailError) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const emailValue = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(emailValue)) {
      emailError.textContent = "Please enter a valid email address.";
      return;
    }

    emailError.textContent = "";
    form.style.display = "none";
    successBox.style.display = "block";
  });
}





