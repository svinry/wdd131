const reviewParams = new URLSearchParams(window.location.search);
const productNames = {
    "fc-1888": "flux capacitor",
    "fc-2050": "power laces",
    "fs-1987": "time circuits",
    "ac-2000": "low voltage reactor",
    "jj-1969": "warp equalizer"
};
const hasSubmittedReview = ["productName", "rating", "installDate"].every((name) =>
    reviewParams.has(name) && reviewParams.get(name).trim() !== ""
);
const reviewCountKey = "reviewCount";
let reviewCount = Number(localStorage.getItem(reviewCountKey)) || 0;

if (hasSubmittedReview) {
    reviewCount += 1;
    localStorage.setItem(reviewCountKey, reviewCount);

    const productName = productNames[reviewParams.get("productName")] || "product";
    const rating = Number(reviewParams.get("rating"));
    const summary = document.querySelector("#review-summary");
    summary.textContent = `Your ${productName} review was submitted with a ${rating}-star rating.`;
}

document.querySelector("#reviewCount").textContent = reviewCount;