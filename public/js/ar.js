const ctx = document.getElementById('ar').getContext('2d');
const isMobile = window.innerWidth < 768;

const chart = new Chart(ctx, {
    type: 'bar', 
    data: {
        labels: ['L-Theanine (100 mg)', 'Glicin (500g)','NAC (750 mg)'], 
        datasets: [{
            label: '€',
            data: [22.44, 14.99, 21.49], 
            backgroundColor: [
                'rgba(247, 5, 5, 0.7)', 
                'rgba(5, 247, 5, 0.7)', 
                'rgba(223, 247, 5, 0.7)'
            ],
            borderWidth: 1,
            
        }]
    },
    options: {
        indexAxis: isMobile ? 'y' : 'x', 
        responsive: true, 
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                    font: { size: isMobile ? 11 : 16 }
                }
            },
            y: {
                ticks: {
                    color: 'white',
                    font: { size: isMobile ? 10 : 14 }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => '€' + context.parsed[isMobile ? 'x' : 'y']
                }
            }
        }
    }
});

