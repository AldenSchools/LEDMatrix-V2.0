$(function() {

});

function initControlGlobals() {

}


function toolboxSelectionHandler(globalVars) {

    if (globalVars === undefined || globalVars.gridVars === undefined || globalVars.colorPickerVars === undefined) return;

    var colorPickerVars = globalVars.colorPickerVars;
    var gridVars = globalVars.gridVars;

    var toolbox = $(".toolbox");

    var color;
    var colorAllBlank;
    var colorAll;
    var addEffects;
    var eraser;
    var clearAll;

    if (toolbox) {
        color = $("#color");
        colorAllBlank = $("#color-all-blank");
        colorAll = $("#color-all");
        addEffects = $("#add-effects");
        eraser = $("#eraser");
        clearAll = $("#clear-all");

        color.on("click", colorMode);
        colorAllBlank.on("click", colorAllBlankMode);
        colorAll.on("click", colorAllMode);
        addEffects.on("click", addEfects);
        eraser.on("click", eraserMode);
        clearAll.on("click", clearGrid);

    }


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
        globalVars.gridVars.fillGrid(colorPickerVars.getColorPicker().color.hexString);
    }

    function addEfects(event) {
        console.log("add effects clicked function not implemented");
    }

    function eraserMode(event) {
        colorPickerVars.setMode("eraser");

        updateNewActiveElem(eraser);
    }

    function clearGrid(event) {
        globalVars.gridVars.fillGrid(colorPickerVars.getDefaultColor());

    }

    function updateNewActiveElem(element) {
        toolbox.find(".active").removeClass("active");
        element.addClass("active");
    }
}


function drawingControlsFormHandler(globalVars) {

    var loadForm = $("#load-drawing-form");
    var saveForm = $("#save-drawing-form");
    var deleteForm = $("#delete-drawing-form");
    var submitDrawingForm = $("#submit-drawing-form");
    var createDrawingForm = $("#new-drawing-form");


    loadForm.submit(loadDrawing);
    saveForm.submit(saveCurrentDrawing);
    deleteForm.submit(deleteCurrentDrawing);
    createDrawingForm.submit(createNewDrawing);
    submitDrawingForm.submit(submitDrawingForReview);




    function loadDrawing(event) {
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: loadForm.attr("data-handle-fetch-drawing-url"),
            data: loadForm.serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data.drawing_data);
                globalVars.gridVars.loadDrawingToGrid(data.drawing_data);
                //update current pic id on coresponding forms
                $("#save-drawing-id-input").attr("value", data.drawing_id);
                $("#submit-drawing-id-input").attr("value", data.drawing_id);
                $("#delete-drawing-id-input").attr("value", data.drawing_id);

                $("#saved-drawings-list").find("li.active").removeClass('active');
                //$("#saved-drawings-list").find("[value= "+ data.drawing_id+ " ]").addClass("active")

            }
        });
    }




    function saveCurrentDrawing(event) {
        event.preventDefault();
        var dataAsString = globalVars.gridVars.getGridDataAsString();
        $("#id_new_drawing_data").attr("value", dataAsString);
        $.ajax({
            type: "POST",
            url: saveForm.attr("data-save-drawing-url"),
            data: saveForm.serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data);
                //$("#id_new_drawing_data").attr("value", "");
            }
        });
    }




    function deleteCurrentDrawing(event) {
        console.log("delete form submitted");
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: deleteForm.attr("data-delete-drawing-url"),
            data: deleteForm.serialize(),
            dataType: 'json',
            success: function(data) {
                console.log("delete request successfuly sent");
                console.log(data);
                if (data.drawing_id < 0) {
                    //error did not save correctly handle me
                    return;
                }
                globalVars.gridVars.fillGrid(globalVars.colorPickerVars.getDefaultColor());

            }
        });
    }



    function createNewDrawing(event) {
        event.preventDefault();
        console.log("create request ");
        $.ajax({
            type: "POST",
            url: createDrawingForm.attr("data-create-drawing-url"),
            data: createDrawingForm.serialize(),
            dataType: 'json',
            success: function(data) {
                console.log("create request successfuly sent");
                console.log(data);
                if (data.drawing_id < 0) {
                    //error did not save correctly handle me
                    return;
                }
                var newListElem = JSON.parse(JSON.stringify($("#saved-drawings-list").first()));
                console.log(newListElem);
                //newListElem.find(".drawing-name").text(data.drawing_name);
                //newListElem.find("#drawing-id").attr("value", data.new_drawing_id);
            }
        });
    }




    function submitDrawingForReview(event) {
        $.ajax({
            type: "POST",
            url: submitDrawingForm.attr("data-submit-drawing-url"),
            data: submitDrawingForm.serialize(),
            dataType: 'json',
            success: function(data) {
                console.log("create request successfuly sent");
                console.log(data);

            }
        });

    }


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