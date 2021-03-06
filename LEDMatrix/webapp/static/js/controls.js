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
				
        setSimpleButtons();
    }

    /* Updates the mode of the color picker to color*/
    function colorMode(event) {
        globalVars.colorPickerVars.setMode("color");

        updateNewActiveElem(color);
    }

    /* Set functions of all simple color boxes */
    function setSimpleButtons(){
      $("#simpleRed").on("click",{simpleColor:"#ff0000"},simpleColorButton);
      $("#simpleGreen").on("click",{simpleColor:"#00ff00"},simpleColorButton);
      $("#simpleBlue").on("click",{simpleColor:"#0000ff"},simpleColorButton);
      $("#simpleYellow").on("click",{simpleColor:"#ffff00"},simpleColorButton);
      $("#simpleOrange").on("click",{simpleColor:"#ffa500"},simpleColorButton);
      $("#simpleBrown").on("click",{simpleColor:"#8B4513"},simpleColorButton);
      $("#simpleCyan").on("click",{simpleColor:"#00ffff"},simpleColorButton);
      $("#simplePink").on("click",{simpleColor:"#ff69b4"},simpleColorButton);
      $("#simplePurple").on("click",{simpleColor:"#800080"},simpleColorButton);
      $("#simpleWhite").on("click",{simpleColor:"#ffffff"},simpleColorButton);
      $("#simpleBlack").on("click",{simpleColor:"#000000"},simpleColorButton);
      $("#simpleGrey").on("click",{simpleColor:"#808080"},simpleColorButton);
    }

    /* Set current drawing color to color of clicked simple color box */
    function simpleColorButton(event){
      globalVars.colorPickerVars.getColorPicker().color.hexString = event.data.simpleColor;
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
                    displayInfoModal("Drawing saved", "Your drawing has been saved succesfuly!", false);
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
                if (data.success) {
                    displayInfoModal("Submit to matrix", "Your request to show this drawing on the LED matrix has been submitted.", false);
                } else if (data.blocked) {
                    displayInfoModal("BLOCKED! :(", "Sorrry but you cannot submit anything at this time because you have been blocked. To solve this please speak to one of your teachers.", false);
                } else {
                    displayInfoModal("Submit error", "An error has occurred could not submit for review. Please try again later.", false);
                }
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

    var blockUserForms = $(".block-user-forms");
    var unblockUserForms = $(".unblock-user-forms");
    var removeUserForms = $(".remove-user-forms");
    blockUserForms.submit(blockUser);
    unblockUserForms.submit(unblockUser);
    removeUserForms.submit(removeUser);




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
                console.log(data);
                $('#matrix-preview-modal').modal('show');
                globalVars.gridVars.loadDrawingToGrid(data.drawing_data);

                $('#matrix-preview-modal').on('shown.bs.modal', function(e) {
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

                if (data.success) {
                    displayInfoModal("Drawing has been added to showing list", "", false);
                    var currShowingCount = String(Number($("#currently-showing-count").text()) + 1);
                    $("#currently-showing-count").text(currShowingCount);
                    $(event.target).closest("li").remove();

                } else if (data.limit_reached) {
                    displayInfoModal("LIMIT REACHED", "You have reached the maxumum number of submission that can be displayed. Please remove some submission from the currently showing list or update maximum limit of the matrix in the prefrences tab.", false);
                } else {
                    displayInfoModal("Error", "An unexpected error has occurred. This clould be because the creater of the drawing deleted it and it no longer exists", false);
                }

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

                if (data.success) {
                    displayInfoModal("Drawing Removed showing list", "", false);
                    $(event.target).closest("li").remove();

                    var currShowingCount = String(Number($("#currently-showing-count").text()) - 1);
                    $("#currently-showing-count").text(currShowingCount);
                }
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
                console.log(data);
                if (data.success) {
                    displayInfoModal("Settings Saved", "Your settings has been saved", false);
                } else if (data.drawing_delay_too_short) {
                    displayInfoModal("WARNING", "The delay between drawings is too short. The delay between drawings has been set to the minimum, all other settings have been saved", false);
                }
            }
        });


    }


    function blockUser(event) {
        console.log("updateMatrixSettings called");
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("data-handle-block-user-url"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data.success) {
                    displayInfoModal("User Blocked", "User '" + data.username + "' has been blocked successfuly. This user can keep drawing but will not be able to submit any drawings.", false);
                }
            }
        });
    }

    function unblockUser(event) {
        console.log("updateMatrixSettings called");
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("data-handle-unblock-user-url"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data.success) {
                    displayInfoModal("User Unblocked", "User '" + data.usermame + "' has been unblocked successfuly.", false);
                }
            }
        });
    }

    function removeUser(event) {

        console.log("updateMatrixSettings called");
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: $(this).attr("data-handle-remove-user-url"),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data.success) {
                    displayInfoModal("User Deleted", "User '" + data.username + "'and all of this users settings and files have been deleted successfuly.", false);
                    $(event.target).closest("li").remove();

                    var userCount = String(Number($("#user-count").text()) - 1);
                    $("#user-count").text(userCount);
                }
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