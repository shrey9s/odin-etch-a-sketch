// Create 16x16 grid of square divs

function createGrid(numRows, numColumns) {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            gridContainer.appendChild(square);
        }
    }
}

const gridContainer = document.querySelector(".grid-container");
createGrid(16, 16);