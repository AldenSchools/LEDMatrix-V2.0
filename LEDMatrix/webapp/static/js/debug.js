/**
 * Author: Elwin Cabrera - 2019
 * Description: Originally created for Alden schools
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this 
 * file, You can obtain one at https://mozilla.org/MPL/2.0/ .
 * 
 * */

"use strict"
$(function() {

});

function initDebug(debugInfoObjFunc) {

    var debugInfoObj = debugInfoObjFunc();

    var debugBox = createDebugBox("DEBUG BOX");

    var debugText = Object.keys(debugInfoObj);
    var debugVars = Object.values(debugInfoObj);




    populateDebugBoxMain();
    showDebugInfoOnConsole("Initial");
    watchVariables(debugInfoObjFunc, repopulateElemsOnPage);


    function populateDebugBoxMain() {

        for (var i = 0; i < debugText.length; i++) {
            var pElem = $('<p>', { class: "my-1 font-weight-bold debug-main-auto-gen" }).text(debugText[i] + debugVars[i]);
            $("#debug-box-main").append(pElem)
        }

    }

    function showDebugInfoOnConsole(debugMessage) {

        console.log(debugMessage);
        for (var i = 0; i < debugText.length; i++) {
            console.log(debugText[i], debugVars[i]);
        }
        console.log("\n");
    }


    function extraDebugInfoOnPageManualTrack(elemList) {
        for (var i = 0; i < elemList.length; i++) {
            $("#debug-box-extras").append(elemList[i]);
        }
    }


    function repopulateElemsOnPage() {
        //debugBox.remove('.debug-auto-gen');
        $(".debug-main-auto-gen").remove();
        populateDebugBoxMain();
    }


    return { extraDebugInfoOnPageManualTrack: extraDebugInfoOnPageManualTrack };


}

function createDebugBox(debugBoxTitle) {
    var debugBox = $('<div>', { "class": "debug-box d-block" });

    debugBox.css({
        "background": "lightblue",
        "border": "10px solid rgba(255, 0, 0, 0.4)",
        "position": "absolute",
        "z-index": "9",
        "width": "250"
    });
    var debugBoxTitle = $('<div>', { class: "", id: "debug-title-div" });
    var title = $('<h4>', { class: "font-weight-bold", id: "debug-title" }).text(debugBoxTitle);
    title.css("text-align", "center");
    debugBoxTitle.append(title);

    var debugBoxMain = $('<div>', { class: "", id: "debug-box-main" });
    var debugBoxExtra = $('<div>', { class: "", id: "debug-box-extras" });


    debugBox.append(debugBoxTitle);
    debugBox.append(debugBoxMain);
    debugBox.append(debugBoxExtra);

    $("body").prepend(debugBox);
    debugBox.draggable();

    return debugBox;
}

function watchVariables(debugInfoObjFunc, onChangeActionFunc) {

    var debugInfoObj = debugInfoObjFunc();

    var debugText = Object.keys(debugInfoObj);
    var debugVars = Object.values(debugInfoObj);

    var watchVars = populateWatchVars();

    function populateWatchVars() {
        watchVars = [];
        for (var i = 0; i < debugVars.length; i++) {
            var x = debugVars[i];
            watchVars[i] = x;
        }
    }

    function getUpdatedVarsList() {
        debugInfoObj = debugInfoObjFunc();
        debugText = Object.keys(debugInfoObj);
        debugVars = Object.values(debugInfoObj);
    }


    setInterval(intervalChange, 100);

    function intervalChange() {
        getUpdatedVarsList();
        for (var i = 0; i < watchVars.length; i++) {
            if (watchVars[i] !== debugVars[i]) {
                watchVars[i] = debugVars[i];
                console.log("Variable '" + debugText[i] + "' changed to: ", debugVars[i]);
                onChangeActionFunc();
            }
        }
    }
}