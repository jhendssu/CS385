// Joseph Henderson - CS 385

function init() {
    var canvas = document.getElementById("webgl-canvas");

    gl = canvas.getContext("webgl2");

    aspect = canvas.clientWidth / canvas.clientHeight;

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


    // Advance 'time'
    theta = time*dtheta;
    time++;

    // Rotation transformation
    cube.R = rotate(theta, [1, .2, 0]);

    // Model View
    eye = vec3(1.0, 1.0, 1.0);
    at = vec3(0.0, 0.5, 0.5);
    up = vec3(0.0, 1.0, 0.0);
    cube.MV = lookAt(eye, at, up);

    // Perspective
    cube.P = perspective(110, aspect, 1, 10)

    cube.render();
    requestAnimationFrame(render);
}


window.onload = init;

