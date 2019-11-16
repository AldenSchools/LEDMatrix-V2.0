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
    console.log("drawingControlHandler");

    var loadForms = $(".load-drawing-form");
    var saveForm = $("#save-drawing-form");
    var deleteForm = $("#delete-drawing-form");
    var submitDrawingForm = $("#submit-drawing-form");
    var createDrawingForm = $("#new-drawing-form");


    loadForms.submit(loadDrawing);
    saveForm.submit(saveCurrentDrawing);
    deleteForm.submit(deleteCurrentDrawing);
    createDrawingForm.submit(createNewDrawing);
    submitDrawingForm.submit(submitDrawingForReview);



    function loadDrawing(event) {
        console.log("loadDrawing called");
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: $(this).attr("data-handle-fetch-drawing-url"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data.drawing_data);
                globalVars.gridVars.loadDrawingToGrid(data.drawing_data);

                $("#save-drawing-id-input").attr("value", data.drawing_id);
                $("#submit-drawing-id-input").attr("value", data.drawing_id);
                $("#delete-drawing-id-input").attr("value", data.drawing_id);

                $("#saved-drawings-list").find("li.active").removeClass('active');
                $(event.target).closest("li").addClass("active");

            }
        });
    }




    function saveCurrentDrawing(event) {
        console.log("save drawing called");
        event.preventDefault();
        var dataAsString = globalVars.gridVars.getGridDataAsString();

        if ($("#save-drawing-id-input").attr("value") === "-1") {
            $("#drawing-data-cached-input").attr("value", dataAsString);
            $("#new-drawing-modal").modal('show');
            return;
        }
        $("#id_new_drawing_data").attr("value", dataAsString);
        $.ajax({
            type: "POST",
            url: saveForm.attr("data-save-drawing-url"),
            data: saveForm.serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (false) {
                    displayInfoModal("Save Error", "Could not save this drawing at this time. Make sure you have created and selected a new drawing first and try again.", false);
                }
                $("#id_new_drawing_data").attr("value", "");
                displayInfoModal("Drawing saved", "Your drawing has been saved succesfuly!", false);
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
                if (data.deleted_drawing_id < 0) {
                    //error did not save correctly handle me
                    displayInfoModal("Delete Error", "Could not delete this drawing at this time. Please try again later.", false);
                    return;
                }
                console.log($("#saved-drawings-list").find("li input[value=" + data.deleted_drawing_id + "]").closest("li"));
                $("#saved-drawings-list").find("li input[value=" + data.deleted_drawing_id + "]").closest("li").remove();
                $("#save-drawing-id-input").attr("value", "-1");
                $("#submit-drawing-id-input").attr("value", "-1");
                $("#delete-drawing-id-input").attr("value", "-1");
                globalVars.gridVars.fillGrid(globalVars.colorPickerVars.getDefaultColor());
                displayInfoModal("Delete Success", "Deleted request succesful.", false);

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
                    displayInfoModal("Create Error", "Could not create a new drawing at this drawing at this time. Please try again later.", false);
                    return;
                }



                var newListElem = $($(".drawing-list-item").get(0)).clone();
                console.log(newListElem);
                newListElem.find("#drawing-id").attr("value", data.new_drawing_id);
                newListElem.find(".drawing-name").text(data.drawing_name);
                newListElem.addClass("active");

                $('#new-drawing-modal').modal('hide');
                $('#saved-drawings-list').append(newListElem);

                $("#save-drawing-id-input").attr("value", data.new_drawing_id);
                $("#submit-drawing-id-input").attr("value", data.new_drawing_id);
                $("#delete-drawing-id-input").attr("value", data.new_drawing_id);

                $("#drawing-data-cached-input").attr("value", "");


            }
        });
    }




    function submitDrawingForReview(event) {
        event.preventDefault();
        var dataAsString = globalVars.gridVars.getGridDataAsString();

        if ($("#save-drawing-id-input").attr("value") === "-1") {
            $("#drawing-data-cached-input").attr("value", dataAsString);
            displayInfoModal("Submit error", "Please give this drawing a name and then try to submit it again. ", false);
            $("#new-drawing-modal").modal('show');
            return;
        }
        $.ajax({
            type: "POST",
            url: submitDrawingForm.attr("data-submit-drawing-url"),
            data: submitDrawingForm.serialize(),
            dataType: 'json',
            success: function(data) {
                console.log("create request successfuly sent");
                console.log(data);
                if (data.success) displayInfoModal("Submit to matrix", "Your request to show this drawing on the LED matrix has been submitted.", false);
                else displayInfoModal("Submit error", "An error has occurred could not submit for review. Please try again later", false);
            }
        });

    }


}

function adminControlHandlers(globalVars) {
    var currShowingGetDataForms = $(".get-user-drawing-form-curr-showing");
    var newSubGetDataForms = $(".get-user-drawing-form-new-subs");
    var subHisGetDataForms = $(".get-user-drawing-form-sub-his");

    var currShowingRemoveFroms = $(".remove-from-showing-list");
    var newSubAddToShowListForms = $(".send-to-showing-list-new-subs");
    var subHisAddToShowListForms = $(".send-to-showing-list-sub-his");

    currShowingGetDataForms.submit(getDrawingData);
    newSubGetDataForms.submit(getDrawingData);
    subHisGetDataForms.submit(getDrawingData);

    newSubAddToShowListForms.submit(addToShowingList);
    subHisAddToShowListForms.submit(addToShowingList);

    currShowingRemoveFroms.submit(removeFromShowingList)

    function getDrawingData(event) {
        console.log("GetDrawingData called");
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: $(this).attr("data-handle-fetch-drawing-url"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                //delete list element if in new submision list (from the back end only not html wait till refresh to show updated list on html)
                console.log(data);
                $('#matrix-preview-modal').modal('show');

                globalVars.gridVars.loadDrawingToGrid(data.drawing_data);
                // $(event.target).closest("li.active").removeClass('active');
                // $(event.target).closest("li").addClass("active");

            }
        });
    }


    function addToShowingList(event) {
        console.log("addToShowingList called");
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("data-handle-send-to-show-list-url"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                //show success and delete list element if in new submision list (from the back end and in html)
            }
        });
    }

    function removeFromShowingList(event) {

    }

}