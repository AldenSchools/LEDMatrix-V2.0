/**
 * Author: LEDMatrix Team - 2019
 * Description: Originally created for Alden schools
 * 
 * Please consider sharing any cool additons to this project! :)
 */



/**
 * Waits till the page to load then calls 'documentReady function'
 * Some common ways to do this are: 
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


    var canvas = $('#led-matrix-grid');
    canvas.attr({ width: gridWidth, height: gridHeight });

    var context = canvas.get(0).getContext("2d");

    createGrid(context, gridWidth, gridHeight, ledsPerRow, ledsPerCol);
}

/**
 * Creates/draws a grid 
 * @param {Context} context  The drawing context, used to draw on a canvas
 * @param {Number} totalGridWidth The total witdth of the grid/canvas
 * @param {Number} totalGridHeight The total height of the grid/canvas
 * @param {Number} boxesPerRow The number of boxes/rectangles you want on each row
 * @param {Number} boxesPerCol The number of boxes/rectangles you want on each column
 */
function createGrid(context, totalGridWidth, totalGridHeight, boxesPerRow, boxesPerCol) {

    //The number of steps we want to skip on each iteration
    //used to make the boxes for each row and column.
    var xStep = totalGridWidth / boxesPerRow;
    var yStep = totalGridHeight / boxesPerCol;

    //creates 'boxesPerRow + 1' vertical lines each having a witdth of xStep
    for (var x = 0; x <= totalGridWidth; x += xStep) {
        context.moveTo(x, 0);
        context.lineTo(x, totalGridHeight);
    }

    //creates 'boxesPerCol + 1' Horozontal lines each having a height of yStep
    for (var y = 0; y <= totalGridHeight; y += yStep) {
        context.moveTo(0, y);
        context.lineTo(totalGridWidth, y);
    }

    //Chooses a color for the lines and then actually draws them to the canvas
    context.strokeStyle = "black";
    context.stroke();
}