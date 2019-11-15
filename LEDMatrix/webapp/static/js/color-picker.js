$(function() {

});

function initColorPickerGlobals(defaultColor) {


    var mode = "color";
    var colorPicker;
    if ($('#color-picker').length) colorPicker = new iro.ColorPicker('#color-picker');
    else return undefined;



    colorPicker.on("color:change", colorChangeCallback);

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