// 1. GRAFIKON: HbA1c szint változása 

const cukor_data = {
    labels: ['A1C szint 3 hónap után (%)'],
    datasets: [
        {
            label: 'Placebo',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            data: [{
                y: 8.1,
                yMin: 8.1 - 1.2, 
                yMax: 8.1 + 1.2  
            }]
        },
        {
            label: 'Glicin',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            borderColor: 'rgba(4, 124, 14, 1)',
            borderWidth: 2,
            data: [{
                y: 7.0, 
                yMin: 7.0 - 1.1, 
                yMax: 7.0 + 1.1  
            }]
        }
    ]
};

const cukor_config = {
    type: 'barWithErrorBars',
    data: cukor_data,
    options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                display: true,
                labels: { color: 'white', font: { size: 20 } }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const v = context.raw;
                        return `${context.dataset.label}: ${v.y}% (Szignifikáns csökkenés glicin esetén)`;
                    }
                }
            }
        },
        scales: {
            x: { ticks: { color: 'white', font: { size: 18 } } },
            y: { 
                beginAtZero: false, 
                min: 5, 
                ticks: { color: 'white', font: { size: 20 } } 
            }
        }
    }
};

const ver_ctx = document.getElementById('vercukor1').getContext('2d');
new Chart(ver_ctx, cukor_config);


// 2. GRAFIKON: TNF-receptor  szintje 

const cukor_data2 = {
    labels: ['TNF-receptor szint (pg/mL)'],
    datasets: [
        {
            label: 'Placebo',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            data: [{
                y: 2480, 
                yMin: 2480 - 560,
                yMax: 2480 + 560
            }]
        },
        {
            label: 'Glicin',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            borderColor: 'rgba(4, 124, 14, 1)',
            borderWidth: 2,
            data: [{
                y: 2011,
                yMin: 2011 - 467,
                yMax: 2011 + 467
            }]
        }
    ]
};

const cukor_config2 = {
    type: 'barWithErrorBars',
    data: cukor_data2,
    options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                display: true,
                labels: { color: 'white', font: { size: 16 } }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: 'white' },
                title: { display: true, text: 'pg/mL', color: 'white' }
            },
            x: { ticks: { color: 'white' } }
        }
    }
};

const ver_ctx2 = document.getElementById('vercukor2').getContext('2d');
new Chart(ver_ctx2, cukor_config2);

// 3. GRAFIKON: Interferon-gamma

const cukor_data3 = {
    labels: ['Interferon szintek (pg/mL)'],
    datasets: [{
        label: 'Placebo',
        data: [3.1],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 3
    }, {
        label: 'Glicin',
        data: [7.3], 
        backgroundColor: 'rgba(5, 247, 5, 0.7)',
        borderColor: 'rgba(4, 124, 14, 1)',
        borderWidth: 3
    }]
};

const cukor_config3 = {
    type: 'bar',
    data: cukor_data3,
    options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                position: 'top',
                labels: { color: 'white', font: { size: 20 } }
            },
        },
        scales: {
            x: { ticks: { color: 'white', font: { size: 18 } } },
            y: { 
                beginAtZero: true, 
                ticks: { color: 'white', font: { size: 15 } },
                title: { display: true, text: 'pg/mL', color: 'white' }
            }
        }
    }
};

const ver_ctx3 = document.getElementById('vercukor3').getContext('2d');
new Chart(ver_ctx3, cukor_config3);