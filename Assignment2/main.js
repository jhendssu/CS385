// Joseph Henderson - CS 385

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.28, 0.19, 0.28, 1.0); 

    cone = new Cone(gl, 150);
    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    cone.render();
}

window.onload = init;
