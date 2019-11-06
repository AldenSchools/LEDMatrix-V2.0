/**
 * Author: LEDMatrix Team - 2019
 * Description: Originally created for Alden schools
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this 
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ .
 * 
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


    var gridWidth = 800;
    var gridHeight = 800;
    var boxesPerRow = 16;
    var boxesPerCol = 16;
    var gridLineWidth = 5;
    var initialColor = '#4c4c4c';
    var _debug = false;

    var globalVars = initGlobals(gridWidth, gridHeight, boxesPerRow, boxesPerCol, gridLineWidth, initialColor, _debug);


    drawGrid(globalVars.getContext(), globalVars.getGridProp());

    setupEventHandlers(globalVars);

});


function initGlobals(gridWidth, gridHeight, boxesPerRow, boxesPerCol, gridLineWidth, defaultColor, _debug) {

    gridWidth = (gridWidth > $("#grid-div").width()) ? $("#grid-div").width() : gridWidth;
    gridHeight = gridWidth;

    var canvas = $('#led-matrix-grid');
    canvas.attr({ width: gridWidth, height: gridHeight });

    var context = canvas.get(0).getContext("2d");
    context.fillStyle = defaultColor;
    console.log(context);

    var colorPicker = new iro.ColorPicker('#color-picker', { width: $("#color-picker").width() });

    var mode = "color";

    var boxWidth = (gridWidth / boxesPerRow) - gridLineWidth;
    var boxHeight = (gridHeight / boxesPerCol) - gridLineWidth;
    var grid = initGridDataStruct(context, boxesPerRow, boxesPerCol, boxWidth, boxHeight, gridLineWidth, defaultColor);


    var gridProp = {
        grid: grid,
        gridWidth: gridWidth,
        gridHeight: gridHeight,
        boxesPerRow: boxesPerRow,
        boxesPerCol: boxesPerCol,
        boxWidth: boxWidth,
        boxHeight: boxHeight,
        gridLineWidth: gridLineWidth
    };

    function getColorPicker() { return colorPicker; }

    function getCanvas() { return canvas; }

    function getContext() { return context; }

    function getGridProp() { return gridProp; }

    function getDefaultColor() { return defaultColor; }

    function setGridColor(row, col, newColor) {

        var trueColor;
        if (mode === "color") trueColor = newColor;
        if (mode === "eraser") trueColor = defaultColor;

        grid[row][col].color = trueColor;

        //context.beginPath();

        context.clearRect(grid[row][col].boxStartX, grid[row][col].boxStartY, boxWidth, boxHeight);

        context.fillStyle = trueColor;
        context.fillRect(grid[row][col].boxStartX, grid[row][col].boxStartY, boxWidth, boxHeight);

        //context.closePath();
        //context.fill();
    }

    function updateGrid() {


        gridWidth = $("#grid-div").width();
        gridHeight = gridWidth;

        boxWidth = (gridWidth / boxesPerRow) - gridLineWidth;
        boxHeight = (gridHeight / boxesPerCol) - gridLineWidth;

        console.log("recalculating start positions for each box in grid");
        //drawGrid();
        canvas.attr({ width: gridWidth, height: gridHeight });

        gridProp.gridWidth = gridWidth;
        gridProp.gridHeight = gridHeight;
        gridProp.boxWidth = boxWidth;
        gridProp.boxHeight = boxHeight;

        drawGrid(context, gridProp);

        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                var startX = -1;
                var startY = -1;


                if (col === 0) startX = gridLineWidth / 2;
                else startX = grid[row][col - 1].boxEndX + gridLineWidth;

                if (row === 0) startY = gridLineWidth / 2;
                else startY = grid[row - 1][col].boxEndY + gridLineWidth;


                grid[row][col].boxStartX = startX;
                grid[row][col].boxStartY = startY;

                grid[row][col].boxEndX = startX + boxWidth;
                grid[row][col].boxEndY = startY + boxHeight;

                context.fillStyle = grid[row][col].color;
                context.fillRect(startX, startY, boxWidth, boxHeight);

            }
        }

        gridProp.grid = grid;
    }

    function setMode(newMode) { mode = newMode; }

    function getDebugStatus() { return _debug; }


    var getDebugInfo = function() {

        return {
            "Color Picker: ": colorPicker.color.hexString,
            "Default Color: ": defaultColor,
            "Mode: '": mode + "'",
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
        console.log(" Grid: ", grid);
    }

    return {
        getColorPicker: getColorPicker,
        getCanvas: getCanvas,
        getContext: getContext,
        getGridProp: getGridProp,
        getDefaultColor: getDefaultColor,
        setGridColor: setGridColor,
        updateGrid: updateGrid,
        setMode: setMode,
        getDebugStatus: getDebugStatus,
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
    context.clearRect(0, 0, gridProp.gridWidth, gridProp.gridHeight)

    //used to calculate the width and height of each box in the grid given the total height and with of our grid. 


    /*creates 'boxesPerRow + 1' vertical lines each having a witdth of boxWidth,
      each iteration we move by one 'boxWidth' unit to the right.*/
    for (var x = 0; x <= gridProp.gridWidth; x += gridProp.boxWidth + gridProp.gridLineWidth) {
        context.moveTo(x, 0);
        context.lineTo(x, gridProp.gridHeight);
    }

    /*creates 'boxesPerCol + 1' Horozontal lines each having a height of boxHeight,
      each iteration we move by one 'boxHeight' unit down. */
    for (var y = 0; y <= gridProp.gridHeight; y += gridProp.boxHeight + gridProp.gridLineWidth) {
        context.moveTo(0, y);
        context.lineTo(gridProp.gridWidth, y);
    }
    context.moveTo(gridProp.gridWidth, 0);
    context.lineTo(gridProp.gridWidth, gridProp.gridHeight);

    //Chooses a color for the lines and then actually draws them to the canvas
    context.strokeStyle = "black";
    context.lineWidth = gridProp.gridLineWidth;
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
function initGridDataStruct(context, rows, cols, boxWidth, boxHeight, gridLineWidth, defaultColor) {

    var grid = [];
    for (var r = 0; r < rows; r++) {
        grid[r] = [];
        for (var c = 0; c < cols; c++) {
            var startX = -1;
            var startY = -1;


            if (c === 0) startX = gridLineWidth / 2;
            else startX = grid[r][c - 1].boxEndX + gridLineWidth;

            if (r === 0) startY = gridLineWidth / 2;
            else startY = grid[r - 1][c].boxEndY + gridLineWidth;

            var endX = (startX + boxWidth);
            var endY = (startY + boxHeight);



            grid[r][c] = {
                boxStartX: startX,
                boxStartY: startY,
                boxEndX: endX,
                boxEndY: endY,
                color: defaultColor
            };

            context.fillRect(startX, startY, boxWidth, boxHeight);
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



/********  EVENT HANDLERS *******/
function setupEventHandlers(globalVars) {

    startMouseEventHandler(globalVars);
    resizedWindowHandler(globalVars);
    toolboxSelectionHandler(globalVars);
    saveDeleteLoadHandler(globalVars);

}

function startMouseEventHandler(globalVars) {

    var isMouseDown = false;

    var canvas = globalVars.getCanvas();

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
        if (globalVars.getDebugStatus()) {
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
        var grid = globalVars.getGridProp().grid;

        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                var boxStartX = grid[row][col].boxStartX;
                var boxEndX = grid[row][col].boxEndX;

                var boxStartY = grid[row][col].boxStartY;
                var boxEndY = grid[row][col].boxEndY;

                if (mouseX >= boxStartX && mouseX <= boxEndX && mouseY >= boxStartY && mouseY <= boxEndY) {
                    var newColor = globalVars.getColorPicker().color.hexString;
                    if (grid.color !== newColor) globalVars.setGridColor(row, col, newColor);

                    lastColoredRow = row;
                    lastColoredCol = col;

                    lastBoxStartX = boxStartX;
                    lastBoxEndX = boxEndX;

                    lastBoxStartY = boxStartY;
                    lastBoxEndY = boxEndY;
                    break;

                }

            }
        }

    }



    function updateExtraMouseDebugInfo() {
        if (globalVars.getDebugStatus()) {
            $('#debug-mouseX-canvas').text("(Canvas)Mouse X: " + mouseX + "px");
            $('#debug-mouseY-canvas').text("(Canvas)Mouse Y: " + mouseY + "px");
            $('#debug-row-col-canvas').text("(Canvas)Clicked: (Row: " + lastColoredRow + ", Col: " + lastColoredCol + ")");
            console.log("(Canvas)Clicked: (Row: ", lastColoredRow, ", Col: ", lastColoredCol, ")");
            console.log(" (Canvas)Mouse X: ", mouseX, "\n", "(Canvas)Mouse Y: ", mouseY);
        }
    }

}


function resizedWindowHandler(globalVars) {

    var canvas = globalVars.getCanvas();
    var win = $(window);

    $(window).on("resize", windowWasResized);

    function windowWasResized(event) {
        var windowHeight = win.height();
        var canvasOffsetTop = canvas.offset().top;
        var canvasOuterHeight = canvas.outerHeight();
        var canvasOuterHeightWithMargin = canvas.outerHeight(true);

        var marginSize = Math.abs(canvasOuterHeightWithMargin - canvasOuterHeight);

        //canvas.outerHeight(windowHeight - canvasOffsetTop - marginSize);
        globalVars.updateGrid();
        globalVars.getColorPicker().resize($("#color-picker").width());
        console.log("window resized\n colorPicker div width", $("#color-picker").width(), "\n grid width", $("#grid-div").width());

    }

    function recalculateGridDim() {

    }
}


function toolboxSelectionHandler(globalVars) {
    var toolbox = $(".toolbox");

    var color = $("#color");
    var colorAllBlank = $("#color-all-blank");
    var colorAll = $("#color-all");
    var addEffects = $("#add-effects");
    var eraser = $("#eraser");
    var clearAll = $("#clear-all");



    color.on("click", colorMode);
    colorAllBlank.on("click", colorAllBlankMode);
    colorAll.on("click", colorAllMode);
    addEffects.on("click", addEfects);
    eraser.on("click", eraserMode);
    clearAll.on("click", clearAll);

    function colorMode(event) {
        globalVars.setMode("color");

        updateNewActiveElem(color);
    }

    function colorAllBlankMode(event) {
        var grid = globalVars.getGridProp().grid;
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                if (grid[row][col].color === globalVars.getDefaultColor()) globalVars.setGridColor(row, col, globalVars.getColorPicker().color.hexString);
            }
        }
    }

    function colorAllMode(event) {
        fillAll(globalVars.getColorPicker().color.hexString);
    }

    function addEfects(event) {
        console.log("add effects clicked function not implemented");
    }

    function eraserMode(event) {
        globalVars.setMode("eraser");

        updateNewActiveElem(eraser);
    }

    function clearAll(event) {
        fillAll(globalVars.getDefaultColor());
    }

    function fillAll(newColor) {
        var grid = globalVars.getGridProp().grid;
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                globalVars.setGridColor(row, col, newColor);
            }
        }
    }

    function updateNewActiveElem(element) {
        toolbox.find(".active").removeClass("active");
        element.addClass("active");
    }
}


function saveDeleteLoadHandler(globalVars) {

}