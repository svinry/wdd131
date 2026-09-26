const temperatureCelsius = 29;
const windSpeedKmh = 10;

function calculateWindChill(temperature, windSpeed) {
	return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
}

document.querySelector("#temperature").textContent = `${temperatureCelsius} °C`;
document.querySelector("#wind-speed").textContent = `${windSpeedKmh} km/h`;

const windChillDisplay = document.querySelector("#wind-chill");
if (temperatureCelsius <= 10 && windSpeedKmh > 4.8) {
	windChillDisplay.textContent = `${calculateWindChill(temperatureCelsius, windSpeedKmh).toFixed(1)} °C`;
} else {
	windChillDisplay.textContent = "N/A";
}

document.querySelector("#currentYear").textContent = new Date().getFullYear();

const lastModified = new Date(document.lastModified);
const lastModifiedDisplay = document.querySelector("#lastModified");
lastModifiedDisplay.dateTime = lastModified.toISOString();
lastModifiedDisplay.textContent = lastModified.toLocaleString("en-ZW", {
	dateStyle: "medium",
	timeStyle: "short"
});
