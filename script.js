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
    if (!square.style.backgroundColor) {
        const randomColour = "#" + (Math.floor(Math.random() * 16777215)).toString(16); // from CSS-Tricks
        square.style.backgroundColor = randomColour;
        square.style.opacity = "0.1";
    }
    else {
        const currentOpacity = +(square.style.opacity);
        if (currentOpacity < 1) {
            square.style.opacity = `${currentOpacity + 0.1}`;
        }
    }
}

function setGridSize(userInput) {
    let gridValues = (userInput.split("x")).map((n) => parseInt(n)); // if separator "x" not in string, a one-element array with the original string is returned
    let numRows = gridValues[0];
    let numColumns = gridValues[1]; // undefined if gridValues.length = 1
    while (numRows > 100 || numColumns > 100) { // undefined > 100 = false
        userInput = prompt("The number of rows/columns have to be <= 100! Please choose again.");
        if (!userInput) createGrid(); // if user presses cancel or returns "" the default 16x16 grid is generated (default values for numRows & numColumns)
        gridValues = (userInput.split("x")).map((n) => parseInt(n)); // if userInput = null; ERROR
        numRows = gridValues[0];
        numColumns = gridValues[1];
    }
    createGrid(numRows, numColumns);
    document.querySelector(".grid-size").textContent = `${numRows} x ${(numColumns) ? numColumns : numRows}`;
}
// if user enters only one value (e.g., 45), numRows = 45 and undefined is passed for numColumns,
// so numColumns is initialised with the default value -> numColumns = numRows = 45.

function removeGrid() {
    const rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
        gridContainer.removeChild(row);
    });
}

// sketchStarted is initially set to false
function addMousedownEvent() {
    gridSquares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (sketchStarted) {
                sketchStarted = false; // stop sketch
            } else {
                sketchStarted = true;
                changeColour(square); // start sketch
            }
        });
    });
}
function addMouseoverEvent() {
    gridSquares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            if (sketchStarted) changeColour(square);
        });
    });
}

const gridSizeBtn = document.querySelector(".size-btn");
gridSizeBtn.addEventListener("click", () => {
    const input = prompt("Choose a grid size (e.g., 30, 20x20, 20x30)", "16x16");
    if (!input) return;
    removeGrid();
    setGridSize(input); // calls createGrid with new size parameters
    gridSquares = document.querySelectorAll(".square"); // updates gridSquares with the current NodeList of .square divs after the new grid is generated
    sketchStarted = false; // in case user did not click to stop drawing on the previous grid
    addMousedownEvent();
    addMouseoverEvent(); // attach new event listeners to the new .square divs in updated gridSquares NodeList
});

const clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", () => {
    gridSquares.forEach((square) => {
        square.style.backgroundColor = "";
        square.style.opacity = "";
        sketchStarted = false;
    });
});

// Initial 16x16 grid set-up
const gridContainer = document.querySelector(".grid-container");
createGrid(); // 16x16 grid (default)

let gridSquares = document.querySelectorAll(".square"); // NodeList(256) (after createGrid() call)
let sketchStarted = false;
addMousedownEvent();
addMouseoverEvent(); // attach event listeners to initial 16x16 grid




















