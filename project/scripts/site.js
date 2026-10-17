const menuButton = document.querySelector(".menu-toggle");
const navigationPanel = document.querySelector("#navigation-panel");

if (menuButton && navigationPanel) {
    menuButton.addEventListener("click", () => {
        const menuIsOpen = menuButton.classList.toggle("is-open");
        menuButton.setAttribute("aria-label", menuIsOpen ? "Close navigation menu" : "Open navigation menu");
        navigationPanel.classList.toggle("is-open");
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
