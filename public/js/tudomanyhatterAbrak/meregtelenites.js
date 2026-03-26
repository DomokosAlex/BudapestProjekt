// 1. GRAFIKON – Glutation szint (RBC)

const mereg_data1 = {
    labels: ['Vörösvértest glutation (µmol/L)'],
    datasets: [
        {
            label: 'Kiindulás',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            data: [{
                y: 2.1,
                yMin: 1.6,
                yMax: 2.6
            }]
        },
        {
            label: 'GlyNAC',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            borderColor: 'rgba(4, 124, 14, 1)',
            borderWidth: 2,
            data: [{
                y: 4.1,
                yMin: 3.6,
                yMax: 4.6
            }]
        }
    ]
};

const mereg_config1 = {
    type: 'barWithErrorBars',
    data: mereg_data1,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: 'white', font: { size: 16 } } }
        },
        scales: {
            y: { ticks: { color: 'white' } },
            x: { ticks: { color: 'white' } }
        }
    }
};
const mereg_ctx1 = document.getElementById('mereg1').getContext('2d');
new Chart(mereg_ctx1, mereg_config1);

// 2. GRAFIKON – Oxidatív stressz (F2-izoprosztán)

const mereg_data2 = {
    labels: ['F2-izoprosztán (pg/mL)'],
    datasets: [
        {
            label: 'Kiindulás',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            data: [{
                y: 68,
                yMin: 68 - 18,
                yMax: 68 + 18
            }]
        },
        {
            label: 'GlyNAC',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            borderColor: 'rgba(4, 124, 14, 1)',
            borderWidth: 2,
            data: [{
                y: 15,
                yMin: 15 - 5,
                yMax: 15 + 5
            }]
        }
    ]
};

const mereg_config2 = {
    type: 'barWithErrorBars',
    data: mereg_data2,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: 'white', font: { size: 16 } } }
        },
        scales: {
            y: { beginAtZero: true, ticks: { color: 'white' } },
            x: { ticks: { color: 'white' } }
        }
    }
};
const mereg_ctx2 = document.getElementById('mereg2').getContext('2d');
new Chart(mereg_ctx2, mereg_config2);

// 3. GRAFIKON – Glicin-konjugált metabolitok kiválasztása

const mereg_data3 = {
    labels: ['Acil-glicinek kiválasztása'],
    datasets: [
        {
            label: 'Alacsony glicinszint',
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            data: [{
                y: 1.0,
                yMin: 1.0 - 0.3,
                yMax: 1.0 + 0.3
            }]
        },
        {
            label: 'Megfelelő glicinszint',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            data: [{
                y: 2.3,
                yMin: 2.3 - 0.5,
                yMax: 2.3 + 0.5
            }]
        }
    ]
};

const mereg_config3 = {
    type: 'barWithErrorBars',
    data: mereg_data3,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { labels: { color: 'white', font: { size: 16 } } }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: 'white' }
            },
            x: { ticks: { color: 'white' } }
        }
    }
};
const mereg_ctx3 = document.getElementById('mereg3').getContext('2d');
new Chart(mereg_ctx3, mereg_config3);