// Theme Toggle
const themeToggle = document.getElementById("themeToggle")
const body = document.body

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark"
body.classList.toggle("dark", currentTheme === "dark")

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark")
  const theme = body.classList.contains("dark") ? "dark" : "light"
  localStorage.setItem("theme", theme)
})

// Navigation
const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll(".section")

// Function to show section
function showSection(targetId) {
  sections.forEach((section) => {
    section.classList.remove("active")
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
  })

  const targetSection = document.getElementById(targetId)
  const targetLink = document.querySelector(`[data-section="${targetId}"]`)

  if (targetSection) {
    targetSection.classList.add("active")
  }

  if (targetLink) {
    targetLink.classList.add("active")
  }
}

// Handle navigation clicks
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("data-section")
    showSection(targetId)

    // Update URL hash without jumping
    history.pushState(null, null, `#${targetId}`)
  })
})

// Handle browser back/forward buttons
window.addEventListener("popstate", () => {
  const hash = window.location.hash.slice(1) || "about"
  showSection(hash)
})

// Show initial section based on URL hash
const initialHash = window.location.hash.slice(1) || "about"
showSection(initialHash)

// Intersection Observer for scroll-based navigation highlighting
const observerOptions = {
  root: null,
  rootMargin: "-50% 0px -50% 0px",
  threshold: 0,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id")
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("data-section") === id) {
          link.classList.add("active")
        }
      })
    }
  })
}, observerOptions)

sections.forEach((section) => {
  observer.observe(section)
})

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }
  })
})
