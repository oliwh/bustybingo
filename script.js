Papa.parse("./db.csv", {
    download: true,
    header: false,
    skipEmptyLines: false,
    complete: function(results, file) {
        const rows = results.data;
        const columns = rows[0].map((_,colIndex) => rows.map(row => row[colIndex]));
        console.log(columns);
    },

    error: function(error) {
        console.error("CSV failed to load:", error);
    }
});

function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function numGen() {

};

function undo() {

};