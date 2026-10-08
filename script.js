"use strict";

/* =========================================================
   MARYEM STUDIO
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   1. ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("modalClose");

const contactForm = document.getElementById("contactForm");
const whatsappLink = document.getElementById("whatsappLink");

const currentYear = document.getElementById("currentYear");

const projectButtons = document.querySelectorAll("[data-project]");


/* =========================================================
   2. MOBILE MENU
========================================================= */

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* =========================================================
   3. HEADER SCROLL EFFECT
========================================================= */

const header = document.querySelector(".header");

function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* =========================================================
   4. ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinkItems = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

function updateActiveNavigation() {
    if (!sections.length || !navLinkItems.length) return;

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            navLinkItems.forEach((link) => {
                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();


/* =========================================================
   5. SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .skill-item, .value-card, .about-content, .contact-content"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


/* =========================================================
   6. PROJECT MODAL
========================================================= */

function openProjectModal(projectName) {
    if (!projectModal) return;

    if (projectName === "luna") {
        projectModal.classList.add("active");
        document.body.classList.add("modal-open");

        projectModal.setAttribute("aria-hidden", "false");
    }
}

function closeProjectModal() {
    if (!projectModal) return;

    projectModal.classList.remove("active");
    document.body.classList.remove("modal-open");

    projectModal.setAttribute("aria-hidden", "true");
}

projectButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();

        const projectName = button.dataset.project;

        openProjectModal(projectName);
    });
});


/* =========================================================
   7. CLOSE MODAL
========================================================= */

if (projectModalClose) {
    projectModalClose.addEventListener("click", closeProjectModal);
}

if (projectModal) {
    projectModal.addEventListener("click", (event) => {
        if (
            event.target === projectModal ||
            event.target.id === "modalOverlay"
        ) {
            closeProjectModal();
        }
    });
}


/* =========================================================
   8. ESCAPE KEY
========================================================= */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeProjectModal();

        if (navLinks && menuToggle) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }
});


/* =========================================================
   9. CONTACT FORM
========================================================= */

function showFormMessage(message, type) {
    if (!contactForm) return;

    let formMessage = contactForm.querySelector(".form-message");

    if (!formMessage) {
        formMessage = document.createElement("p");
        formMessage.className = "form-message";

        contactForm.appendChild(formMessage);
    }

    formMessage.textContent = message;

    if (type === "success") {
        formMessage.style.color = "#66785f";
    } else {
        formMessage.style.color = "#a34d4d";
    }

    setTimeout(() => {
        if (formMessage) {
            formMessage.textContent = "";
        }
    }, 5000);
}


function isValidEmail(email) {
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = contactForm.querySelector(
            '[name="name"]'
        );

        const emailInput = contactForm.querySelector(
            '[name="email"]'
        );

        const projectInput = contactForm.querySelector(
            '[name="project"]'
        );

        const messageInput = contactForm.querySelector(
            '[name="message"]'
        );

        const name = nameInput
            ? nameInput.value.trim()
            : "";

        const email = emailInput
            ? emailInput.value.trim()
            : "";

        const project = projectInput
            ? projectInput.value.trim()
            : "";

        const message = messageInput
            ? messageInput.value.trim()
            : "";

        if (!name || !email || !message) {
            showFormMessage(
                "Please fill in all required fields.",
                "error"
            );

            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }

        /*
         * The form is currently frontend-only.
         * It does not send an email yet.
         */

        showFormMessage(
            "Thank you! Your message is ready to be sent.",
            "success"
        );

        contactForm.reset();
    });
}


/* =========================================================
   10. WHATSAPP
========================================================= */

if (whatsappLink) {
    whatsappLink.addEventListener("click", (event) => {
        event.preventDefault();

        const message =
            "Hello Maryem! I would like to talk about a website project.";

        const whatsappNumber = "212600000000";

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );
    });
}


/* =========================================================
   11. CURRENT YEAR
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   12. SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") {
            return;
        }

        const target = document.querySelector(href);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});





/* =========================================================
   15. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener("click", (event) => {
    if (!navLinks || !menuToggle) return;

    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedToggle =
        menuToggle.contains(event.target);

    if (
        !clickedInsideMenu &&
        !clickedToggle &&
        navLinks.classList.contains("active")
    ) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }
});


/* =========================================================
   16. RESIZE
========================================================= */

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        if (navLinks && menuToggle) {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }
});


/* =========================================================
   17. START
========================================================= */

console.log(
    "Maryem Studio JavaScript loaded successfully."
);
