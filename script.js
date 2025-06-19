// Timer functionality
function updateTimer() {
  const timerElement = document.getElementById("timer")
  const hoursElement = document.getElementById("hours")
  const minutesElement = document.getElementById("minutes")
  const secondsElement = document.getElementById("seconds")

  let hours = Number.parseInt(hoursElement.textContent)
  let minutes = Number.parseInt(minutesElement.textContent)
  let seconds = Number.parseInt(secondsElement.textContent)

  // Decrease seconds
  seconds--

  if (seconds < 0) {
    seconds = 59
    minutes--

    if (minutes < 0) {
      minutes = 59
      hours--

      if (hours < 0) {
        // Timer ended
        hours = 0
        minutes = 0
        seconds = 0
      }
    }
  }

  // Update display
  hoursElement.textContent = hours.toString().padStart(2, "0")
  minutesElement.textContent = minutes.toString().padStart(2, "0")
  secondsElement.textContent = seconds.toString().padStart(2, "0")
}

// Update timer every second
setInterval(updateTimer, 1000)

// Smooth scroll to program section
function scrollToProgram() {
  document.getElementById("program").scrollIntoView({
    behavior: "smooth",
  })
}

// Add click tracking for CTA buttons
document.addEventListener("DOMContentLoaded", () => {
  const ctaButtons = document.querySelectorAll(".cta-button")

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add click animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)

      // Here you would typically integrate with payment system
      console.log("CTA button clicked - integrate with payment system")
    })
  })

  // Add entrance animations
  const sections = document.querySelectorAll("section")
  sections.forEach((section, index) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease"

    setTimeout(() => {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }, index * 200)
  })

  // Testimonials Slider
  const sliderTrack = document.querySelector(".slider-track")
  const slides = document.querySelectorAll(".slide")
  const dotsContainer = document.querySelector(".slider-dots")
  const dots = document.querySelectorAll(".dot")
  const prevButton = document.querySelector(".slider-arrow.prev")
  const nextButton = document.querySelector(".slider-arrow.next")

  let currentIndex = 0
  const slideCount = slides.length

  // Initialize slider
  updateSlider()

  // Event listeners for controls
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount
    updateSlider()
  })

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slideCount
    updateSlider()
  })

  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index
      updateSlider()
    })
  })

  // Auto-advance slider every 5 seconds
  let autoplayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slideCount
    updateSlider()
  }, 5000)

  // Pause autoplay on hover
  const sliderContainer = document.querySelector(".slider-container")
  sliderContainer.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval)
  })

  sliderContainer.addEventListener("mouseleave", () => {
    autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slideCount
      updateSlider()
    }, 5000)
  })

  // Touch support for mobile
  let touchStartX = 0
  let touchEndX = 0

  sliderContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
  })

  sliderContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  })

  function handleSwipe() {
    const swipeThreshold = 50
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left - next slide
      currentIndex = (currentIndex + 1) % slideCount
      updateSlider()
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right - previous slide
      currentIndex = (currentIndex - 1 + slideCount) % slideCount
      updateSlider()
    }
  }

  function updateSlider() {
    // Update slide position
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`

    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex)
    })
  }
})

// Add scroll animations
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Enhanced scroll animations with stagger effect
function handleScrollAnimations() {
  const animatedElements = document.querySelectorAll(".day-card, .audience-card, .benefit-item, .faq-item")

  animatedElements.forEach((el, index) => {
    if (isElementInViewport(el)) {
      setTimeout(() => {
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
      }, index * 100) // Stagger animation
    }
  })
}

// Initialize scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".day-card, .audience-card, .benefit-item")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  handleScrollAnimations()
})

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".hero::before, .hero::after")

  parallaxElements.forEach((el) => {
    const speed = 0.5
    el.style.transform = `translateY(${scrolled * speed}px)`
  })

  handleScrollAnimations()
})

// FAQ Toggle functionality
function toggleFaq(button) {
  const faqItem = button.parentElement
  const isActive = faqItem.classList.contains("active")

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active")
  }
}

// Close FAQ when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest(".faq-item")) {
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active")
    })
  }
})
