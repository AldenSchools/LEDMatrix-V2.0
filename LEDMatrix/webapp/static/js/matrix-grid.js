$(function() {

});

/**
 * Sets up all the global variables/functions that any pice of code might need in relation to the grid/matrix.
 * The way that I have set this up is making this function act like a class with getters and setters and some other
 * useful function/methods that you can use when you are dealing with anything regarding the grid/matrix.
 * 
 * @param {Object} canvas The actual canvas element on the html  
 * @param {Number} suggestedGridWidth How wide you would like the grid/matrix to appear, it will try to make it that way if it can 
 * @param {Number} suggestedGridHeight How tall you want the grid/matrix to appear (currently it takes the value of the grid width so you can put anything it wont affect anything ) 
 * @param {Number} boxesPerRow Number of boxes you want in each row (for our purposes its 16)
 * @param {Number} boxesPerCol The number of boxes you want in each coloumn (for our purposes its 16)
 * @param {Number} gridLineWidth The thickness you want the little black line that seperates each box to be (you can change its color too!)    
 * @param {String} initColor  The initial color that you want each box to have when you render the canvas on the page. ex "#AABBCC"
 * 
 * @return {Object} Useful function/methods that you can use when you are dealing with anything regarding the grid/matrix.
 * 
 *  
 */
function initGridGlobals(canvas, suggestedGridWidth, suggestedGridHeight, boxesPerRow, boxesPerCol, gridLineWidth, initColor) {
    if (canvas.length === 0) return undefined;

    var gridWidth = (suggestedGridWidth === undefined) ? 800 : suggestedGridWidth;
    gridWidth = (gridWidth > $("#grid-div").width()) ? $("#grid-div").width() : gridWidth;
    //gridHeight = (gridHeight === undefined) ? gridWidth : gridHeight;
    gridHeight = gridWidth;




    canvas.attr({ width: gridWidth, height: gridHeight });

    var context = canvas.get(0).getContext("2d");

    var boxWidth = (gridWidth / boxesPerRow) - gridLineWidth;
    var boxHeight = (gridHeight / boxesPerCol) - gridLineWidth;

    var grid = createGridDataStruct(boxesPerRow, boxesPerCol, initColor);

    drawGrid(context, gridWidth, gridHeight, boxWidth, boxHeight, gridLineWidth);
    calculateGridDims();


    function getCanvas() { return canvas; }

    function getGrid() { return grid; }

    function getWidth() { return gridWidth; }

    function getHeight() { return gridHeight; }

    function getBoxesPerRow() { return boxesPerRow; }

    function getBoxesPerCol() { return boxesPerCol; }

    function getBoxWidth() { return boxWidth; }

    function getBoxHeight() { return boxHeight; }

    function getGridLineWidth() { return gridLineWidth; }

    /**
     * Gets all of the colors currently in the grid and puts it in a really long string
     * 
     * @return {String} A string containing all RGB values for all LEDs in the matrix
     *  - the string looks something like '#FFFFFF#001122#ABCDEF ...'
     */
    function getGridDataAsString() {
        var dataAsString = "";
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                dataAsString += grid[row][col].color;
            }
        }

        return dataAsString;
    }


    /**
     * 
     * Call this function whenever you want to change the color of a specific box/LED in the 
     * matrix.
     * 
     * @param {Number} row The row number the specific box is in 
     * @param {Number} col  The column number the specific box is in
     * @param {String} newColor The color you want to change the box to, ex. '#ABCDEF'
     *
     */
    function setGridColor(row, col, newColor) {
        if (grid[row][col].color === newColor) return;

        grid[row][col].color = newColor;

        context.clearRect(grid[row][col].boxStartX, grid[row][col].boxStartY, boxWidth, boxHeight);

        context.fillStyle = newColor;
        context.fillRect(grid[row][col].boxStartX, grid[row][col].boxStartY, boxWidth, boxHeight);

    }

    /**
     * 
     * Covers all boxes/LEDs with the color given 
     * 
     * @param {String} color The color you want to change all boxes/LEDs to, ex. '#ABCDEF'
     *
     */
    function fillGrid(color) {
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                setGridColor(row, col, color);
            }
        }
    }

    /**
     * 
     * Loads specific colors to each box/LED 
     * 
     * @param {Array} drawingData This is a 2D array containing all of the colors for each box
     *  -each row and column corespond to a row and column in the grid/matrix. a color is of the form 
     *  '#AABBCC' to represent any RGB value.
     *
     */
    function loadDrawingToGrid(drawingData) {
        for (var row = 0; row < drawingData.length; row++) {
            for (var col = 0; col < drawingData[row].length; col++) {
                setGridColor(row, col, drawingData[row][col]);
            }
        }
    }

    /**
     * 
     * Redraws the canvas on the page and recalculaes the canvas positon on the page. 
     * This function is usually called when the size of the window has changed.
     */
    function updateGrid() {

        gridWidth = (suggestedGridWidth === undefined) ? 800 : suggestedGridWidth;
        gridWidth = (gridWidth > $("#grid-div").width()) ? $("#grid-div").width() : gridWidth;
        gridHeight = gridWidth;
        //if (gridHeight === undefined) trueGridHeight = gridWidth;

        canvas.attr({ width: gridWidth, height: gridHeight });

        boxWidth = (gridWidth / boxesPerRow) - gridLineWidth;
        boxHeight = (gridHeight / boxesPerCol) - gridLineWidth;

        console.log("recalculating start positions for each box in grid");

        drawGrid(context, gridWidth, gridHeight, boxWidth, boxHeight, gridLineWidth);
        calculateGridDims();

    }

    /**
     * 
     * Recalculates the grid dimentions does not alter the canvas on the page but 
     * changes the values in the grid data structure used to render the canvas
     * 
     */
    function calculateGridDims() {
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
    }



    return {
        getCanvas: getCanvas,
        getGrid: getGrid,
        getWidth: getWidth,
        getHeight: getHeight,
        getBoxesPerRow: getBoxesPerRow,
        getBoxesPerCol: getBoxesPerCol,
        getBoxWidth: getBoxWidth,
        getGridDataAsString: getGridDataAsString,
        getBoxHeight: getBoxHeight,
        getGridLineWidth: getGridLineWidth,
        setGridColor: setGridColor,
        fillGrid: fillGrid,
        loadDrawingToGrid: loadDrawingToGrid,
        updateGrid: updateGrid,
        calculateGridDims: calculateGridDims

    };
}







/**
 * Draws a 2d grid on the canvas and displays it on the page for the user to see
 * 
 * @param {Object} context The drawing context, used to draw on a canvas (like a paint brush)
 * @param {Number} gridWidth How wide the grid/matrix is
 * @param {Number} gridHeight How tall the grid/matrix is
 * @param {Number} boxWidth How wide each individual box is
 * @param {Number} boxHeight How high each individual box is
 * @param {Number} gridLineWidth How thick the little black line that seperates each box is
 */
function drawGrid(context, gridWidth, gridHeight, boxWidth, boxHeight, gridLineWidth) {
    context.clearRect(0, 0, gridWidth, gridHeight)

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
 * Creates and initializes a 2D array data structure to store values related to the canvas  
 * consiting of the beggining x and y mouse cordinates for each box and its color.
 * 
 * @param {Number} numRows The numner of rows for our 2d array.
 * @param {Number} numCols The numner of columns for our 2d array.
 * @param {String} initColor The inital color that each canvas starts with. ex. "#AABBCC"
 */
function createGridDataStruct(numRows, numCols, initColor) {

    var grid = [];
    for (var row = 0; row < numRows; row++) {
        grid[row] = [];
        for (var col = 0; col < numCols; col++) {

            grid[row][col] = {
                boxStartX: -1,
                boxStartY: -1,
                boxEndX: -1,
                boxEndY: -1,
                color: initColor
            };

        }
    }

    return grid;
}







/**
 * This function handles the event where the mouse is on the canvas/grid/matrix
 * 
 * @param {Object} globalVars All global variables 
 *   - 'globalVars.colorPickerVars':  accesses all global variables/functions assosiated with the color picker
 *   - 'globalVars.gridVars':         accesses all global variables/functions assosiated with the matrix grid
 *   - 'globalVars.controlVars':      accesses all global variables/functions assosiated with website controls
 */
function mouseOnGridEventHandler(globalVars) {
    if (globalVars === undefined || globalVars.gridVars === undefined || globalVars.colorPickerVars === undefined) return;

    var isMouseDown = false;

    var canvas = globalVars.gridVars.getCanvas();

    var debug = globalVars.debug;

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



    /* Handles when you initally click on the canvas */
    function mouseDownOnGrid(event) {
        isMouseDown = true;

        mouseX = event.pageX - canvas.offset().left;
        mouseY = event.pageY - canvas.offset().top;

        colorCanvasOnMousePos();

        updateExtraMouseDebugInfo();
    }


    /* Handles when you move your mouse on or over the canvas */
    function mouseMoveOnGrid(event) {


        mouseX = event.pageX - canvas.offset().left;
        mouseY = event.pageY - canvas.offset().top;

        var isInLastBox = mouseX >= lastBoxStartX && mouseX <= lastBoxEndX && mouseY >= lastBoxStartY && mouseY <= lastBoxEndY;
        if (lastBoxStartX === -1 && lastBoxStartY === -1 && lastBoxEndX === -1 && lastBoxEndY === -1) isInLastBox = false;

        if (isMouseDown && !isInLastBox) colorCanvasOnMousePos();

        updateExtraMouseDebugInfo();
    }

    /* Handles when you release a mouse click on the canvas */
    function mouseUpOnGrid(event) {
        if (isMouseDown) isMouseDown = false;
        lastBoxStartX = -1;
        lastBoxEndX = -1;
        lastBoxStartY = -1;
        lastBoxEndY = -1;

    }

    /* Handles when you move youe mouse out of the canvas view */
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


    /* Colors the canvas on that specific area where the mouse is */
    function colorCanvasOnMousePos() {
        var grid = globalVars.gridVars.getGrid();

        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                var boxStartX = grid[row][col].boxStartX;
                var boxEndX = grid[row][col].boxEndX;

                var boxStartY = grid[row][col].boxStartY;
                var boxEndY = grid[row][col].boxEndY;

                if (mouseX >= boxStartX && mouseX <= boxEndX && mouseY >= boxStartY && mouseY <= boxEndY) {
                    var newColor = globalVars.colorPickerVars.getColorPicker().color.hexString;
                    var mode = globalVars.colorPickerVars.getMode();

                    if (mode === "color") globalVars.gridVars.setGridColor(row, col, newColor);
                    else if (mode === "eraser") globalVars.gridVars.setGridColor(row, col, globalVars.colorPickerVars.getDefaultColor());

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

    /* Debug stuff */
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