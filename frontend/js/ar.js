const ctx = document.getElementById('ar').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar', 
    data: {
        labels: ['L-Theanine (100 mg, 60 kapszula)', 'Glicin (500g por)','N-Acetylcysteine (NAC) (750 mg, 120 kapszula)'], 
        datasets: [{
          label: '%',
            data: [22.44, 14.99, 21.49, ], 
            backgroundColor: [
                'rgba(247, 5, 5, 0.7)', 'rgba(5, 247, 5, 0.7)', 'rgba(223, 247, 5, 0.7)'
            ],
            borderWidth: 1,
            barThickness: 150
        }]
    },
    options: {
        responsive: true, 
        maintainAspectRatio: false,

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
        },
        plugins: {

          legend: {
    display: false 
  },
      tooltip: {
        callbacks: {
          label: function(context) {
            return '€' + context.parsed.y; 
          }
        }
      }
    }
    }
});

chart.update();
