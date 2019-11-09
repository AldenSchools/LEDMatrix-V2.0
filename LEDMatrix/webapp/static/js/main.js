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


    var _debug = false;

    var canvas = $("#led-matrix-grid");

    var gridWidth = 800;
    var gridHeight = 800;
    var boxesPerRow = 16;
    var boxesPerCol = 16;
    var gridLineWidth = 5;
    var defaultColor = "#4c4c4c";


    var colorPickerGlobalVars = initColorPickerGlobals(defaultColor);
    var gridGlobalVars = initGridGlobals(canvas, gridWidth, gridHeight, boxesPerRow, boxesPerCol, gridLineWidth, defaultColor);
    var controlGlobalVars = initControlGlobals();


    // if (typeof initColorPickerGlobals === "function") 
    // if (typeof initGridGlobals === "function") 
    // if (typeof initControlGlobals === "function") 


    var globalVars = {
        colorPickerVars: colorPickerGlobalVars,
        gridVars: gridGlobalVars,
        controlVars: controlGlobalVars,
        debug: _debug
    };


    setupEventHandlers(globalVars);


    if (_debug) {

        var debugInfo = function() {

            var colorPickerColor = (colorPickerGlobalVars === undefined) ? "n/a" : colorPickerGlobalVars.getColorPicker().color.hexString;
            var colorPickerMode = (colorPickerGlobalVars === undefined) ? "n/a" : colorPickerGlobalVars.getMode();

            var trueWidth = (gridGlobalVars === undefined) ? "n/a" : gridGlobalVars.getWidth();
            var trueHeight = (gridGlobalVars === undefined) ? "n/a" : gridGlobalVars.getHeight();
            var boxesPerRow = (gridGlobalVars === undefined) ? "n/a" : gridGlobalVars.getBoxesPerRow();
            var boxesPerCol = (gridGlobalVars === undefined) ? "n/a" : gridGlobalVars.getBoxesPerCol();
            var boxWidth = (gridGlobalVars === undefined) ? "n/a" : gridGlobalVars.getBoxWidth();
            var boxHeight = (gridGlobalVars === undefined) ? "n/a" : gridGlobalVars.getBoxHeight();

            return {
                "Color Picker: ": colorPickerColor,
                "Default Color: ": defaultColor,
                "Mode: '": +colorPickerMode + "'",
                "Grid Width: ": trueWidth,
                "Grid Height: ": trueHeight,
                "Boxes per rows: ": boxesPerRow,
                "boxes per column: ": boxesPerCol,
                "Box width: ": boxWidth,
                "Box height: ": boxHeight
            };
        };

        var extraDebugInfo = extraDebugInfoManual();

        var debug = initDebug(debugInfo);
        debug.extraDebugInfoOnPageManualTrack(extraDebugInfo);

        if (gridGlobalVars !== undefined) console.log(" Grid: ", gridGlobalVars.getGrid());
    }

});






/********  EVENT HANDLERS *******/
function setupEventHandlers(globalVars) {

    mouseOnGridEventHandler(globalVars);
    resizedWindowHandler(globalVars);
    toolboxSelectionHandler(globalVars);
    saveDeleteLoadHandler(globalVars);
    loginRegisterModalsHandler();

}


function resizedWindowHandler(globalVars) {

    var gridVars = globalVars.gridVars;
    var colorPickerVars = globalVars.colorPickerVars;



    $(window).on("resize", windowWasResized);

    function windowWasResized(event) {

        //canvas.outerHeight(windowHeight - canvasOffsetTop - marginSize);
        gridVars.updateGrid();
        colorPickerVars.setWidth($("#color-picker").width());
        console.log("window resized\n colorPicker div width", $("#color-picker").width(), "\n grid width", $("#grid-div").width());

    }
}


function loginRegisterModalsHandler() {



}








/********  DEBUG STUFF *******/

function populateDebugInfo(globalVars) {
    var gridVars = globalVars.gridVars;
    var colorPickerVars = globalVars.colorPickerVars;

}

function extraDebugInfoManual() {
    var pElem1 = $('<p>', { id: "debug-mouseX-canvas", class: "my-1 font-weight-bold" }).text("(Canvas)Mouse X: n/a");
    var pElem2 = $('<p>', { id: "debug-mouseY-canvas", class: "my-1 font-weight-bold" }).text("(Canvas)Mouse Y: n/a");
    var pElem3 = $('<p>', { id: "debug-row-col-canvas", class: "my-1 font-weight-bold" }).text("(Canvas)Clicked: (Row: n/a, Col: n/a)");

    return [pElem1, pElem2, pElem3];
}