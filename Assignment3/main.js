// Joseph Henderson - CS 385

function init() {
    var canvas = document.getElementById("webgl-canvas");

    gl = canvas.getContext("webgl2");

    gl.clearColor(0.28, 0.19, 0.28, 1.0); 
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);

    time = 0;
    theta = 0;
    dtheta = 1;

    cube = new Cube(gl);
    render();
    requestAnimationFrame(render);
}


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta = time*dtheta;
    time++;

    cube.R = rotate(theta, [1, .5, .25]);

    cube.render();
    requestAnimationFrame(render);
}


window.onload = init;

