$(function() {
    var _watch = null;
    var test = null;
    setInterval(function() {
        if (_watch !== test) {
            _watch = test;
            console.log('Variable changed.', test);
        }
    }, 100);
});

function showDebugInfoOnPage(htmlelementsObject) {
    htmlelements = Object.values(htmlelementsObject);

    var debugBox = $('<div>', { "class": "debug-box d-block" });

    debugBox.css({
        "background": "rgba(0,0,255,0.3)",
        "border": "10px, solid, red",
        "position": "absolute",
        "z-index": "9",
    });




    for (var i = 0; i < htmlelements.length; i++) {
        debugBox.append(htmlelements[i]);
    }

    $("body").append(debugBox);
}

function test() {
    console.log("testing from debug.js ");
}

function debugInfo(debugMessage, globalVars) {
    console.log(debugMessage +
        "\nIs Mouse Down = " + globalVars.isMouseDown() +
        "\nGrid Width = " + globalVars.gridProp.gridWidth +
        "\nGrid Heigt = " + globalVars.gridProp.gridHeight +
        "\nBoxes Per Grid Row = " + globalVars.gridProp.boxesPerRow +
        "\nBoxes Per Grid Column = " + globalVars.gridProp.boxesPerCol +
        "\nBox With = " + globalVars.gridProp.boxWidth +
        "\nBox Height = " + globalVars.gridProp.boxHeight +
        "\nGrid Data Structure: ");
    console.log(globalVars.gridProp.grid);


    var elem1 = $('<p>', { class: "my-0" }).text("Is Mouse Down = " + globalVars.isMouseDown());
    var elem2 = $('<p>', { class: "my-0" }).text("Grid Width = " + globalVars.gridProp.gridWidth);
    var elem3 = $('<p>', { class: "my-0" }).text("Grid Heigt = " + globalVars.gridProp.gridHeight);
    var elem4 = $('<p>', { class: "my-0" }).text("Boxes Per Grid Row = " + globalVars.gridProp.boxesPerRow);
    var elem5 = $('<p>', { class: "my-0" }).text("Boxes Per Grid Column = " + globalVars.gridProp.boxesPerCol);
    var elem6 = $('<p>', { class: "my-0" }).text("Box With = " + globalVars.gridProp.boxWidth);
    var elem7 = $('<p>', { class: "my-0" }).text("Box Height = " + globalVars.gridProp.boxHeight);
    var elem8 = $('<br>');

    var elem9 = $('<p>', { class: "my-0" }).text("Matrix Grid (Canvas):");
    var elem10 = $('<p>', { id: "debug-mouseX", class: "my-0" }).text(" Mouse X = N/A");
    var elem11 = $('<p>', { id: "debug-mouseY", class: "my-0" }).text(" Mouse Y = N/A");
    var elem12 = $('<p>', { id: "debug-row-col", class: "my-0" }).text(" Clicked Pos (Row = N/A, Col = N/A)");
    var elem13 = $('<br>');
    var elem14 = $('<p>', { class: "my-0" }).text("Color Picker:");
    var elem15 = $('<p>', { id: "debug-color", class: "my-0" }).text(" Color of last colored box(hex) = " + globalVars.colorPicker.color.hexString);

    showDebugInfoOnPage({
        peram1: elem1,
        peram2: elem2,
        peram3: elem3,
        peram4: elem4,
        peram5: elem5,
        peram6: elem6,
        peram7: elem7,
        peram8: elem8,
        peram9: elem9,
        peram10: elem10,
        peram11: elem11,
        peram12: elem12,
        peram13: elem13,
        peram14: elem14,
        peram15: elem15
    });



}