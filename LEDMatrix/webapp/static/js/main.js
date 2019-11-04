/**
 * Author: LEDMatrix Team - 2019
 * Description: Originally created for Alden schools
 * 
 * Please consider sharing any cool additons to this project! :)
 * */


//The drawing context, used to draw on a canvas



/**
 * Waits till the page to loads 
 * Some common ways to do this are: 
 * 		$(function() { ... }); 
 * 	or
 * 		$(document).ready(function() { ... });
 *  or
 *      $(document).ready(someFunctionName);
 *      ...
 *      someFunctionName(jQuery){ ... }
 * 		
 */
"use strict"
$(function() {


    var gridWidth = 686;
    var gridHeight = 686;
    var boxesPerRow = 16;
    var boxesPerCol = 16;
    var _debug = true;

    var globalVars = initGlobals(gridWidth, gridHeight, boxesPerRow, boxesPerCol, _debug);


    drawGrid(globalVars.context, globalVars.gridProp);
    setupEventHandlers(globalVars);





});


function initGlobals(gridWidth, gridHeight, boxesPerRow, boxesPerCol, _debug) {

    var colorPicker = new iro.ColorPicker('#color-picker');

    var canvas = $('#led-matrix-grid');
    canvas.attr({ width: gridWidth, height: gridHeight });

    var context = canvas.get(0).getContext("2d");



    var boxWidth = gridWidth / boxesPerRow;
    var boxHeight = gridHeight / boxesPerCol;
    var grid = initGridDataStruct(boxesPerRow, boxesPerCol, boxWidth, boxHeight);
    var gridProp = {
        grid: grid,
        gridWidth: gridWidth,
        gridHeight: gridHeight,
        boxesPerRow: boxesPerRow,
        boxesPerCol: boxesPerCol,
        boxWidth: boxWidth,
        boxHeight: boxHeight
    };

    function setGridColor(row, col, newColor) {

        context.fillStyle = newColor;
        grid[row][col].color = newColor;

        context.beginPath();
        context.rect(grid[row][col].boxStartX, grid[row][col].boxStartY, boxWidth, boxHeight);
        context.closePath();
        context.fill();
    }

    var getDebugInfo = function() {

        return {
            "Color Picker: ": colorPicker.color.hexString,
            "Grid Width: ": gridWidth,
            "Grid Height: ": gridHeight,
            "Boxes per rows: ": boxesPerRow,
            "boxes per column: ": boxesPerCol,
            "Box width: ": boxWidth,
            "Box height: ": boxHeight
        };
    }

    if (_debug) {
        showDebugInfo(getDebugInfo);
    }

    return {
        colorPicker: colorPicker,
        canvas: canvas,
        context: context,
        gridProp: gridProp,
        setGridColor: setGridColor,
        _debug: _debug,
        getDebugInfo: getDebugInfo
    };
}

/**
 * Creates/Draws a 2d grid on the canvas that is visible on the page
 * 
 * @param {Number} totalGridWidth The total witdth of the grid/canvas
 * @param {Number} totalGridHeight The total height of the grid/canvas
 * @param {Number} boxesPerRow The number of boxes/rectangles you want on each row
 * @param {Number} boxesPerCol The number of boxes/rectangles you want on each column
 */
function drawGrid(context, gridProp) {

    //used to calculate the width and height of each box in the grid given the total height and with of our grid. 


    /*creates 'boxesPerRow + 1' vertical lines each having a witdth of boxWidth,
      each iteration we move by one 'boxWidth' unit to the right.*/
    for (var x = 0; x <= gridProp.gridWidth; x += gridProp.boxWidth) {
        context.moveTo(x, 0);
        context.lineTo(x, gridProp.gridHeight);
    }

    /*creates 'boxesPerCol + 1' Horozontal lines each having a height of boxHeight,
      each iteration we move by one 'boxHeight' unit down. */
    for (var y = 0; y <= gridProp.gridHeight; y += gridProp.boxHeight) {
        context.moveTo(0, y);
        context.lineTo(gridProp.gridWidth, y);
    }

    //Chooses a color for the lines and then actually draws them to the canvas
    context.strokeStyle = "black";
    //context.lineWidth = 10;
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
function initGridDataStruct(rows, cols, boxWidth, boxHeight) {

    var grid = [];
    for (var r = 0; r < rows; r++) {
        grid[r] = [];
        for (var c = 0; c < cols; c++) {
            var startX = c * boxWidth;
            var startY = r * boxHeight;
            grid[r][c] = { boxStartX: startX, boxStartY: startY, color: '#FFFFFF' };
        }
    }

    return grid;
}

// function sendData() {
//     for (r = (tileRowCount - 1); r >= 0; r--) {
//         var rev = 0;
//         for (c = 0; c < tileColumnCount; c++) {
//             //This line is to make sure data gets sent in the order
//             //of how the matrix lights are wired
//             if (r % 2 == 0) c = tileColumnCount - 1 - rev;

//             //Turn RGB to GRB(since the matrix uses GRB)
//             var x = tiles[c][r].state;
//             x = x.slice(1, 7);
//             x = parseInt(x, 16);
//             x = (x & 0x0000FF) | ((x & 0xFF0000) >>> 8) | ((x & 0x00FF00) << 8);

//             var ledString = x.toString(16);
//             while (ledString.length < 6) ledString = '0' + ledString;
//             dataString = dataString + ledString;
//             c = rev++;
//         }
//     }
//     $.ajax({
//         type: "POST",
//         url: "/cgi-bin/pytest.py",
//         data: { param: dataString },
//         context: document.body
//     });
// }

// function clear() {
//     ctx.clearRect(0, 0, WIDTH, HEIGHT);
// }



/********  EVENT HANDLERS *******/
function setupEventHandlers(globalVars) {
    startMouseEventHandler(globalVars);

}

function startMouseEventHandler(globalVars) {

    var isMouseDown = false;

    var canvas = globalVars.canvas;
    var colorPicker = globalVars.colorPicker;

    var gridProp = globalVars.gridProp;
    var grid = gridProp.grid;

    var lastColoredRow = 0;
    var lastColoredCol = 0;

    var lastBoxStartX = -1;
    var lastBoxEndX = -1;
    var lastBoxStartY = -1;
    var lastBoxEndY = -1;

    var mouseX;
    var mouseY;

    canvas.mousedown(mouseDownOnGrid);
    canvas.mouseup(mouseUpOnGrid);
    canvas.mousemove(mouseMoveOnGrid);
    canvas.mouseout(mouseOutOfGrid);



    function mouseDownOnGrid(event) {
        isMouseDown = true;

        mouseX = event.pageX - canvas.offset().left;
        mouseY = event.pageY - canvas.offset().top;

        colorCanvasOnMousePos(mouseX, mouseY, globalVars);

        updateExtraMouseDebugInfo();
    }



    function mouseMoveOnGrid(event) {


        mouseX = event.pageX - canvas.offset().left;
        mouseY = event.pageY - canvas.offset().top;

        var isInLastBox = mouseX >= lastBoxStartX && mouseX <= lastBoxEndX && mouseY >= lastBoxStartY && mouseY <= lastBoxEndY;
        if (lastBoxStartX === -1 && lastBoxStartY === -1 && lastBoxEndX === -1 && lastBoxEndY === -1) isInLastBox = false;

        if (isMouseDown && !isInLastBox) colorCanvasOnMousePos(mouseX, mouseY, globalVars);

        updateExtraMouseDebugInfo();
    }

    function mouseUpOnGrid(event) {
        if (isMouseDown) isMouseDown = false;
        lastBoxStartX = -1;
        lastBoxEndX = -1;
        lastBoxStartY = -1;
        lastBoxEndY = -1;

    }

    function mouseOutOfGrid(event) {
        if (globalVars._debug) {
            $('#debug-mouseX-canvas').text("(Canvas)Mouse X: n/a");
            $('#debug-mouseY-canvas').text("(Canvas)Mouse Y: n/a");
        }

        if (isMouseDown) isMouseDown = false;
        lastBoxStartX = -1;
        lastBoxEndX = -1;
        lastBoxStartY = -1;
        lastBoxEndY = -1;
    }


    function colorCanvasOnMousePos() {

        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                var boxStartX = grid[row][col].boxStartX;
                var boxEndX = boxStartX + gridProp.boxWidth;

                var boxStartY = grid[row][col].boxStartY;
                var boxEndY = boxStartY + gridProp.boxHeight;

                if (mouseX >= boxStartX && mouseX <= boxEndX && mouseY >= boxStartY && mouseY <= boxEndY) {

                    globalVars.setGridColor(row, col, colorPicker.color.hexString);

                    lastColoredRow = row;
                    lastColoredCol = col;

                    lastBoxStartX = boxStartX;
                    lastBoxEndX = boxEndX;

                    lastBoxStartY = boxStartY;
                    lastBoxEndY = boxEndY;

                }

            }
        }

    }



    function updateExtraMouseDebugInfo() {
        if (globalVars._debug) {
            $('#debug-mouseX-canvas').text("(Canvas)Mouse X: " + mouseX + "px");
            $('#debug-mouseY-canvas').text("(Canvas)Mouse Y: " + mouseY + "px");
            $('#debug-row-col-canvas').text("(Canvas)Clicked: (Row: " + lastColoredRow + ", Col: " + lastColoredCol + ")");
            console.log("(Canvas)Clicked: (Row: ", lastColoredRow, ", Col: ", lastColoredCol, ")");
            console.log(" (Canvas)Mouse X: ", mouseX, "\n", "(Canvas)Mouse Y: ", mouseY);
        }
    }

}




/**On a Click of the Canvas
 *  We know:
 *      -what value the color picker has
 *      -cordinate of the mouse with respect to canvas and document
 *      -can find out current row and col we are in (but we are trying to avoid doing this multiple times when mouse is in same box area will make it slow)
 *      
 * */