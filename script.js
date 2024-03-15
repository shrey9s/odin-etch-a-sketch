function createGrid(numRows = 16, numColumns = numRows) {
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

function setGridSize(userInput) {
    let gridValues = (userInput.split("x")).map((n) => parseInt(n));  // if separator "x" not in string, a one-element array with the original string is returned
    let numRows = gridValues[0];
    let numColumns = gridValues[1];  // undefined if gridValues.length = 1
    while (numRows > 100 || numColumns > 100) {  // undefined > 100 = false
        userInput = prompt("The number of rows/columns have to be <= 100! Please choose again.");
        if (!userInput) createGrid();  // if user presses cancel or returns "" the default 16x16 grid is generated (default values for numRows & numColumns)
        gridValues = (userInput.split("x")).map((n) => parseInt(n)); // if userInput = null; ERROR
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

const gridContainer = document.querySelector(".grid-container");
let gridSquares = document.querySelectorAll(".square");
let sketchStarted = false;

createGrid();
addMousedownEvent();
addMouseoverEvent();

function addMousedownEvent() {
    gridSquares = document.querySelectorAll(".square");  // get current NodeList of .square divs (in case they have been replaced when grid size is changed)
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
}

function addMouseoverEvent() {
    gridSquares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            if (sketchStarted && !square.style.backgroundColor) {
                changeColour(square);
            }
        });
    });
}

const gridSizeBtn = document.querySelector(".btn");
gridSizeBtn.addEventListener("click", () => {
    const input = prompt("Choose a grid size (e.g., 30, 20x20, 20x30)", "16x16");
    if (!input) return;
    removeGrid();
    setGridSize(input);
    addMousedownEvent();  // updates gridSquares NodeList
    addMouseoverEvent();  // has to come after so it uses updated gridSquares NodeList
});









