// Create 16x16 grid of square divs
function createGrid(numRows, numColumns) {
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < numColumns; j++) {
            const square = document.createElement("div");
            square.classList.add("square");
            //square.textContent = `(${i}, ${j})`;
            row.appendChild(square);
        }
        gridContainer.appendChild(row);
    }
}

const gridContainer = document.querySelector(".grid-container");
createGrid(16, 16);