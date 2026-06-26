// =======================================================
// 1. TYPING EFFECT (TEXT ROTATION)
// =======================================================

const texts = [
    "Machine Learning Engineer",
    "Software Engineer",
    "Full Stack Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingText = document.getElementById("typing-text");

/**
 * Typing animation with delete effect
 */
function typeEffect() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex--);
    } else {
        typingText.textContent = currentText.substring(0, charIndex++);
    }

    let speed = isDeleting ? 50 : 100;

    // Pause after full text is typed
    if (!isDeleting && charIndex === currentText.length + 1) {
        speed = 1500;
        isDeleting = true;
    }

    // Move to next text after deleting
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(typeEffect, speed);
}

// Start typing effect
typeEffect();


// =======================================================
// 2. HERO TITLE ROTATION WITH ANIMATION
// =======================================================

const titles = [
    "Rasel Mahmud.",
    "Machine Learning Engineer.",
    "Software Engineer.",
    "Full Stack Developer."
];

const titleElement = document.getElementById("title");
let titleIndex = 0;

/**
 * Change hero title with fade + drop animation
 */
function changeTitle() {
    // Fade out effect
    titleElement.classList.add("opacity-0", "translate-y-4");
    titleElement.classList.remove("animate-drop");

    setTimeout(() => {
        // Update text
        titleIndex = (titleIndex + 1) % titles.length;
        titleElement.textContent = titles[titleIndex];

        // Reset animation state
        titleElement.classList.remove("opacity-0", "translate-y-4");

        // Restart animation
        void titleElement.offsetWidth;
        titleElement.classList.add("animate-drop");
    }, 400);
}

/**
 * Initialize title animation
 */
function initTitleAnimation() {
    titleElement.classList.add("animate-drop");
    setInterval(changeTitle, 3000);
}

initTitleAnimation();


// =======================================================
// 3. MOBILE SIDEBAR MENU CONTROLS
// =======================================================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("mobileSidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

/**
 * Open mobile sidebar
 */
function openMenu() {
    sidebar.classList.remove("-translate-x-full");
    overlay.classList.remove("hidden");
}

/**
 * Close mobile sidebar
 */
function closeMenu() {
    sidebar.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
}

/**
 * Initialize menu events
 */
function initMobileMenu() {
    if (menuBtn) menuBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);
}

// Initialize menu
initMobileMenu();

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Active button style
            filterButtons.forEach(btn => {
                btn.classList.remove("bg-[#2e8622]", "text-white");
                btn.classList.add("text-[#9ca3af]");
            });

            button.classList.add("bg-[#2e8622]", "text-white");
            button.classList.remove("text-[#9ca3af]");

            const filter = button.dataset.filter;

            projects.forEach(project => {

                if (
                    filter === "all" ||
                    project.classList.contains(filter)
                ) {

                    // show card
                    project.classList.remove("hidden");

                    setTimeout(() => {
                        project.classList.remove(
                            "opacity-0",
                            "scale-95",
                            "-translate-y-4"
                        );

                        project.classList.add(
                            "opacity-100",
                            "scale-100",
                            "translate-y-0"
                        );
                    }, 50);

                } else {

                    // hide animation
                    project.classList.remove(
                        "opacity-100",
                        "scale-100",
                        "translate-y-0"
                    );

                    project.classList.add(
                        "opacity-0",
                        "scale-95",
                        "-translate-y-4"
                    );

                    setTimeout(() => {
                        project.classList.add("hidden");
                    }, 500);

                }

            });

        });

    });

});
//===============================
const slider = document.getElementById("slider");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;
let isDragging = false;
let startX = 0;

function slideTo(index){

    const isMobile = window.innerWidth <= 768;

    const move = isMobile
        ? index * 100
        : index * 50;

    slider.style.transform = `translateX(-${move}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");

    currentIndex = index;
}

// CLICK DOTS
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        slideTo(index);
    });
});

// =====================
// MOUSE DRAG (DESKTOP)
// =====================
slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    slider.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const diff = e.clientX - startX;

    if (diff > 80) {
        slideTo(Math.max(0, currentIndex - 1));
        isDragging = false;
    }

    if (diff < -80) {
        slideTo(Math.min(dots.length - 1, currentIndex + 1));
        isDragging = false;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    slider.style.cursor = "grab";
});

// =====================
// TOUCH SWIPE (MOBILE)
// =====================
let touchStartX = 0;

slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;

    if (diff > 50) {
        slideTo(Math.max(0, currentIndex - 1));
    }

    if (diff < -50) {
        slideTo(Math.min(dots.length - 1, currentIndex + 1));
    }
});

// =====================
// RESIZE FIX
// =====================
window.addEventListener("resize", () => {
    slideTo(currentIndex);
});

// INIT
slideTo(0);
//===========================

new Swiper(".testimonialSwiper",{

    loop:true,
    centeredSlides:true,
    spaceBetween:30,

    slidesPerView:1.15,

    pagination:{
        el:".swiper-pagination",
        clickable:true
    },

    breakpoints:{
        768:{
            slidesPerView:1.6
        },

        1024:{
            slidesPerView:2.2
        },

        1400:{
            slidesPerView:2.6
        }
    }

});
