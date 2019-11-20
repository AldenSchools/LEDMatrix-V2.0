$(function() {

});


/**
 * Not implemented because there are no variables that other components need to use form this 
 *  
 *  
 */
function initControlGlobals() {

}

/**
 * This function sets up the toolbox controls for the canvas/grid on the page.
 * 
 * @param {Object} globalVars All global variables 
 *   - 'globalVars.colorPickerVars':  accesses all global variables/functions assosiated with the color picker
 *   - 'globalVars.gridVars':         accesses all global variables/functions assosiated with the matrix grid
 *   - 'globalVars.controlVars':      accesses all global variables/functions assosiated with website controls
 */
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

    /* updates the mode of the color picker to color*/
    function colorMode(event) {
        globalVars.colorPickerVars.setMode("color");

        updateNewActiveElem(color);
    }

    /* Colors all boxes, a blank box is a box where the color is set to the default color*/
    function colorAllBlankMode(event) {
        var grid = gridVars.getGrid();
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                if (grid[row][col].color === colorPickerVars.getDefaultColor()) gridVars.setGridColor(row, col, colorPickerVars.getColorPicker().color.hexString);
            }
        }
    }

    /* Colors all boxes to the current color in the color picker*/
    function colorAllMode(event) {
        globalVars.gridVars.fillGrid(colorPickerVars.getColorPicker().color.hexString);
    }

    /* A future feature where you can do simle matrix manipulation such as rotating 180,360 etc.. */
    function addEfects(event) {
        console.log("add effects clicked function not implemented");
    }

    /* Sets the color to the default color to act as an eraser */
    function eraserMode(event) {
        colorPickerVars.setMode("eraser");

        updateNewActiveElem(eraser);
    }

    /* Clears the grid*/
    function clearGrid(event) {
        globalVars.gridVars.fillGrid(colorPickerVars.getDefaultColor());

    }

    function updateNewActiveElem(element) {
        toolbox.find(".active").removeClass("active");
        element.addClass("active");
    }
}











/**
 * handles all form POST and GET rquest related to a drawingwhen a user is logged in. Things such as getting a drawing form the database, 
 * saving a drawing, or creating a new one.
 * 
 * @param {Object} globalVars All global variables 
 *   - 'globalVars.colorPickerVars':  accesses all global variables/functions assosiated with the color picker
 *   - 'globalVars.gridVars':         accesses all global variables/functions assosiated with the matrix grid
 *   - 'globalVars.controlVars':      accesses all global variables/functions assosiated with website controls
 */
function drawingFormControlHandler(globalVars) {
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


    /* get the saved selected drawing and shows it on the canvas */
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



    /* Saves the current drawing to the database  */
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
                if (data.success) {
                    $("#id_new_drawing_data").attr("value", "");
                    displayInfoModal("<span style='color: green;'>Drawing saved</span>", "Your drawing has been saved succesfuly!", false);
                } else {
                    displayInfoModal("Save Error", "Could not save this drawing at this time. Make sure you have created and selected a new drawing first and try again.", false);
                }

            }
        });
    }



    /* Deletes a drawing from the database */
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


    /* Creates a new drawing with a name to load later*/
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



                var newListElem = $($("#template-list-item")).clone();
                newListElem.removeClass("d-none");
                newListElem.attr("id", "");
                newListElem.find("#drawing-id").attr("value", data.new_drawing_id);
                newListElem.find(".drawing-name").text(data.drawing_name);
                $('#saved-drawings-list').find("li.active").removeClass('active');
                newListElem.addClass("active");

                $('#new-drawing-modal').modal('hide');
                $('#saved-drawings-list').append(newListElem);

                $("#save-drawing-id-input").attr("value", data.new_drawing_id);
                $("#submit-drawing-id-input").attr("value", data.new_drawing_id);
                $("#delete-drawing-id-input").attr("value", data.new_drawing_id);

                $("#drawing-data-cached-input").attr("value", "");

                newListElem.find("form").submit(loadDrawing);


            }
        });
    }



    /* Submits drawing to admin dashboard where the admin chooses which drawing to send to the led matrix*/
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










/**
 * Handles all form POST and GET request related to the admin dashboard. Things such as moving/removing a submission to the currently showing on matrix,
 * viewing drawings, and updating matrix settings.
 * 
 * 
 * @param {Object} globalVars All global variables 
 *   - 'globalVars.colorPickerVars':  accesses all global variables/functions assosiated with the color picker
 *   - 'globalVars.gridVars':         accesses all global variables/functions assosiated with the matrix grid
 *   - 'globalVars.controlVars':      accesses all global variables/functions assosiated with website controls
 */
function adminFormControlHandler(globalVars) {
    var currShowingGetDataForms = $(".get-user-drawing-form-curr-showing");
    var newSubGetDataForms = $(".get-user-drawing-form-new-subs");
    var subHisGetDataForms = $(".get-user-drawing-form-sub-his");
    currShowingGetDataForms.submit(getDrawingData);
    newSubGetDataForms.submit(getDrawingData);
    subHisGetDataForms.submit(getDrawingData);

    var currShowingRemoveFroms = $(".remove-from-showing-list");
    var newSubAddToShowListForms = $(".send-to-showing-list-new-subs");
    var subHisAddToShowListForms = $(".send-to-showing-list-sub-his");
    currShowingRemoveFroms.submit(removeFromShowingList);
    newSubAddToShowListForms.submit(addToShowingList);
    subHisAddToShowListForms.submit(addToShowingList);

    var matrixSettingsForm = $("#matrix-settings-form");
    var resetDefaultsForm = $("#reset-defaults-form");
    matrixSettingsForm.submit(updateMatrixSettings);
    resetDefaultsForm.submit(updateMatrixSettings);




    /* Gets the drawing data for any given drawing givien its drawing id*/
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
                //Bug Here where it sends data correctly but does not size correctly untill you manually resize the window
                console.log(data);
                $('#matrix-preview-modal').modal('show');



                globalVars.gridVars.loadDrawingToGrid(data.drawing_data);
                $('#matrix-preview-modal').on('shown.bs.modal', function(e) {
                    // do something...
                    console.log("modal effect donne");
                    globalVars.gridVars.updateGrid();
                    $('#matrix-preview-modal').modal('handleUpdate');
                })

                // $(event.target).closest("li.active").removeClass('active');
                // $(event.target).closest("li").addClass("active");

            }
        });
    }

    /* Adds a submission to the currently showing list */
    function addToShowingList(event) {
        console.log("addToShowingList called");
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("data-handle-send-to-show-list-url"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data);
                //show success and delete list element if in new submision list (from the back end and in html)
                //show a confirmation maybe, would it be too annoying if you have to add a lot
                //definitly show a notice when the limit has been reached 
            }
        });
    }

    /* Removes a submissionfrom the currently showing list */
    function removeFromShowingList(event) {
        console.log("removeFromShowingList called");
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("data-handle-remove-from-show-list-url"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data);
                //show success and delete list element if in new submision list (from the back end and in html)
                //show a confirmation maybe, would it be too annoying if you have to remove a lot
            }
        });
    }


    /* Called whenever the user saves a new setting for the matrix */
    function updateMatrixSettings(event) {
        console.log("updateMatrixSettings called");
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("data-update-matrix-settings-url"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                //show success and delete list element if in new submision list (from the back end and in html)
                //show a confirmation and update values on the html
                //show a confirmation if the delay between drawings is too short min is 3 secs, letting the user know that it was set to the minimum
                console.log(data);
            }
        });


    }


    $("#id_led_on_off_time_enabled").change(checkBoxChange);

    function checkBoxChange(event) {
        if ($(this).is(':checked')) {
            $("#start-end-time-inputs-div").removeClass("d-none");
        } else {
            $("#start-end-time-inputs-div").addClass("d-none");
        }
    }

}