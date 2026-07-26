const solarData = JSON.parse(localStorage.getItem("solarData"));
const monthlyGeneration = [

    solarData.panels * 20,
    solarData.panels * 22,
    solarData.panels * 25,
    solarData.panels * 28,
    solarData.panels * 30,
    solarData.panels * 32,
    solarData.panels * 31

];

const ctx = document.getElementById("generationChart");

new Chart(ctx, {

    type: "line",

    data: {

        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul"
        ],

        datasets: [{

            label: "Solar Generation (kWh)",

           data: monthlyGeneration,

            borderWidth: 3,

            tension: 0.4

        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                display: true

            }

        }

    }

});

const savingsCtx = document.getElementById("savingsChart");

new Chart(savingsCtx, {

    type: "bar",

    data: {

        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul"],

        datasets: [{

            label: "Savings (£)",

            data: monthlyGeneration.map(value => value * 0.25)

        }]

    },

    options: {

        responsive:true

    }

});

const co2Ctx = document.getElementById("co2Chart");

new Chart(co2Ctx, {

    type: "doughnut",

    data: {

        labels: [

            "CO₂ Saved",
            "Remaining"

        ],

        datasets: [{

            data: [

                monthlyGeneration.reduce((total, value) => total + value, 0) * 0.233,
                1000

            ]

        }]

    },

    options: {

        responsive: true

    }

});

const totalGeneration = monthlyGeneration.reduce((total, value) => total + value, 0);

const totalSavings = totalGeneration * 0.25;

const totalCO2 = totalGeneration * 0.233;

document.getElementById("totalGeneration").textContent =
totalGeneration.toFixed(1) + " kWh";

document.getElementById("totalSavings").textContent =
"£" + totalSavings.toFixed(2);

document.getElementById("totalCO2").textContent =
totalCO2.toFixed(1) + " kg";

let insights = "";

// Health
if (solarData.angle >= 30 && solarData.angle <= 40) {

    insights += '<p class="ai-good">🟢 Your roof angle is ideal.</p>';

} else {

    insights += '<p class="ai-warning">🟡 Your roof angle could be improved for better efficiency.</p>';

}

// Panels
if (solarData.panels >= 15) {

    insights += '<p class="ai-good">⚡ Your system has excellent panel capacity.</p>';

} else {

    insights += '<p class="ai-warning">➕ Adding more panels could increase your annual generation.</p>';

}

// Savings
insights += `<p class="ai-info">💷 Estimated annual savings: <strong>£${(totalSavings * 12).toFixed(2)}</strong></p>`;

// Best month
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul"];

const bestMonth = months[
    monthlyGeneration.indexOf(Math.max(...monthlyGeneration))
];

insights += `<p class="ai-info">📈 Highest expected production: <strong>${bestMonth}</strong></p>`;

document.getElementById("aiInsights").innerHTML = insights;