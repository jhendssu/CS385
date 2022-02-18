// Joseph Henderson - CS 385

const DefaultNumSides = 8;

function Cube( gl, numSides, vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }
    
    var n = numSides || DefaultNumSides; // Number of sides 

    this.positions = { numComponents : 3 };
        
    var positions = [

        -1.0, -1.0, -1.0,   // 0
        1.0, -1.0, -1.0,    // 1
        1.0, -1.0, 1.0,     // 2
        -1.0, -1.0, 1.0,    // 3
        -1.0, 1.0, -1.0,    // 4
        1.0, 1.0, -1.0,     // 5
        1.0, 1.0, 1.0,      // 6
        -1.0, 1.0, 1.0      // 7
    ];

    // Adjust the positions 
    for (let i = 0; i < positions.length; i++) {
        positions[i] *= .5;
    }

    var indices = [
        1, 3, 0,
        1, 2, 3,
        2, 7, 3,
        2, 6, 7,
        6, 4, 7,
        6, 5, 4,
        5, 2, 1,
        5, 6, 2,
        0, 7, 4,
        0, 3, 7,
        5, 0, 4,
        5, 1, 0
       // Below verticies can be used with gl.LINES to show the wireframe
       // representation of a cube.
       /*
       0, 1,
       1, 2,
       2, 3,
       3, 0,
       0, 4,
       1, 5,
       4, 5,
       4, 7,
       7, 6,
       6, 5,
       6, 2,
       7, 3
       */
    ];

    this.indices = { count : indices.length };

    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "aPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
