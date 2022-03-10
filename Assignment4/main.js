
//"use strict";

var gl;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here
    sun = new Sphere();
    sun.radius = 500;
    sun.color = vec4(1.0, 0.9, 0.0, 1.0);

    earth = new Sphere();
    earth.radius = 100;
    earth.distance = 1500;
    earth.color = vec4(0.0, 0.76, 1.0, 1.0)

    moon = new Sphere();
    moon.radius = 50;
    moon.distance = 400;
    moon.color = vec4(.7, .7, .7, 1.0)

    render()
    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here

    requestAnimationFrame(render);
}

window.onload = init;