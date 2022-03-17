
//"use strict";

var gl;

function init() {
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
   
    // Add your sphere creation and configuration code here
    sun = new Sphere()
    sun.radius = 500;
    sun.color = vec4(1.0, 0.9, 0.0, 1.0);

    earth = new Sphere()
    earth.radius = 100;
    earth.distance = 1500;
    earth.color = vec4(0.0, 0.76, 1.0, 1.0)

    moon = new Sphere()
    moon.radius = 50;
    moon.distance = 400;
    moon.color = vec4(.7, .7, .7, 1.0)

    diameter = 2*(earth.distance + moon.distance + moon.radius);

    // Projection Transformation
    near = 10000;
    far = near + diameter;

    theta = Math.asin( (diameter/2) / (near + (diameter/2)) );
    fovy = 2*theta;
    fovy = fovy * (180/Math.PI); // convert to degreees

    aspect = canvas.clientWidth/canvas.clientHeight;
    P = perspective(fovy, aspect, near, far)

    // Apply the projection transformation to all obejcts
    sun.P = P;
    earth.P = P;
    moon.P = P;

    hoursPerDay = 24;
    hoursPerYear = 365.25 * hoursPerDay;
    time = 0

    render()
    requestAnimationFrame(render);
}

function render() {

    // Update your motion variables here
    time += 1;
    day = (time / hoursPerYear) * 360
    hour = time % 360

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    
    // Add your rendering sequence here
    ms = new MatrixStack();
    
    // Simplest viewing transform
    var V = translate(0.0, 0.0, -0.5*(near + far));
    ms.load(V)

    // I've found it helps to treat the push and pop operations like
    // braces and indent the code following the push operation.
    ms.push();
        ms.scale(sun.radius)
        sun.MV = ms.current();
        sun.render();
    ms.pop()

    ms.push();
        ms.rotate(day, [0.0, 0.0, 1.0]);    // affects the moon
        ms.translate(earth.distance, 0, 0)  // affects the moon
        ms.rotate(hour, [0.0, 0.0, 1.0])
        ms.push();
            ms.scale(earth.radius);
            earth.MV = ms.current()
            earth.render()
        ms.pop();
        ms.translate(moon.distance, 0, 0);
        ms.scale(moon.radius);
        moon.MV = ms.current();
        moon.render();
    ms.pop()

    requestAnimationFrame(render);
}

window.onload = init;