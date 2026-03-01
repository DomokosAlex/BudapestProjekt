window.addEventListener("DOMContentLoaded", () => {

    async function fetchAdat() {

        const response = await fetch('/api/statisztika');
        const data = await response.json();
        const tarto = document.getElementById("abracont")


        const kerdesekresponse = await fetch('/api/statisztika/kerdesek');
        const kerdesek = await kerdesekresponse.json();


        const adatok = diagramadat(kerdesek, data)

        const felirat = Object.keys(adatok);
        var row = document.createElement("div");
        row.className = "row gx-1 my-4";

        const colors = [
            "#d85050",
            "#f28e2b",
            "#57bd54",
            "#45ddd0",
            "#b31583",
            "#411aee"
        ];


        for (let i = 0; i < felirat.length; i++) {

            if (i % 3 === 0) {
                var tartorow = document.createElement("div");
                tartorow.className = "row gx-1 mb-1";

            }

            const tartonbeluldiv = document.createElement("div");
            tartonbeluldiv.className = "col-md-4 col-sm-12";

            var titlefelirat = document.createElement("h2");
            titlefelirat.className = "text-center d-flex justify-content-center align-items-center";
            titlefelirat.innerHTML = `${felirat[i]}`;
            tartonbeluldiv.appendChild(titlefelirat);

            var chartCol = document.createElement("div");
            chartCol.innerHTML = `<canvas id="${i}"></canvas>`;
            tartonbeluldiv.appendChild(chartCol);
            tartorow.appendChild(tartonbeluldiv);

            var legendtarto = document.createElement("div");
            legendtarto.className = "d-flex justify-content-center";

            var legend = document.createElement("ul");
            legend.className = "fs-4";


            Object.keys(adatok[felirat[i]]).forEach((e, i) => {
                var legendlabel = document.createElement("li");
                var legendszovegtarto = document.createElement("p");
                var kockaszin = document.createElement("span");

                kockaszin.style.display = "inline-block";
                kockaszin.style.width = "15px";
                kockaszin.style.height = "15px";
                kockaszin.style.marginRight = "8px";
                kockaszin.style.borderRadius = "3px";
                kockaszin.style.border = "white 1px solid";
                kockaszin.style.backgroundColor = colors[i];

                legendlabel.appendChild(kockaszin);
                legendszovegtarto.textContent = e;
                legendszovegtarto.style.display = "inline";
                legendlabel.style.listStyle = "none";

                legendlabel.appendChild(legendszovegtarto);

                legend.appendChild(legendlabel);
            });



            legendtarto.appendChild(legend);

            tartonbeluldiv.appendChild(legendtarto);

            tarto.appendChild(tartorow);
            var nem = new Chart(document.getElementById(i), {
                type: 'pie',
                data: {
                    labels: Object.keys(adatok[felirat[i]]),

                    datasets: [{
                        data: Object.values(adatok[felirat[i]]),
                        radius: 110,
                        backgroundColor: colors
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,

                    plugins: {
                        legend: {
                            display: false,
                        }
                    }


                }


            });




            nem.update();


        }

    }













    function diagramadat(kerdesek, data) {
        const res = {};

        const map = {
            hallott: "A glicin ismertsége",
            haigenhonnan: "Az oldalról szerzett információ forrása",
            nemzetiseg: "A kitöltők nemzetiségi megolszlása",
            orszag: "A kitöltők ország szerinti megolszlása",
            nem: "A kitöltők nem szerinti megolszlása",
            lakhely: "A kitöltők lakóhely-típus szerinti megolszlása",
            kor: "A kitöltők életkori szerinti megolszlása",
            egeszsegallapot: "Önértékelt egészségi állapot",
            vegzettseg: "Legmagasabb iskolai végzettség megolszlása"
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