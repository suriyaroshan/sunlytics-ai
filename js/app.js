// Get the form
const form = document.getElementById("solarForm");

// Listen for form submission
form.addEventListener("submit", function(event) {

    // Stop page refresh
    event.preventDefault();

    // Get values from inputs
    const location = document.getElementById("location").value;
    const roofSize = document.getElementById("roofSize").value;
    const panels = document.getElementById("panels").value;
    const angle = document.getElementById("angle").value;
    const bill = document.getElementById("bill").value;
    const rate = document.getElementById("rate").value;

   const solarData = {
    location,
    roofSize,
    panels,
    angle,
    bill,
    rate
};

// Save data in Local Storage
localStorage.setItem(
    "solarData",
    JSON.stringify(solarData)
);

// Check it worked
console.log("Saved!");
console.log(solarData);

// Go to dashboard
window.location.href = "dashboard.html";

});