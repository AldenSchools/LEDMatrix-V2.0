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

    var globalVars = {
        colorPickerGlobals: colorPickerGlobalVars,
        gridGlobals: gridGlobalVars,
        controlGlobals: controlGlobalVars,
        debug: _debug
    };


    setupEventHandlers(globalVars);


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
        console.log(context);
    }

});






/********  EVENT HANDLERS *******/
function setupEventHandlers(globalVars) {

    mouseOnGridEventHandler(globalVars, );
    resizedWindowHandler(globalVars);
    toolboxSelectionHandler(globalVars);
    saveDeleteLoadHandler(globalVars);

}


function resizedWindowHandler(globalVars) {

    var win = $(window);

    $(window).on("resize", windowWasResized);

    function windowWasResized(event) {

        //canvas.outerHeight(windowHeight - canvasOffsetTop - marginSize);
        globalVars.getGridGlobalVars().updateGrid();
        globalVars.getColorPicker().resize($("#color-picker").width());
        console.log("window resized\n colorPicker div width", $("#color-picker").width(), "\n grid width", $("#grid-div").width());

    }
}