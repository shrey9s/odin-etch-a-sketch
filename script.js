function createGrid(numRows = 16, numColumns = numRows) {
    console.log(numRows, numColumns)
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

function setGridSize(userInput) {
    let gridValues = (userInput.split("x")).map((n) => parseInt(n));  // if separator "x" not in string, a one-element array with the original string is returned
    let numRows = gridValues[0];
    let numColumns = gridValues[1];  // undefined if gridValues.length = 1
    while (numRows > 100 || numColumns > 100) {  // undefined > 100 = false
        userInput = prompt("The number of rows/columns have to be <= 100! Please choose again.");
        if (!userInput) createGrid();  // if user presses cancel or returns "" the default 16x16 grid is generated (default values for numRows & numColumns)
        gridValues = (userInput.split("x")).map((n) => parseInt(n));
        numRows = gridValues[0];
        numColumns = gridValues[1];
    }
    createGrid(numRows, numColumns);  
}
// if user enters only one value (e.g., 45), numRows = 45 and undefined is passed for numColumns,
// so numColumns is initialised with the default value -> numColumns = numRows = 45.

function removeGrid() {
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
        gridContainer.removeChild(row);
    });
}

const gridSizeBtn = document.querySelector(".btn");
gridSizeBtn.addEventListener("click", () => {
    const input = prompt("Choose a grid size (e.g., 20x20, 45)", "16x16");
    if (!input) return;
    removeGrid();
    setGridSize(input);
});



