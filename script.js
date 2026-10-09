
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const pages = document.querySelectorAll(".page");

document.getElementById("year").textContent = new Date().getFullYear();

function showPage(pageId, updateHistory = true) {
    const validPage = document.getElementById(pageId);

    if (!validPage || !validPage.classList.contains("page")) {
        pageId = "home";
    }

    // Hide every page and show only the selected page.
    pages.forEach((page) => {
        page.classList.toggle("active", page.id === pageId);
    });

    // Highlight the selected navigation link.
    navItems.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${pageId}`
        );
    });

    // Close the mobile navigation menu.
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";

    // Update the URL so each section can be opened directly.
    if (updateHistory && window.location.hash !== `#${pageId}`) {
        history.pushState({ page: pageId }, "", `#${pageId}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Switch pages when a navigation link is clicked.
navItems.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        showPage(link.getAttribute("href").slice(1));
    });
});

// Also make the Home page buttons switch to the requested page.
document.querySelectorAll(".buttons a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        showPage(link.getAttribute("href").slice(1));
    });
});

// Toggle mobile menu.
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Support browser Back and Forward buttons.
window.addEventListener("popstate", () => {
    showPage(window.location.hash.slice(1) || "home", false);
});

// Open the correct page if the URL already contains a section.
const initialPage = window.location.hash.slice(1) || "home";
showPage(initialPage, false);

