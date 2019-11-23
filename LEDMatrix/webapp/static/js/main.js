/**
 * Author: LEDMatrix Team - 2019
 * Description: Originally created for Alden schools
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this 
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ .
 * 
 * */


//
"use strict"


/**
 * Waits till the page to load 
 * this is important because we dont want to manipulate 
 * a html element if it does not yet exist.
 * 
 * Some common ways to do this are: 
 * 		$(function() { ... });   -- what is done here
 * 	or
 * 		$(document).ready(function() { ... });
 *  or
 *      $(document).ready(someFunctionName);
 *      ...
 *      someFunctionName(jQuery){ ... }
 * 		
 * The function below is the entry point of our program think of it as the main function.
 * It defines some configuration variables such as debug some others you can change depending your needs.
 * Also, this function stores all global variables that you might need. If you need to add a custom global 
 * variable add it to the 'globalVars' variable it is a javascript object (think of it as a python dictonary or map).
 * If you create a function that needs to use one of these global variables then you must call it in this main function 
 * or inside another function that was called in this main function then you can pass it the 'globalVars' variable. 
 * 
 * 
 * The reason for this design is because creating true global variables in javascript is bad practice as it can be overritten 
 * from another file or you could overwrite some other variable with the same name as the one you created. The method that I chose 
 * to use is called a javascript "closure" and it is the recommended way of handling variables you want any oject/function to access.
 * 
 * 
 * 
 */
$(function() {


    //The variables below
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
    adminOptionsCurrentlyActive();


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

/**
 * Sets up all event event handlers 
 * 
 * @param {Object} globalVars All global variables 
 *   - 'globalVars.colorPickerVars':  accesses all global variables/functions assosiated with the color picker
 *   - 'globalVars.gridVars':         accesses all global variables/functions assosiated with the matrix grid
 *   - 'globalVars.controlVars':      accesses all global variables/functions assosiated with website controls
 */
function setupEventHandlers(globalVars) {

    mouseOnGridEventHandler(globalVars);
    resizedWindowHandler(globalVars);
    toolboxSelectionHandler(globalVars);
    drawingFormControlHandler(globalVars);
    adminFormControlHandler(globalVars);
    getDrawingHandler(globalVars);
}



/**
 * This function handles the event where the window is resized
 * when that happend we need to recalculate the canvas dimentions
 * 
 * @param {Object} globalVars All global variables 
 *   - 'globalVars.colorPickerVars':  accesses all global variables/functions assosiated with the color picker
 *   - 'globalVars.gridVars':         accesses all global variables/functions assosiated with the matrix grid
 *   - 'globalVars.controlVars':      accesses all global variables/functions assosiated with website controls
 */
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

function getDrawingHandler(globalVars) {

    if ($("#drawing-name-text").length === 0) return;

    console.log("getDrawingHandler");
    setInterval(getCurrShowingDrawing, 2000);

    function getCurrShowingDrawing(event) {
        $.ajax({
            type: "GET",
            url: $("#curr-drawing-url").attr("get-current-drawing-url"),
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data.success) {
                    $("#drawing-name-text").text(data.drawing_name);
                    $("#drawing-author-text").text(data.username);
                    globalVars.gridVars.loadDrawingToGrid(data.drawing_matrix);
                }
            }
        });
    }
}




/*************OTHER STUFF ********/

/**
 * Provides a easy way to display error messages and other useful information 
 * to the user. It just activates an element already in the html with custom text.
 * Call this function whenever you need display some information to the user.
 * 
 * @param {String} modalTitle The title of the message 
 * @param {String} modalText  A short description of the message
 * @param {Boolean} showOkBtn Weather or not to also display an OK button (default is Close and OK buttons together)
 * 
 *  
 */
function displayInfoModal(modalTitle, modalText, showOkBtn) {
    $("#info-modal-title").text(modalTitle);
    $("#modal-info-text").text(modalText);

    if (showOkBtn) $("#modal-ok-btn").removeClass("d-none");
    else $("#modal-ok-btn").addClass("d-none");

    $("#info-modal").modal('show');
}


/**
 * Handles the event where a option on the admin options list is selected.
 * All it does is that it changes which option is highlighted/active(the blue highlight around a box) depending on what
 * option the admin clicked.
 */
function adminOptionsCurrentlyActive() {
    var adminOptionsList = $("#admin-options-list");
    if (adminOptionsList.length === 0) return;

    var listItem = adminOptionsList.find(".list-group-item");

    listItem.click(setActiveListItem);

    function setActiveListItem(event) {
        adminOptionsList.find("li.active").removeClass("active");
        console.log($(this));
        $(event.target).addClass("active");
    }
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