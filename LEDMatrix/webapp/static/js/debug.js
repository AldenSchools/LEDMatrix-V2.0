"use strict"
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
    var htmlelements = Object.values(htmlelementsObject);

    var debugBox = $('<div>', { "class": "debug-box d-block" });

    debugBox.css({
        "background": "lightblue",
        "border": "10px solid rgba(255, 0, 0, 0.4)",
        "position": "absolute",
        "z-index": "9",
        "width": "250"
    });
    var debugBoxTitleDiv = $('<div>', { class: "font-weight-bold", id: "debug-title" }).text("DEBUG");
    debugBoxTitleDiv.css("text-align", "center");
    debugBox.append(debugBoxTitleDiv);




    for (var i = 0; i < htmlelements.length; i++) {
        debugBox.append(htmlelements[i]);
    }


    $("body").prepend(debugBox);

    //dragElement(debugBox);
    debugBox.draggable();
}

function debugInfo(debugMessage, globalVars) {
    console.log(debugMessage +
        "\nGrid Width = " + globalVars.gridProp.gridWidth +
        "\nGrid Heigt = " + globalVars.gridProp.gridHeight +
        "\nBoxes Per Grid Row = " + globalVars.gridProp.boxesPerRow +
        "\nBoxes Per Grid Column = " + globalVars.gridProp.boxesPerCol +
        "\nBox With = " + globalVars.gridProp.boxWidth +
        "\nBox Height = " + globalVars.gridProp.boxHeight +
        "\nGrid Data Structure: ");
    console.log(globalVars.gridProp.grid);


    //var elem1 = $('<p>', { class: "my-1 font-weight-bold" }).text("Mouse Down on Canvas = " + globalVars.isMouseDown());
    var elem2 = $('<p>', { class: "my-1 font-weight-bold" }).text("Grid Width = " + globalVars.gridProp.gridWidth);
    var elem3 = $('<p>', { class: "my-1 font-weight-bold" }).text("Grid Heigt = " + globalVars.gridProp.gridHeight);
    var elem4 = $('<p>', { class: "my-1 font-weight-bold" }).text("Boxes Per Grid Row = " + globalVars.gridProp.boxesPerRow);
    var elem5 = $('<p>', { class: "my-1 font-weight-bold" }).text("Boxes Per Grid Column = " + globalVars.gridProp.boxesPerCol);
    var elem6 = $('<p>', { class: "my-1 font-weight-bold" }).text("Box With = " + globalVars.gridProp.boxWidth);
    var elem7 = $('<p>', { class: "my-1 font-weight-bold" }).text("Box Height = " + globalVars.gridProp.boxHeight);
    var elem10 = $('<p>', { id: "debug-mouseX", class: "my-1 font-weight-bold" }).text(" Mouse X = n/a");
    var elem11 = $('<p>', { id: "debug-mouseY", class: "my-1 font-weight-bold" }).text(" Mouse Y = n/a");
    var elem12 = $('<p>', { id: "debug-row-col", class: "my-1 font-weight-bold" }).text(" Clicked (Row = n/a, Col = n/a)");
    var elem15 = $('<p>', { id: "debug-color", class: "my-1 font-weight-bold" }).text(" Last box clicked color(hex) = " + globalVars.colorPicker.color.hexString);

    showDebugInfoOnPage({
        //peram1: elem1,
        peram2: elem2,
        peram3: elem3,
        peram4: elem4,
        peram5: elem5,
        peram6: elem6,
        peram7: elem7,
        // peram8: elem8,
        // peram9: elem9,
        peram10: elem10,
        peram11: elem11,
        peram12: elem12,
        // peram13: elem13,
        // peram14: elem14,
        peram15: elem15
    });



}


/** 
 * This section of code is originally from modifies to fit my needs 
 * https://www.kirupa.com/html5/drag.htm
 * */
function dragElement(element) {


    var elementChildren = element.find('*');

    var dragActive = false;

    var mouseX;
    var mouseY;
    var startMouseX;
    var startMouseY;
    var offsetX = 0;
    var offsetY = 0;

    element.mousedown(dragStart);
    //container.touchstart(dragStart);

    element.mousemove(drag);
    //container.touchmove(drag);

    element.mouseup(dragEnd);
    //container.touchEnd(dragEnd);

    element.mouseout(dragEnd);


    function dragStart(event) {
        event = event || window.event;
        //event.preventDefault();

        // get the mouse cursor position at startup:
        if (event.type === "mousedown") {
            startMouseX = event.clientX - offsetX;
            startMouseY = event.clientY - offsetY;
            console.log("mousedown");
        } else {
            //startMouseX = event.touches[0].clientX - offsetX;
            //startMouseY = event.touches[0].clientY - offsetY;
        }

        elementChildren.attr("unselectable", "on");
        elementChildren.onselectstart = false;
        elementChildren.mousedown = false;





        dragActive = true;
        console.log(dragActive);
    }

    function drag(event) {
        // event = event || window.event;
        //event.preventDefault();

        // calculate the new cursor position:
        console.log(dragActive);
        if (dragActive) {

            if (event.type === "mousemove") {
                mouseX = event.clientX - startMouseX;
                mouseY = event.clientY - startMouseY;
                console.log("dragging");
            } else {
                //mouseX = event.touches[0].clientX - startMouseX;
                //mouseY = event.touches[0].clientY - startMouseY;
            }

            offsetX = mouseX;
            offsetY = mouseY;

            var transform = "translate3d(" + mouseX + "px, " + mouseY + "px, 0)";
            element.css("transform", transform);


        }



        // set the element's new position:

    }

    function dragEnd() {
        // stop moving when mouse button is released:
        startMouseX = mouseX;
        startMouseY = mouseY;

        dragActive = false;
        console.log("end drag");
        console.log(dragActive);

        elementChildren.attr("unselectable", "off");
        elementChildren.onselectstart = true;
        elementChildren.mousedown = true;

    }
}