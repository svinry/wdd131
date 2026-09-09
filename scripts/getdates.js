
const today = new Date();
const currentYear = document.querySelector("#currentYear");
const lastModified = document.getElementById("lastModified");


currentYear.textContent = today.getFullYear();
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;