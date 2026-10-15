const menuButton = document.querySelector(".menu-toggle");
const navigationPanel = document.querySelector("#navigation-panel");

if (menuButton && navigationPanel) {
    menuButton.addEventListener("click", () => {
        const menuIsOpen = menuButton.getAttribute("aria-expanded") !== "true";
        menuButton.setAttribute("aria-expanded", menuIsOpen);
        menuButton.setAttribute("aria-label", menuIsOpen ? "Close navigation menu" : "Open navigation menu");
        navigationPanel.classList.toggle("is-open", menuIsOpen);
    });

    navigationPanel.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            navigationPanel.classList.remove("is-open");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            navigationPanel.classList.remove("is-open");
            menuButton.focus();
        }
    });
}

const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified span");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    const modifiedDate = new Date(document.lastModified);
    lastModified.textContent = Number.isNaN(modifiedDate.getTime())
        ? document.lastModified
        : new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(modifiedDate);
}
