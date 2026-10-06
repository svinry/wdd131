const hamburgBtn = document.querySelector("#menu")
const navigation = document.querySelector('.navigation')

hamburgBtn.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    hamburgBtn.classList.toggle('open');
    hamburgBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    hamburgBtn.setAttribute("aria-expanded", isOpen);
})

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Bogotá Colombia",
    location: "Bogotá, Colombia",
    dedicated: "1999, April, 24-26",
    area: 53500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bogota-colombia/400x250/bogota-colombia-temple-lds-1029726-wallpaper.jpg"    
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-758797-wallpaper.jpg"
},
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24-25",
    area: 19184,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/johannesburg-south-africa/400x250/johannesburg-south-africa-temple-1021295-wallpaper.jpg"  
}
];

function displayTemple(temple) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${temple.imageUrl}" alt="${temple.templeName} temple picture" loading="lazy">
    <h2>${temple.templeName}</h2>
    <dl>
      <div><dt>LOCATION:</dt><dd>${temple.location}</dd></div>
      <div><dt>DEDICATED:</dt><dd>${temple.dedicated}</dd></div>
      <div><dt>SIZE:</dt><dd>${temple.area} sq ft</dd></div>
    </dl>
    
  `;
  document.querySelector(".content").appendChild(card);
};

temples.forEach(displayTemple);

const home = document.querySelector("#index");
const oldFilter = document.querySelector("#old");
const newFilter = document.querySelector("#new");
const smallFilter = document.querySelector("#small");
const largeFilter = document.querySelector("#large");
const contentArea = document.querySelector(".content");

home.addEventListener("click", () => {
  contentArea.innerHTML = "";
  temples.forEach(displayTemple);
  setActiveButton(home);
});

oldFilter.addEventListener("click", () => {
  const oldTemples = temples.filter((temple) => {
    const [year] = temple.dedicated.split(", ");
    return parseInt(year) < 1900;
  });
  contentArea.innerHTML = "";
  oldTemples.forEach(displayTemple);
  setActiveButton(oldFilter);
});

newFilter.addEventListener("click", () => {
  const newTemples = temples.filter((temple) => {
    const [year] = temple.dedicated.split(", ");
    return parseInt(year) >= 2000;
  });
  contentArea.innerHTML = "";
  newTemples.forEach(displayTemple);
  setActiveButton(newFilter);
});

smallFilter.addEventListener("click", () => {
  const smallTemples = temples.filter((temple) => {
    return temple.area < 10000;
  });
  contentArea.innerHTML = "";
  smallTemples.forEach(displayTemple);
  setActiveButton(smallFilter);
});

largeFilter.addEventListener("click", () => {
  const largeTemples = temples.filter((temple) => {
    return temple.area > 90000;
  });
  contentArea.innerHTML = "";
  largeTemples.forEach(displayTemple);
  setActiveButton(largeFilter);
});

function setActiveButton(button) {
  document.querySelectorAll(".navigation a").forEach((item) => {
    item.classList.remove("active");
  });
  button.classList.add("active");
}