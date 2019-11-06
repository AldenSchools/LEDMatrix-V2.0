$(function() {

    var gridWidth = 800;
    var gridHeight = 800;
    var boxesPerRow = 16;
    var boxesPerCol = 16;
    var gridLineWidth = 5;
    var initialColor = '#4c4c4c';
    var _debug = false;

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