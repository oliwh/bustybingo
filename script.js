function readCSV(url) {
    return new Promise((resolve, reject) => { 
        Papa.parse(url, {
            download: true,
            header: false,
            skipEmptyLines: false,
            complete: function(results) {
                resolve(results.data);
                console.log(results.data);
            },

            error: function(error) {
                console.error("CSV failed to load:", error);
                reject(results.errors);
            }
        });
    });
}

let data;
const history = [];

function rndNum(data) {
    let max = data.length;
    return Math.floor(Math.random() * max);
}

function numGen(data, num = rndNum(data)) {
    /* Open modal */
    document.getElementById("myModal").style.display = "block";
    document.getElementById(data[num][0]).classList.toggle("selected");
    //let num = rndNum(data);
    console.log("Index", num, "chosen, corresponding to:", data[num][0], data[num][1]);

    document.getElementById("modalNum").innerHTML = data[num][1] + ", " + data[num][0];

    history.push(data[num]);
    data.splice(num, 1);
    console.log(data);
    console.log(history);
    document.getElementById("recent").innerHTML = history.slice(-5).map(element => element[0]).join(" ");
    return;
}

function undo(data, index=-1) {
    console.log(`undo index ${index}`)
    document.getElementById(history[index][0]).classList.toggle("selected");
    data.push(history.splice(index, 1));
    data.sort((a, b) => a[0] - b[0]);
    console.log(data);
    console.log(history);
    document.getElementById("recent").innerHTML = history.slice(-5).map(element => element[0]).join(" ");
    return;
};

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Close when clicking outside the popup
window.onclick = function(event) {
    const modal = document.getElementById("myModal");

    if (event.target === modal) {
        closeModal();
    }
};

function drawGrid() {
    const cols = 18;
    const rows = 5;
    const grid = document.getElementById("buttonGrid")
    const gridFrag = document.createDocumentFragment();

    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            const numBtn = document.createElement('button');
            numBtn.innerHTML = (j+1) + 18*i; // Iterate 1-90
            numBtn.id = `${(j+1) + 18*i}`
            numBtn.onclick = function() {
                if (numBtn.classList.contains("selected")) {
                    undo(data, history.findIndex(item => item[0] === numBtn.id));
                } else {
                    console.log(data.findIndex(item => item[0] === numBtn.id));
                    numGen(data, data.findIndex(item => item[0] === numBtn.id));
                }
            };
            gridFrag.appendChild(numBtn);
        }
    }
    grid.appendChild(gridFrag);
}

async function main() {
    data = await readCSV("./db.csv");
    drawGrid();
}

main();

