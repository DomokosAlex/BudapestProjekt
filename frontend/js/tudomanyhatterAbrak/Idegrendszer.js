const dataIdegrend = {
    labels: ['Szófelidézési teszt'],
    datasets: [
        {
            label: 'Glicin nélkül',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            data: [{
                y: 12.1,
                yMin: 12.1 - 2.8, 
                yMax: 12.1 + 2.8  
            }]
        },
        {
            label: 'Glicinnel',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            borderColor: 'rgba(4, 124, 14, 1)',
            borderWidth: 2,
            data: [{
                y: 15.4,
                yMin: 15.4 - 2.5,
                yMax: 15.4 + 2.5
            }]
        }
    ]
};

const configIdegrend = {
    type: 'barWithErrorBars',
    data: dataIdegrend,
    options: {
        responsive: true,

        maintainAspectRatio: false, 
        resizeDelay: 0,


        plugins: {
            legend: {
                display: true,
                labels: { color: 'white', font: { size: 20 } }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const v = context.raw;
                        return `${context.dataset.label}: ${v.y} pont (±${(v.yMax - v.y).toFixed(1)} Szórás)`;
                    }
                }
            }
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
                        size: 20
                    }
                }
            }
        }
    }
};

const ctxIdeg = document.getElementById('idegrendabra').getContext('2d');
const myChart = new Chart(ctxIdeg, configIdegrend);

///idegrendszer2

const dataIdegrend2 = {
    labels: ['Negatív tünetek'],
    datasets: [
        {
            label: 'Kiindulási érték',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            data: [{
                y: 11.8,
                yMin: 11.8 - 6.5, 
                yMax: 11.8 + 6.5  
            }]
        },
        {
            label: '6. hét (Glicin után)',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            borderColor: 'rgba(4, 124, 14, 1)',
            borderWidth: 2,
            data: [{
                y: 8.4,
                yMin: 8.4 - 5.5,
                yMax: 8.4 + 5.5
            }]
        }
    ]
};

const configIdegrend2 = {
    type: 'barWithErrorBars',
    data: dataIdegrend2,
    options: {
        responsive: true,

        maintainAspectRatio: false, 
        resizeDelay: 0,


        plugins: {
            legend: {
                display: true,
                labels: { color: 'white', font: { size: 20 } }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const v = context.raw;
                        return `${context.dataset.label}: ${v.y} pont (±${(v.yMax - v.y).toFixed(1)} Szórás)`;
                    }
                }
            }
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
                        size: 20
                    }
                }
            }
        }
    }
};

const ctxIdeg2 = document.getElementById('idegrendabra2').getContext('2d');
const myChart2 = new Chart(ctxIdeg2, configIdegrend2);



/////////////idegrendabra3

const dataIdegrend3 = {
    labels: ['Kognitív tünetek'],
    datasets: [
        {
            label: 'Kiindulási érték',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            data: [{
                y: 10.9,
                yMin: 10.9 - 2.9, 
                yMax: 10.9 + 2.9  
            }]
        },
        {
            label: '6. hét (Glicin után)',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            borderColor: 'rgba(4, 124, 14, 1)',
            borderWidth: 2,
            data: [{
                y: 9.6,
                yMin: 9.6 - 2.1,
                yMax: 9.6 + 2.1
            }]
        }
    ]
};

const configIdegrend3 = {
    type: 'barWithErrorBars',
    data: dataIdegrend3,
    options: {
        responsive: true,

        maintainAspectRatio: false, 
        resizeDelay: 0,


        plugins: {
            legend: {
                display: true,
                labels: { color: 'white', font: { size: 20 } }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const v = context.raw;
                        return `${context.dataset.label}: ${v.y} pont (±${(v.yMax - v.y).toFixed(1)} Szórás)`;
                    }
                }
            }
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
                        size: 20
                    }
                }
            }
        }
    }
};

const ctxIdeg3= document.getElementById('idegrendabra3').getContext('2d');
const myChart3 = new Chart(ctxIdeg3, configIdegrend3);



///////idegrendabra4



const dataIdegrend4 = {
    labels: ['Pozitív tünetek'],
    datasets: [
        {
            label: 'Kiindulási érték',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            data: [{
                y: 8.4,
                yMin: 8.4 - 5.2, 
                yMax: 8.4 + 5.2  
            }]
        },
        {
            label: '6. hét (Glicin után)',
            backgroundColor: 'rgba(5, 247, 5, 0.7)',
            borderColor: 'rgba(4, 124, 14, 1)',
            borderWidth: 2,
            data: [{
                y: 7.4,
                yMin: 7.4 - 4.6,
                yMax: 7.4 + 4.6
            }]
        }
    ]
};

const configIdegrend4 = {
    type: 'barWithErrorBars',
    data: dataIdegrend4,
    options: {
        responsive: true,

        maintainAspectRatio: false, 
        resizeDelay: 0,


        plugins: {
            legend: {
                display: true,
                labels: { color: 'white', font: { size: 20 } }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const v = context.raw;
                        return `${context.dataset.label}: ${v.y} pont (±${(v.yMax - v.y).toFixed(1)} Szórás)`;
                    }
                }
            }
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
                        size: 20
                    }
                }
            }
        }
    }
};

const ctxIdeg4 = document.getElementById('idegrendabra4').getContext('2d');
const myChart4 = new Chart(ctxIdeg4, configIdegrend4);



