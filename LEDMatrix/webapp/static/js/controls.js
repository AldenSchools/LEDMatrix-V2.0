$(function() {

});

function initControlGlobals() {

}


function toolboxSelectionHandler(globalVars) {

    var colorPickerVars = globalVars.colorPickerVars;
    var gridVars = globalVars.gridVars;

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
        globalVars.colorPickerVars.setMode("color");

        updateNewActiveElem(color);
    }

    function colorAllBlankMode(event) {
        var grid = gridVars.getGrid();
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                if (grid[row][col].color === colorPickerVars.getDefaultColor()) gridVars.setGridColor(row, col, colorPickerVars.getColorPicker().color.hexString);
            }
        }
    }

    function colorAllMode(event) {
        fillAll(colorPickerVars.getColorPicker().color.hexString);
    }

    function addEfects(event) {
        console.log("add effects clicked function not implemented");
    }

    function eraserMode(event) {
        colorPickerVars.setMode("eraser");

        updateNewActiveElem(eraser);
    }

    function clearAll(event) {
        fillAll(colorPickerVars.getDefaultColor());
    }

    function fillAll(newColor) {
        var grid = gridVars.getGrid();
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                gridVars.setGridColor(row, col, newColor);
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