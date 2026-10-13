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

function numGen(data) {
    let num = rndNum(data);
    console.log("Index", num, "chosen, corresponding to:", data[num][0], data[num][1]);

    history.push(data[num]);
    data.splice(num, 1);
    console.log(data);
    console.log(history);
    document.getElementById("recent").innerHTML = history.slice(-5).map(element => element[0]).join(" ");
    return;
}

function undo(data) {
    data.push(history.pop());
    data.sort((a, b) => a[0] - b[0]);
    console.log(data);
    console.log(history);
    document.getElementById("recent").innerHTML = history.slice(-5).map(element => element[0]).join(" ");
    return;
};

async function main() {
    data = await readCSV("./db.csv");
}

main();