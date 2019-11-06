$(function() {

});


function initGridGlobals(canvas, gridWidth, gridHeight, boxesPerRow, boxesPerCol, gridLineWidth, initColor) {


    gridWidth = (gridWidth === undefined) ? 800 : gridWidth;
    gridHeight = (gridHeight === undefined) ? gridWidth : gridHeight;
    gridHeight = gridWidth;

    gridWidth = (gridWidth > $("#grid-div").width()) ? $("#grid-div").width() : gridWidth;


    canvas.attr({ width: gridWidth, height: gridHeight });

    var context = canvas.get(0).getContext("2d");

    var boxWidth = (gridWidth / boxesPerRow) - gridLineWidth;
    var boxHeight = (gridHeight / boxesPerCol) - gridLineWidth;

    var grid = createGridDataStruct(boxesPerRow, boxesPerCol);

    drawGrid(context, gridWidth, gridHeight, boxWidth, boxHeight, gridLineWidth);
    calculateGridDims(initColor);


    function getCanvas() { return canvas; }

    function getGrid() { return grid; }

    function getWidth() { return gridWidth; }

    function getHeight() { return gridHeight; }

    function getBoxesPerRow() { return boxesPerRow; }

    function getBoxesPerCol() { return boxesPerCol; }

    function getBoxWidth() { return boxWidth; }

    function getBoxHeight() { return boxHeight; }

    function getGridLineWidth() { return gridLineWidth; }


    function setGridColor(row, col, newColor) {

        grid[row][col].color = newColor;

        context.clearRect(grid[row][col].boxStartX, grid[row][col].boxStartY, boxWidth, boxHeight);

        context.fillStyle = newColor;
        context.fillRect(grid[row][col].boxStartX, grid[row][col].boxStartY, boxWidth, boxHeight);

    }

    function updateGrid() {


        gridWidth = $("#grid-div").width();
        if (gridHeight === undefined) trueGridHeight = gridWidth;

        canvas.attr({ width: gridWidth, height: gridHeight });

        boxWidth = (gridWidth / boxesPerRow) - gridLineWidth;
        boxHeight = (gridHeight / boxesPerCol) - gridLineWidth;

        console.log("recalculating start positions for each box in grid");
        //drawGrid();

        drawGrid(context, gridWidth, gridHeight, boxWidth, boxHeight, gridLineWidth);
        calculateGridDims(_);

    }

    function calculateGridDims(fillColor) {
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

                if (fillColor !== undefined) context.fillColor = fillColor;
                else context.fillStyle = grid[row][col].color;

                context.fillRect(startX, startY, boxWidth, boxHeight);

            }
        }
    }

    return {
        getCanvas: getCanvas,
        getGrid: getGrid,
        getWidth: getWidth,
        getHeight: getHeight,
        getBoxesPerRow: getBoxesPerRow,
        getBoxesPerCol: getBoxesPerCol,
        getBoxWidth: getBoxWidth,
        getBoxHeight: getBoxHeight,
        getGridLineWidth: getGridLineWidth,
        setGridColor: setGridColor,
        updateGrid: updateGrid,
        calculateGridDims: calculateGridDims

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
function drawGrid(context, gridWidth, gridHeight, boxWidth, boxHeight, gridLineWidth) {
    context.clearRect(0, 0, gridWidth, gridHeight)

    //used to calculate the width and height of each box in the grid given the total height and with of our grid. 

    /*creates 'boxesPerRow + 1' vertical lines each having a witdth of boxWidth,
      each iteration we move by one 'boxWidth' unit to the right.*/
    for (var x = 0; x <= gridWidth; x += boxWidth + gridLineWidth) {
        context.moveTo(x, 0);
        context.lineTo(x, gridHeight);
    }

    /*creates 'boxesPerCol + 1' Horozontal lines each having a height of boxHeight,
      each iteration we move by one 'boxHeight' unit down. */
    for (var y = 0; y <= gridHeight; y += boxHeight + gridLineWidth) {
        context.moveTo(0, y);
        context.lineTo(gridWidth, y);
    }
    context.moveTo(gridWidth, 0);
    context.lineTo(gridWidth, gridHeight);

    //Chooses a color for the lines and then actually draws them to the canvas
    context.strokeStyle = "black";
    context.lineWidth = gridLineWidth;
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
function createGridDataStruct(numRows, numCols) {

    var grid = [];
    for (var row = 0; row < numRows; row++) {
        grid[row] = [];
        for (var col = 0; col < numCols; col++) {

            grid[row][col] = {
                boxStartX: -1,
                boxStartY: -1,
                boxEndX: -1,
                boxEndY: -1,
                color: ""
            };

        }
    }

    return grid;
}








function mouseOnGridEventHandler(globalVars) {

    var isMouseDown = false;

    var canvas = globalGridVars.getCanvas();

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

        colorCanvasOnMousePos();

        updateExtraMouseDebugInfo();
    }



    function mouseMoveOnGrid(event) {


        mouseX = event.pageX - canvas.offset().left;
        mouseY = event.pageY - canvas.offset().top;

        var isInLastBox = mouseX >= lastBoxStartX && mouseX <= lastBoxEndX && mouseY >= lastBoxStartY && mouseY <= lastBoxEndY;
        if (lastBoxStartX === -1 && lastBoxStartY === -1 && lastBoxEndX === -1 && lastBoxEndY === -1) isInLastBox = false;

        if (isMouseDown && !isInLastBox) colorCanvasOnMousePos();

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
        if (debug) {
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
        var grid = globalGridVars.getGrid();

        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                var boxStartX = grid[row][col].boxStartX;
                var boxEndX = grid[row][col].boxEndX;

                var boxStartY = grid[row][col].boxStartY;
                var boxEndY = grid[row][col].boxEndY;

                if (mouseX >= boxStartX && mouseX <= boxEndX && mouseY >= boxStartY && mouseY <= boxEndY) {
                    var newColor = colorPicker.color.hexString;
                    if (grid.color !== newColor) globalGridVars.setGridColor(row, col, newColor);

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
        if (debug) {
            $('#debug-mouseX-canvas').text("(Canvas)Mouse X: " + mouseX + "px");
            $('#debug-mouseY-canvas').text("(Canvas)Mouse Y: " + mouseY + "px");
            $('#debug-row-col-canvas').text("(Canvas)Clicked: (Row: " + lastColoredRow + ", Col: " + lastColoredCol + ")");
            console.log("(Canvas)Clicked: (Row: ", lastColoredRow, ", Col: ", lastColoredCol, ")");
            console.log(" (Canvas)Mouse X: ", mouseX, "\n", "(Canvas)Mouse Y: ", mouseY);
        }
    }

}