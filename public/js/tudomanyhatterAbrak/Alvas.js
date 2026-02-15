//Ábráknak, az adatok statikusan beégetve

// ALVAS 1

const data = {
    labels: ['Elalvási Latencia'],
    datasets: [
        {
            label: 'Glicin nélkül',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            data: [{
                y: 21.3,
                yMin: 21.3 - 12.0, // 9.3
                yMax: 21.3 + 12.0  // 33.3
            }]
        },
        {
            label: 'Glicinnel',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            borderColor: 'rgba(4, 124, 14, 1)',
            borderWidth: 2,
            data: [{
                y: 14.1,
                yMin: 14.1 - 6.6, // 7.5
                yMax: 14.1 + 6.6  // 20.7
            }]
        }
    ]
};

const config = {
    type: 'barWithErrorBars',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                display: true,
                labels: { color: 'white', font: { size: 16 } }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const v = context.raw;
                        return `${context.dataset.label}: ${v.y} (±${(v.yMax - v.y).toFixed(1)} Szórás)`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: 'white' },
                title: { display: true, text: 'Perc', color: 'white' }
            },
            x: {
                ticks: { color: 'white' }
            }
        }
    }
};


const ctx = document.getElementById('alvasabra').getContext('2d');
new Chart(ctx, config);


//////////////////////////////

//ALVAS 2

const data2 = {
    labels: ['SWS Latencia (Idő a mélyalvás eléréséig, percben)'],

    datasets: [
        {
            label: 'Glicin nélkül',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            data: [{
                y: 43.1,
                yMin: 43.1 - 20.3,
                yMax: 43.1 + 20.3
            }]
        },
        {
            label: 'Glicinnel',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            borderColor: 'rgba(4, 124, 14, 1)',
            borderWidth: 2,
            data: [{
                y: 36.6,
                yMin: 36.6 - 18.2,
                yMax: 36.6 + 18.2
            }]
        }
    ]


};


const config2 = {
    type: 'barWithErrorBars',
    data: data2,
    options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                display: true,
                labels: { color: 'white', font: { size: 16 } }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const v = context.raw;
                        return `${context.dataset.label}: ${v.y} (±${(v.yMax - v.y).toFixed(1)} Szórás)`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: 'white' },
                title: { display: true, text: 'Perc', color: 'white' }
            },
            x: {
                ticks: { color: 'white' }
            }
        }
    }
};



const ctx2 = document.getElementById('alvasabra2').getContext('2d');
new Chart(ctx2, config2);

//////////////////////////////



//ALVAS 3

const data3 = {
    labels: ['Alvási Hatékonyság (Százalékban)'],
    datasets: [{
        label: 'Glicin nélkül',
        data: [83.1],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 3
    }, {
        label: 'Glicinnel',
        data: [89.3],
        backgroundColor: 'rgba(5, 247, 5, 0.7)',
        borderColor: 'rgba(4, 124, 14, 1)',
        borderWidth: 3
    }]
};

const config3 = {
    type: 'bar',
    data: data3,
    options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white',
                    font: { size: 20 }
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white',
                    font: {
                        size: 18
                    }
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                    font: {
                        size: 15
                    }
                }
            }
        }
    }
};


    const ctx3 = document.getElementById('alvasabra3').getContext('2d');
    new Chart(ctx3, config3);


