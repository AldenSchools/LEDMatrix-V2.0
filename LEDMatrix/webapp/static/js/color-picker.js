$(function() {

});

function initColorPickerGlobals(defaultColor) {


    var mode = "color";
    var colorPicker = new iro.ColorPicker('#color-picker');

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