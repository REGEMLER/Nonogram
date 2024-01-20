function createField(numberHelpers, size) {
    const field = document.querySelector(".field");
    for(let i = 1; i <= size; i++) {
        const row = document.createElement("DIV");
        row.classList.add("row");

        if (i === numberHelpers) {
            row.classList.add("row_helper");
        }
        if ((i - numberHelpers) % 5 === 0 && i !== size && i !== numberHelpers) {
            row.classList.add("row_five");
        }

        for (let j = 1; j <= size; j++) {
            const cell = document.createElement("DIV");
            cell.classList.add("cell");
            if (i>numberHelpers && j>numberHelpers) {
                cell.id = `${i - numberHelpers}-${j - numberHelpers}`;
                cell.textContent = cell.id;
            }

            if (j === numberHelpers) {
                cell.classList.add("cell_helper");
            }
            if ((j - numberHelpers) % 5 === 0 && j !== numberHelpers && j !== size) {
                cell.classList.add("cell_five");
            }
            if (i < numberHelpers + 1 && j < numberHelpers + 1) {
                cell.classList.add("cell_empty");
            }
            row.append(cell);
        }
        field.append(row);
    }
}

createField(5, 20)