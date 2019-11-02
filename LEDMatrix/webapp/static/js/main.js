/**
 * Author: LEDMatrix Team - 2019
 * Description: Originally created for Alden schools
 * 
 * Please consider sharing any cool additons to this project! :)
 * */


//The drawing context, used to draw on a canvas
var contextd;

var GRID;


/**
 * Waits till the page to load then calls 'documentReady' function
 * Some other common ways to do this are: 
 * 		$(function() { ... });
 * 	or
 * 		$(document).ready(function() { ... });
 * 		
 */
$(document).ready(documentReady);

function documentReady(jQuery) {



    var colorPicker = new iro.ColorPicker('#color-picker');

    var gridWidth = 686;
    var gridHeight = 686;

    var ledsPerRow = 16;
    var ledsPerCol = 16;

    GRID = gridDataStructInit(ledsPerRow, ledsPerCol);


    var canvas = $('#led-matrix-grid');
    canvas.attr({ width: gridWidth, height: gridHeight });

    var context = canvas.get(0).getContext("2d");

    drawGrid(context, gridWidth, gridHeight, ledsPerRow, ledsPerCol);
}

/**
 * Creates/Draws a 2d grid on the canvas that is visible on the page
 * 
 * @param {Number} totalGridWidth The total witdth of the grid/canvas
 * @param {Number} totalGridHeight The total height of the grid/canvas
 * @param {Number} boxesPerRow The number of boxes/rectangles you want on each row
 * @param {Number} boxesPerCol The number of boxes/rectangles you want on each column
 */
function drawGrid(totalGridWidth, totalGridHeight, boxesPerRow, boxesPerCol) {

    //used to calculate the width and height of each box in the grid given the total height and with of our grid. 
    var boxWidth = totalGridWidth / boxesPerRow;
    var boxHeight = totalGridHeight / boxesPerCol;

    /*creates 'boxesPerRow + 1' vertical lines each having a witdth of boxWidth,
      each iteration we move by one 'boxWidth' unit to the right.*/
    for (var x = 0; x <= totalGridWidth; x += boxWidth) {
        context.moveTo(x, 0);
        context.lineTo(x, totalGridHeight);
    }

    /*creates 'boxesPerCol + 1' Horozontal lines each having a height of boxHeight,
      each iteration we move by one 'boxHeight' unit down. */
    for (var y = 0; y <= totalGridHeight; y += boxHeight) {
        context.moveTo(0, y);
        context.lineTo(totalGridWidth, y);
    }

    //Chooses a color for the lines and then actually draws them to the canvas
    context.strokeStyle = "black";
    context.stroke();
}


/**
 * Creates and initializes an array of arrays with each element  
 * consiting of the beggining x and y mouse cordinates for each box and its color.
 * 
 * @param {Number} rows The numner of rows for our 2d array.
 * @param {Number} cols The numner of columns for our 2d array.
 * @param {Number} boxWidth The width each box occupies, used to calculating the mouse x position relative to a canvas.
 * @param {Number} boxHeight The width each box occupies, used to calculating the mouse x position relative to a canvas.
 * @returns {Array} A 2D array each element consiting of the beggining x and y mouse cordinates for each box and its color.
 */
function gridDataStructInit(rows, cols, boxWidth, boxHeight) {
    var grid = [];
    for (r = 0; r < rows; r++) {
        grid[r] = [];
        for (c = 0; c < cols; c++) {
            boxStartX = r * boxWidth;
            boxStartY = c * boxHeight;
            grid[r][c] = { mouseX: boxStartX, mouseY: boxStartY, color: '#000000' };
        }
    }

    return grid;
}




/********BELOW ARE ALL EVENT HANDLERS *******/

function mouseDownGrid(event) {

}

function mouseUpGrid(event) {

}

function mouseMoveGrid(event) {

}