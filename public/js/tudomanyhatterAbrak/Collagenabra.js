
const ctxcollagen = document.getElementById('Collagenabra').getContext('2d');


const collagenOptions = {
    type: 'bar',
    data: {
        labels: ['Napi glicin mérleg (70kg felnőtt)'],
        datasets: [
            {
                label: 'Saját szintézis + Étrend',
                data: [4.5],
                backgroundColor: '#2ecc71', 
                borderWidth: 1,
                barThickness: 120
            },
            {
                label: 'Metabolikus hiány (Glicin-rés)',
                data: [10.5],
                backgroundColor: '#e74c3c', 
                borderWidth: 1,
                barThickness: 120
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'A kollagénszintézis szűk keresztmetszete',
                color: '#ffffff',
                font: { size: 18 }
            },
            legend: {
                position: 'bottom',
                labels: { color: '#ffffff' }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.raw + ' g';
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true, 
                ticks: { color: '#ffffff' }
            },
            y: {
                stacked: true, 
                beginAtZero: true,
                max: 16, 
                title: {
                    display: true,
                    text: 'Gramm / nap',
                    color: '#ffffff'
                },
                ticks: { color: '#ffffff' }
            }
        }
    }
};


const Collagenchart = new Chart(ctxcollagen, collagenOptions);




const collagen2 = document.getElementById('Collagenabra2').getContext('2d');

const collagegen2config = new Chart(collagen2, {
    type: 'line',
    data: {
        labels: ['0.25 (Kontroll)', '0.5', '1.0', '1.5', '3.0', '7.0'],
        datasets: [{
            label: 'Kollagénszint a kontroll %-ában',
            data: [100, 140, 165, 225, 245, 270], // A megadott tartományok középértékei
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            fill: true,
            tension: 0.3, // Lágyítja a vonalat a professzionális hatásért
            pointRadius: 6,
            pointBackgroundColor: '#ffffff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'A glicinkoncentráció hatása a kollagénszintézisre (15 nap után)',
                color: '#ffffff',
                font: { size: 16 }
            },
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let val = context.raw;
                        let increase = val - 100;
                        return `Kollagénszint: ${val}% (+${increase}% növekedés)`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                min: 80,
                max: 300,
                title: {
                    display: true,
                    text: 'Kollagéntermelés (%)',
                    color: '#ffffff'
                },
                ticks: { color: '#ffffff' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
                title: {
                    display: true,
                    text: 'Glicin koncentráció (mM)',
                    color: '#ffffff'
                },
                ticks: { color: '#ffffff' },
                grid: { display: false }
            }
        }
    }
});