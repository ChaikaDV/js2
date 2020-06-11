'use strict';

let idTable = 'TableOfSeries';
let idForm = 'AddSeries';
let SeriesTable = document.getElementById(idTable);
let form = document.getElementById(idForm);
let selectedColumn = -1;

function sortingTable (index, dataType, tableIsSorted) {
    const tbody = SeriesTable.querySelector('tbody');
    function compareRows (firstRow, secondRow){
        const dataFirstRow = firstRow.cells[index].innerHTML;
        const dataSecondRow = secondRow.cells[index].innerHTML;
        switch (dataType) {
            case 'integer': {
                return dataFirstRow - dataSecondRow;
            }
            case 'text': {
                if (dataFirstRow < dataSecondRow)
                    return -1;
                if (dataFirstRow > dataSecondRow)
                    return 1;
                return 0;
            }
        }
    }

    let rows = [].slice.call(tbody.rows);
    rows.sort(compareRows);
    if (tableIsSorted)
        rows.reverse();

    SeriesTable.removeChild(tbody);
    for (let i = 0; i < rows.length; i++){
        tbody.appendChild(rows[i]);
    }
    SeriesTable.appendChild(tbody);
}

function addingCell (row, value) {
    row.insertCell(-1).appendChild(document.createTextNode(value));
}

function addingRow () {
    let name = document.getElementById('inputSeries');
    let date = document.getElementById('inputDate');
    let season_count = document.getElementById('inputSeasonCount');
    let series_count = document.getElementById('inputSeriesCount');
    let time = document.getElementById('inputTime');

    if ((name.value != '') && (parseInt(date.value)) &&
        (parseInt(season_count.value)) && (parseInt(series_count.value)) &&
        (parseInt(time.value)))
    {
        let row = SeriesTable.getElementsByTagName('tbody')[0].insertRow(-1);
        addingCell(row, name.value);
        addingCell(row, date.value);
        addingCell(row, season_count.value);
        addingCell(row, series_count.value);
        addingCell(row, time.value);

        let deleteButton = document.createElement( "button");
        deleteButton.innerHTML = '<img src = "TrashBin.png" alt = "Удалить">';
        row.insertCell(-1).appendChild(deleteButton);

        name.value = '';
        date.value = '';
        season_count.value = '';
        series_count.value = '';
        time.value = '';
    }
    else
    {
        alert('Ошибка! Необходимо все поля заполнить корректными значениями!');
    }
}

SeriesTable.addEventListener('click', (e) => {

    if (e.target.tagName === 'TH') {
        let currentIndex = e.target.cellIndex;
        sortingTable(currentIndex, e.target.getAttribute('data-type'), selectedColumn === currentIndex);
        if (selectedColumn === currentIndex){
            selectedColumn = -1;
        }
        else {
            selectedColumn = currentIndex;
        }
    }
    if (e.target.tagName === 'IMG') {
        let rowIndex = e.target.closest('TR').rowIndex;
        SeriesTable.deleteRow(rowIndex);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addingRow();
});
