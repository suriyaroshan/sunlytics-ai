// Get saved data from Local Storage
const savedData = localStorage.getItem("solarData");

// Convert JSON text back into a JavaScript object
const solarData = JSON.parse(savedData);

// Find the Location paragraph
const locationElement = document.getElementById("displayLocation");

// Display the user's location
locationElement.textContent = solarData.location;

document.getElementById("displayRoofSize").textContent =
solarData.roofSize + " m²";

document.getElementById("displayPanels").textContent =
solarData.panels;

document.getElementById("displayAngle").textContent =
solarData.angle + "°";

document.getElementById("displayBill").textContent =
"£" + solarData.bill;

document.getElementById("displayRate").textContent =
"£" + solarData.rate + "/kWh";

// Convert text into numbers
const panels = Number(solarData.panels);
const rate = Number(solarData.rate);

// Calculate estimated daily energy
const dailyGeneration = panels * 1.475;

// Monthly savings estimate
const monthlySavings = dailyGeneration * 30 * rate;

// Annual CO₂ reduction estimate
const co2Saved = dailyGeneration * 365 * 0.233;

document.getElementById("dailyGeneration").textContent =
dailyGeneration.toFixed(1) + " kWh";

document.getElementById("monthlySavings").textContent =
"£" + monthlySavings.toFixed(2);

document.getElementById("co2Saved").textContent =
co2Saved.toFixed(0) + " kg/year";

let health = 0;

if (solarData.angle >= 30 && solarData.angle <= 40) {

    health += 40;

}
else if (solarData.angle >= 20 && solarData.angle < 30) {

    health += 25;

}
else if (solarData.angle >= 10 && solarData.angle < 20) {

    health += 10;

}

if (panels >= 15) {

    health += 30;

}
else if (panels >= 10) {

    health += 20;

}
else if (panels >= 5) {

    health += 10;

}

if (solarData.roofSize >= 100) {

    health += 30;

}
else if (solarData.roofSize >= 75) {

    health += 20;

}
else if (solarData.roofSize >= 50) {

    health += 10;

}

document.getElementById("healthPercentage").textContent =
health + "%";       

let status = "";
if (health >= 90) {

    status = "🟢 Excellent";

}
else if (health >= 70) {

    status = "🟡 Good";

}
else {

    status = "🔴 Needs Improvement";

}

document.getElementById("healthStatus").textContent =
status;

const healthFill =
document.getElementById("healthFill");

healthFill.style.width =
health + "%";

if (health >= 90) {

    healthFill.style.background =
    "#22c55e";

}
else if (health >= 70) {

    healthFill.style.background =
    "#facc15";

}
else {

    healthFill.style.background =
    "#ef4444";

}

document.getElementById("summaryStatus").textContent =
status;

document.getElementById("summaryGeneration").textContent =
dailyGeneration.toFixed(1) + " kWh";

document.getElementById("summarySavings").textContent =
"£" + monthlySavings.toFixed(2);