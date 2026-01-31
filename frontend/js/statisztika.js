window.addEventListener("DOMContentLoaded", () => {

    async function fetchAdat() {

        const response = await fetch('http://localhost:3000/statisztikak');
        const data = await response.json();
        const tarto = document.getElementById("abracont")


        const kerdesekresponse = await fetch('http://localhost:3000/statisztika/kerdesek');
        const kerdesek = await kerdesekresponse.json();


        const adatok = diagramadat(kerdesek, data)

        const felirat = Object.keys(adatok);
        var row = document.createElement("div");
        row.className = "row gx-1 my-4";




        for (let i = 0; i < felirat.length; i++) {
            if (i % 3 == 0) {
                row = document.createElement("div");
                row.className = "row gx-1";
                tarto.appendChild(row);
            }


            const col = document.createElement("div");

            col.className = "col-md-4 col-sm-12 mb-5"

            col.innerHTML += `
      <h3 class="text-center">${felirat[i]}</h3>
      <div class="d-flex justify-content-center chart-cont">
        <canvas id="${i}"></canvas>
      </div>
    `;

            row.appendChild(col);
            var nem = new Chart(document.getElementById(i), {
                type: 'pie',
                data: {
                    labels: Object.keys(adatok[felirat[i]]),

                    datasets: [{
                        data: Object.values(adatok[felirat[i]]),
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    plugins: {
                        legend: {
                            labels: {
                                color: 'white', // jelmagyarázat színe
                                font: {
                                    size: 20
                                }
                            }
                        }
                    },


                }


            });

            nem.update();

        }

    }

    function diagramadat(kerdesek, data) {
        const res = {};

        const map = {
            hallott: "Hallott-e",
            haigenhonnan: "Honnan hallott",
            nemzetiseg: "Nemzetiség",
            orszag: "Ország",
            nem: "Nem",
            lakhely: "Lakhely",
            kor: "Életkor",
            egeszsegallapot: "Egészségi állapot",
            vegzettseg: "Végzettség"
        };

        const mapKeys = Object.keys(map);

        kerdesek.forEach((k, i) => {
            const title = map[mapKeys[i]];
            res[title] = {};
            k.valaszok.forEach(option => {
                res[title][option] = 0;
            });
        });

        data.forEach(row => {
            mapKeys.forEach((field, i) => {
                const title = map[field];
                const valasz = row[field];
                if (valasz !== undefined && res[title] && res[title][valasz] !== undefined) {
                    res[title][valasz]++;
                }
            });
        });

        return res;
    }


    fetchAdat();
});