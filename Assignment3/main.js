// Joseph Henderson - CS 385

function init() {
    var canvas = document.getElementById("webgl-canvas");

    gl = canvas.getContext("webgl2");

    gl.clearColor(0.28, 0.19, 0.28, 1.0); 
    
    cube = new Cube(gl, 19);
    render();
    requestAnimationFrame(render);
}


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    cube.render();
}


window.onload = init;

