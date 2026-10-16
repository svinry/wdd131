const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        contactStatus.classList.remove("is-error");
        contactStatus.textContent = `Thank you for your feedback.`;
    });
}
