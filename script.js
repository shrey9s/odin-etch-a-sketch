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

const gridContainer = document.querySelector(".grid-container");
createGrid(16, 16);

function changeColour(square) {
    const randomColour = "#" + (Math.floor(Math.random() * 16777215)).toString(16);    // from CSS-Tricks
    square.style.backgroundColor = randomColour;
}

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

function getGridSize() {
    let userInput = prompt("Choose a grid size", "16x16");
    let gridValues = (userInput.split("x")).map((x) => parseInt(x));
    let numRows = gridValues[0];
    let numColumns = gridValues[1];
    while (numRows > 100 || numColumns > 100) {
        userInput = prompt("The number of rows/columns have to be <=100! Please choose again.");
        gridValues = (userInput.split("x")).map((x) => parseInt(x));
        numRows = gridValues[0];
        numColumns = gridValues[1];
    }
    console.log(numRows, numColumns);
}

const startBtn = document.querySelector(".start-btn");
startBtn.addEventListener("click", getGridSize);



