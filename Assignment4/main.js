
//"use strict";

var gl;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Projection Transformation
    fovy = 177.45
    near = 1.0
    far = 3901.0
    aspect = canvas.clientWidth/canvas.clientHeight;
    P = perspective(fovy, aspect, near, far)

    // Add your sphere creation and configuration code here
    sun = new Sphere();
    sun.radius = 500;
    sun.color = vec4(1.0, 0.9, 0.0, 1.0);
    sun.P = P

    earth = new Sphere();
    earth.radius = 100;
    earth.distance = 1500;
    earth.color = vec4(0.0, 0.76, 1.0, 1.0)
    earth.P = P;

    moon = new Sphere();
    moon.radius = 50;
    moon.distance = 400;
    moon.color = vec4(.7, .7, .7, 1.0)
    moon.P = P;

    render()
    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here
    eye = vec3(1.0, 1.0, 1.0);
    at = vec3(0.0, 0.0, 0.0);
    up = vec3(0.0, 1.0, 0.0);
    MV = lookAt(eye, at, up);

    sun.MV = MV;
    sun.render();

    earth.MV = MV;
    earth.render();

    moon.MV = MV;
    moon.render()

    requestAnimationFrame(render);
}

window.onload = init;