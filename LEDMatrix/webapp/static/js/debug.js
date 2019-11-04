"use strict"
$(function() {

});

function showDebugInfo(debugInfoObjFunc) {

    var debugInfoObj = debugInfoObjFunc();

    var debugBox = createDebugBox();

    var debugText = Object.keys(debugInfoObj);
    var debugVars = Object.values(debugInfoObj);

    var watchVars = updateWatchVars();


    showDebugInfoOnPage();
    showDebugInfoOnConsole("Initial");
    extraDebugInfoOnPage();
    extraDebugInfoOnConsole();


    function showDebugInfoOnPage() {

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

    function createDebugBox() {
        var debugBox = $('<div>', { "class": "debug-box d-block" });

        debugBox.css({
            "background": "lightblue",
            "border": "10px solid rgba(255, 0, 0, 0.4)",
            "position": "absolute",
            "z-index": "9",
            "width": "250"
        });
        var debugBoxTitle = $('<div>', { class: "", id: "debug-title-div" });
        var title = $('<h4>', { class: "font-weight-bold", id: "debug-title" }).text("DEBUG BOX");
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

    function updateWatchVars() {
        var watchVars = [];
        for (var i = 0; i < debugVars.length; i++) {
            var x = debugVars[i];
            watchVars[i] = x;
        }
        return watchVars;
    }

    function refreshVars() {
        debugInfoObj = debugInfoObjFunc();
        debugText = Object.keys(debugInfoObj);
        debugVars = Object.values(debugInfoObj);
    }

    function refreshVarsOnPage() {
        //debugBox.remove('.debug-auto-gen');
        $(".debug-main-auto-gen").remove();
        showDebugInfoOnPage();
    }




    setInterval(intervalChange, 100);

    function intervalChange() {
        refreshVars();
        for (var i = 0; i < watchVars.length; i++) {
            if (watchVars[i] !== debugVars[i]) {
                watchVars[i] = debugVars[i];
                console.log("Variable '" + debugText[i] + "' changed to: ", debugVars[i]);
                refreshVarsOnPage();
            }
        }
    }


    function extraDebugInfoOnPage() {
        var pElem1 = $('<p>', { id: "debug-mouseX-canvas", class: "my-1 font-weight-bold" }).text("(Canvas)Mouse X: n/a");
        var pElem2 = $('<p>', { id: "debug-mouseY-canvas", class: "my-1 font-weight-bold" }).text("(Canvas)Mouse Y: n/a");
        var pElem3 = $('<p>', { id: "debug-row-col-canvas", class: "my-1 font-weight-bold" }).text("(Canvas)Clicked: (Row: n/a, Col: n/a)");
        $("#debug-box-extras").append(pElem1);
        $("#debug-box-extras").append(pElem2);
        $("#debug-box-extras").append(pElem3);
    }

    function extraDebugInfoOnConsole() {

    }


}