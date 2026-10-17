const activities = [
    {
        id: "rainforest-walk",
        name: "Rainforest & falls viewpoints",
        category: "tour",
        categoryName: "Tours & river",
        image: { src: "victoria-falls-lg.webp", alt: "Victoria Falls gorge", width: 640, height: 960 },
        description: "Walk the established viewpoints near the waterfall and experience its spray, rainforest, and changing views."
    },
    {
        id: "zambezi-cruise",
        name: "Zambezi sunset cruise",
        category: "tour",
        categoryName: "Tours & river",
        image: { src: "zambezi-river-cruise.jpg", alt: "Zambezi River cruise boat", width: 750, height: 450 },
        description: "Spend time on the river and watch the light change over the Zambezi."
    },
    {
        id: "helicopter-flight",
        name: "Scenic flight over the falls",
        category: "tour",
        categoryName: "Tours & river",
        image: { src: "victoria-falls-arial2.webp", alt: "Victoria Falls Helicopter", width: 925, height: 615 },
        description: "A scenic flight can reveal the waterfall's broad curtain, islands, and deep gorges from above."
    },
    {
        id: "white-water-rafting",
        name: "White-water rafting",
        category: "adventure",
        categoryName: "Adventure",
        image: { src: "victoria-falls-rafting.webp", alt: "White water raft on the Zambezi River", width: 474, height: 266 },
        description: "Guided rafting on the Zambezi is an adventurous way to experience the river below the falls. It is a demanding activity and is not suitable for everyone."
    },
    {
        id: "canopy-adventure",
        name: "Gorge & canopy adventures",
        category: "adventure",
        categoryName: "Adventure",
        image: { src: "victoria-falls-bungee.jpg", alt: "Victoria Falls bungee jumping", width: 1920, height: 870 },
        description: "Canopy routes, zip lines, and gorge activities offer elevated views and a more active way to explore the landscape around the falls."
    },
    {
        id: "game-drive",
        name: "Wildlife game drive",
        category: "safari",
        categoryName: "Wildlife",
        image: { src: "victoria-falls-safari.webp", alt: "Visitors observing elephants on safari", width: 474, height: 316 },
        description: "A guided drive in the surrounding protected areas offers a chance to learn about local habitats and wildlife."
    },
    {
        id: "bridge-heritage",
        name: "Victoria Falls Bridge & heritage",
        category: "culture",
        categoryName: "Culture & heritage",
        image: { src: "victoria-falls-railway.jpg", alt: "Historic railway carriage", width: 786, height: 446 },
        description: "Learn about the historic bridge, its engineering, and its place in regional travel."
    },
    {
        id: "local-crafts",
        name: "Local crafts & makers",
        category: "culture",
        categoryName: "Culture & heritage",
        image: { src: "victoria-falls-crafts.webp", alt: "Handmade crafts at a local market", width: 474, height: 316 },
        description: "Browse locally made art and crafts, and take time to learn about the people and techniques behind the work."
    },
    {
        id: "community-culture",
        name: "Community-led cultural experience",
        category: "culture",
        categoryName: "Culture & heritage",
        image: { src: "victoria-falls-culture.webp", alt: "Performers sharing a local cultural dance", width: 474, height: 308 },
        description: "Choose experiences led by local hosts to hear stories, learn about traditions, and support community-run tourism on the host community's terms."
    }
];

const reviewStorageKey = "vicFallsActivityReviews";
const activityList = document.querySelector("#activity-list");
const activityCount = document.querySelector("#activity-count");
const reviewForm = document.querySelector("#review-form");
const reviewActivity = document.querySelector("#review-activity");
const reviewStatus = document.querySelector("#review-status");
const reviewList = document.querySelector("#review-list");
const reviewEmpty = document.querySelector("#review-empty");
let activeFilter = "all";

function getReviews() {
    const savedReviews = JSON.parse(localStorage.getItem(reviewStorageKey) || "[]");
    return Array.isArray(savedReviews) ? savedReviews : [];
}

function getActivityReviews(activityId, reviews) {
    return reviews.filter((review) => review.activityId === activityId);
}

function getRatingSummary(activityId, reviews) {
    const matchingReviews = getActivityReviews(activityId, reviews);
    const ratingTotal = matchingReviews.reduce((total, review) => total + Number(review.rating), 0);
    const average = matchingReviews.length ? ratingTotal / matchingReviews.length : 0;
    return { count: matchingReviews.length, average };
}

function createActivityCard(activity, reviews) {
    const card = document.createElement("article");
    card.className = "activity-card";

    const artwork = document.createElement("div");
    artwork.className = `activity-art category-${activity.category}`;
    const image = document.createElement("img");
    image.src = `images/${activity.image.src}`;
    image.alt = activity.image.alt;
    image.width = activity.image.width;
    image.height = activity.image.height;
    image.loading = "lazy";
    image.decoding = "async";
    artwork.append(image);

    const content = document.createElement("div");
    content.className = "activity-card-body";

    const category = document.createElement("p");
    category.className = "activity-category";
    category.textContent = activity.categoryName;

    const title = document.createElement("h3");
    title.textContent = activity.name;

    const description = document.createElement("p");
    description.textContent = activity.description;

    const summary = getRatingSummary(activity.id, reviews);
    const rating = document.createElement("p");
    rating.className = "activity-rating";

    const stars = document.createElement("span");
    stars.className = "stars";
    stars.setAttribute("aria-label", summary.count ? `Average ${summary.average.toFixed(1)} out of 5` : "No ratings yet");
    stars.textContent = summary.count ? `${"★".repeat(Math.round(summary.average))}${"☆".repeat(5 - Math.round(summary.average))}` : "☆☆☆☆☆";

    const ratingText = document.createElement("span");
    ratingText.textContent = summary.count
        ? `${summary.average.toFixed(1)} / 5 · ${summary.count} ${summary.count === 1 ? "review" : "reviews"}`
        : "No ratings yet";

    const reviewLink = document.createElement("a");
    reviewLink.className = "review-jump";
    reviewLink.href = `#share-review`;
    reviewLink.textContent = "Rate this activity";
    reviewLink.addEventListener("click", () => {
        reviewActivity.value = activity.id;
    });

    rating.append(stars, ratingText);
    content.append(category, title, description, rating, reviewLink);
    card.append(artwork, content);
    return card;
}

function renderActivities() {
    if (!activityList) {
        return;
    }

    const reviews = getReviews();
    const visibleActivities = activeFilter === "all"
        ? activities
        : activities.filter((activity) => activity.category === activeFilter);

    activityList.replaceChildren(...visibleActivities.map((activity) => createActivityCard(activity, reviews)));
    activityCount.textContent = `${visibleActivities.length} ${visibleActivities.length === 1 ? "idea" : "ideas"}`;
}

function populateActivityOptions() {
    if (!reviewActivity) {
        return;
    }

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Choose an activity";
    placeholder.disabled = true;
    placeholder.selected = true;
    reviewActivity.append(placeholder, ...activities.map((activity) => {
        const option = document.createElement("option");
        option.value = activity.id;
        option.textContent = activity.name;
        return option;
    }));
}

function renderReviews() {
    if (!reviewList) {
        return;
    }

    const recentReviews = getReviews().slice().reverse();
    reviewEmpty.hidden = recentReviews.length > 0;
    reviewList.replaceChildren(...recentReviews.map((review) => {
        const activity = activities.find((item) => item.id === review.activityId);
        const card = document.createElement("article");
        card.className = "review-card";

        const heading = document.createElement("h4");
        heading.textContent = activity ? activity.name : "Activity review";

        const meta = document.createElement("p");
        meta.className = "review-card-meta";
        meta.textContent = `${review.name} · ${"★".repeat(Number(review.rating))}${"☆".repeat(5 - Number(review.rating))} · ${review.date}`;

        const comment = document.createElement("p");
        comment.textContent = review.comment;

        card.append(heading, meta, comment);
        return card;
    }));
}

function setActiveFilter(filterButton) {
    document.querySelectorAll(".filter-button").forEach((button) => {
        const isSelected = button === filterButton;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", isSelected);
    });
    activeFilter = filterButton.dataset.filter;
    renderActivities();
}

document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => setActiveFilter(button));
});

if (reviewForm) {
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault();
        reviewStatus.classList.remove("is-error");
        reviewStatus.textContent = "";

        const formData = new FormData(reviewForm);
        const review = {
            activityId: formData.get("activity"),
            name: String(formData.get("name")).trim(),
            rating: Number(formData.get("rating")),
            comment: String(formData.get("comment")).trim(),
            date: new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date())
        };

        if (!activities.some((activity) => activity.id === review.activityId) || !review.name || !review.comment || review.rating < 1 || review.rating > 5) {
            reviewStatus.classList.add("is-error");
            reviewStatus.textContent = "Please complete each field and choose a rating from 1 to 5.";
            return;
        }

        const savedReviews = getReviews();
        savedReviews.push(review);
        localStorage.setItem(reviewStorageKey, JSON.stringify(savedReviews));
        reviewForm.reset();
        reviewStatus.textContent = "Your review has been saved in this browser.";
        renderActivities();
        renderReviews();
    });
}

populateActivityOptions();
renderActivities();
renderReviews();
