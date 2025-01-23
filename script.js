const rowsInput = document.getElementById('rows');
const columnsInput = document.getElementById('columns');
const borderStyleInput = document.getElementById('border-style');
const cellPaddingInput = document.getElementById('cell-padding');
const cellSpacingInput = document.getElementById('cell-spacing');
const tableWidthInput = document.getElementById('table-width');
const tableHeightInput = document.getElementById('table-height');
const bgColorInput = document.getElementById('bg-color');
const textColorInput = document.getElementById('text-color');
const headerRowCheckbox = document.getElementById('header-row');
const rowspanInput = document.getElementById('rowspan');
const colspanInput = document.getElementById('colspan');
const generateButton = document.getElementById('generate');
const resetButton = document.getElementById('reset');
const tablePreview = document.getElementById('table-preview');
const htmlCode = document.getElementById('html-code');
const copyButton = document.getElementById('copy');
const exportButton = document.getElementById('export');

function generateTable() {
    const rows = parseInt(rowsInput.value);
    const columns = parseInt(columnsInput.value);
    const borderStyle = borderStyleInput.value;
    const cellPadding = cellPaddingInput.value;
    const cellSpacing = cellSpacingInput.value;
    const tableWidth = tableWidthInput.value;
    const tableHeight = tableHeightInput.value;
    const bgColor = bgColorInput.value;
    const textColor = textColorInput.value;
    const includeHeader = headerRowCheckbox.checked;
    const rowspan = parseInt(rowspanInput.value);
    const colspan = parseInt(colspanInput.value);

    let table = `<table style="border: 1px ${borderStyle}; border-collapse: collapse; width: ${tableWidth}; height: ${tableHeight};">`;
    
    if (includeHeader) {
        table += '<thead><tr>';
        for (let c = 0; c < columns; c++) {
            table += `<th style="border: 1px ${borderStyle}; padding: ${cellPadding}px; background-color: ${bgColor}; color: ${textColor};">
                <input type="text" value="Header ${c + 1}" oninput="updateHeader(this)">
            </th>`;
        }
        table += '</tr></thead>';
    }

    table += '<tbody>';
    for (let r = 0; r < rows; r++) {
        table += '<tr>';
        for (let c = 0; c < columns; c++) {
            table += `<td rowspan="${rowspan}" colspan="${colspan}" style="border: 1px ${borderStyle}; padding: ${cellPadding}px; background-color: ${bgColor}; color: ${textColor};">
                <input type="text" value="Cell ${r + 1}, ${c + 1}" oninput="updateCell(this)">
            </td>`;
        }
        table += '</tr>';
    }
    table += '</tbody></table>';

    tablePreview.innerHTML = table;
    htmlCode.value = table;
}

function updateHeader(input) {
    input.parentElement.innerHTML = `<input type="text" value="${input.value}" oninput="updateHeader(this)">`;
}

function updateCell(input) {
    input.parentElement.innerHTML = `<input type="text" value="${input.value}" oninput="updateCell(this)">`;
}

function resetForm() {
    rowsInput.value = 3;
    columnsInput.value = 3;
    borderStyleInput.value = 'solid';
    cellPaddingInput.value = 5;
    cellSpacingInput.value = 2;
    tableWidthInput.value = '100%';
    tableHeightInput.value = 'auto';
    bgColorInput.value = '#ffffff';
    textColorInput.value = '#000000';
    headerRowCheckbox.checked = true;
    rowspanInput.value = 1;
    colspanInput.value = 1;
    tablePreview.innerHTML = '';
    htmlCode.value = '';
}

function copyToClipboard() {
    htmlCode.select();
    document.execCommand('copy');
    alert('HTML code copied to clipboard!');
}

function exportHTML() {
    const blob = new Blob([htmlCode.value], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'table.html';
    a.click();
}

generateButton.addEventListener('click', generateTable);
resetButton.addEventListener('click', resetForm);
copyButton.addEventListener('click', copyToClipboard);
exportButton.addEventListener('click', exportHTML);