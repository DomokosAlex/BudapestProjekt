
const emesztes_data1 = {
    labels: ['Nyálkahártya-károsodás (%)'],
    datasets: [
        {
            label: 'Kontroll',
            backgroundColor: 'rgba(255,99,132,0.5)',
            borderColor: 'rgb(255,99,132)',
            borderWidth: 2,
            data: [{
                y: 100,
                yMin: 90,
                yMax: 110
            }]
        },
        {
            label: 'Glicin',
            backgroundColor: 'rgba(5,247,5,0.7)',
            borderColor: 'rgba(4,124,14,1)',
            borderWidth: 2,
            data: [{ y: 20, yMin: 15, yMax: 25 }]
        }
    ]
};

new Chart(document.getElementById('emesztes1'), {
    type: 'barWithErrorBars',
    data: emesztes_data1,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: 'white', font: { size: 18 } } }
        },
        scales: {
            x: { ticks: { color: 'white' } },
            y: { beginAtZero: true, ticks: { color: 'white' } }
        }
    }
});


// 2. GRAFIKON – TNF-alfa szint (relatív)
const emesztes_data2 = {
    labels: ['TNF-α szint'],
    datasets: [
        {
            label: 'Gyulladásos állapot',
            data: [100],
            backgroundColor: 'rgba(255,99,132,0.5)'
        },
        {
            label: 'Glicin kezelés',
            data: [40],
            backgroundColor: 'rgba(5,247,5,0.7)'
        }
    ]
};

new Chart(document.getElementById('emesztes2'), {
    type: 'bar',
    data: emesztes_data2,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: 'white', font: { size: 18 } } }
        },
        scales: {
            x: { ticks: { color: 'white' } },
            y: {
                beginAtZero: true,
                ticks: { color: 'white' },
                title: { display: true, text: '%', color: 'white' }
            }
        }
    }
});


// 3. GRAFIKON – Oxidatív stressz markerek
const emesztes_data3 = {
    labels: ['Oxidatív stressz'],
    datasets: [
        {
            label: 'Kontroll',
            data: [1.0],
            backgroundColor: 'rgba(255,99,132,0.5)'
        },
        {
            label: 'Glicin',
            data: [0.35],
            backgroundColor: 'rgba(5,247,5,0.7)'
        }
    ]
};

new Chart(document.getElementById('emesztes3'), {
    type: 'bar',
    data: emesztes_data3,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: 'white', font: { size: 18 } } }
        },
        scales: {
            x: { ticks: { color: 'white' } },
            y: { beginAtZero: true, ticks: { color: 'white' } }
        }
    }
});
