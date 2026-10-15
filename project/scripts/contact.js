const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const visitorName = new FormData(contactForm).get("name").toString().trim();
        contactStatus.classList.remove("is-error");
        contactStatus.textContent = `Thank you, ${visitorName}. This student-project form has no email service connected, so your message was not sent.`;
    });
}
