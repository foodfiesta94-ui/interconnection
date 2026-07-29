const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

document.querySelectorAll(".country-item").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".country-item").forEach((country) => country.classList.remove("active"));
    item.classList.add("active");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.getElementById("year").textContent = new Date().getFullYear();
