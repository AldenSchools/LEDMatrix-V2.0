$("#canvas").outerHeight($(window).height() - $("#canvas").offset().top - Math.abs($("#canvas").outerHeight(true) - $("#canvas").outerHeight()));
$(window).on("resize", function() {
    $("#canvas").outerHeight($(window).height() - $("#canvas").offset().top - Math.abs($("#canvas").outerHeight(true) - $("#canvas").outerHeight()));
});


var window = $(window);
var windowHeight = window.height();
var canvas = $("canvas");
var canvasOffsetTop = canvas.offset().top;
var canvasOuterHeight = canvas.outerHeight();

canvas.outerHeight(windowHeight - canvasOffsetTop - Math.abs(canvas.outerHeight(true) - canvasOuterHeight));

window.on("resize", windowResized);

function windowResized() {
    canvas.outerHeight(windowHeight - canvasOffsetTop - Math.abs(canvas.outerHeight(true) - canvasOuterHeight));
}