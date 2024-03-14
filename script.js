function createGrid(numRows, numColumns) {
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < numColumns; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            row.appendChild(square);
        }
        gridContainer.appendChild(row);
    }
}

function changeColour(square) {
    const randomColour = "#" + (Math.floor(Math.random() * 16777215)).toString(16);    // from CSS-Tricks
    square.style.backgroundColor = randomColour;
}

const gridContainer = document.querySelector(".grid-container");
createGrid(16, 16);

const gridSquares = document.querySelectorAll(".square");
let sketchStarted = false;

gridSquares.forEach((square) => {
    square.addEventListener("mousedown", () => {
        if (sketchStarted) {
            sketchStarted = false;  // stop sketch
        } else {
            sketchStarted = true;
            changeColour(square);  // start sketch
        }
    });
});

gridSquares.forEach((square) => {
    square.addEventListener("mouseover", () => {
        if (sketchStarted && !square.style.backgroundColor) {
            changeColour(square);
        }
    });
});



