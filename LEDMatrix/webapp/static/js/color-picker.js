$(function() {

});

/**
 * Sets up all the global variables/functions that any pice of code might need in relation to the color picker/color pallet.
 * The way that I have set this up is making this function act like a class with getters and setters and some other
 * useful function/methods that you can use when you are dealing with anything regarding the color picker/color pallet. 
 * 
 * You can read more about the specific color picker I used at (I recommend going there their documentation is good ): 
 *      Website/Documentation: https://iro.js.org/
 *      Github: https://github.com/jaames/iro.js
 *   
 * @param {String} defaultColor  The default color that you want the color picker to start with, this is also the color that represents OFF as well.
 * 
 * @return {Object or undefined} Useful function/methods that you can use when you are dealing with anything regarding the color picker/color pallet.
 *      - Returns undefined if the color picker does not exist on the page
 *  
 */
function initColorPickerGlobals(defaultColor) {


    var mode = "color";
    var colorPicker;
    if ($('#color-picker').length) colorPicker = new iro.ColorPicker('#color-picker');
    else return undefined;



    colorPicker.on("color:change", colorChangeCallback);

    /**
     * Whenever the user changes the color on the color picker this function is called.
     *   
     * @param {String} color The color that the color picker was changed to  
     */
    function colorChangeCallback(color) {
        $("#color-hex").css("color", color.hexString);
        $("#color-hex").text(color.hexString.toUpperCase());
        //console.log(color.hexString);
    }

    function getColorPicker() { return colorPicker; }

    function getDefaultColor() { return defaultColor; }

    function getMode() { return mode; }

    function setMode(newMode) { mode = newMode; }

    function setWidth(newWidth) { colorPicker.resize(newWidth); }

    return {
        getColorPicker: getColorPicker,
        getDefaultColor: getDefaultColor,
        getMode: getMode,
        setMode: setMode,
        setWidth: setWidth
    };
}