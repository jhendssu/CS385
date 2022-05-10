
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;

//const geometry = new THREE.BoxGeometry();
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
//const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );


/*
document.addEventListener('keydown', onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    keyCode = event.which;
    if (dragonS != null && keyCode == 32) {
        dragonS.geometry = simplifier.modify(dragonS.geometry)
    }
}
*/

const dragonModelLink = 'http://raw.githubusercontent.com/jhendssu/CS385/main/FinalProject/Dragon.ply';

// Load the 
const loader = new PLYLoader();
dragon = null
loader.load(
    'http://raw.githubusercontent.com/jhendssu/CS385/main/FinalProject/Dragon.ply',
    function(geometry) {
        simplifier = new THREE.SimplifyModifier()
        mat = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true })
        mesh = new THREE.Mesh(geometry, mat)


        simplified = mesh.clone();
        count = Math.floor(simplified.geometry.attributes.position.count * 0.875);
        simplified.geometry = simplifier.modify( simplified.geometry, count)


        dragon = mesh
        //scene.add(mesh);
    },
    (xhr) => { console.log((xhr.loaded / xhr.total) * 100 + "% loaded"); },
    (error) => { console.log(error); }
)

dragon2 = null
loader.load(
    'http://raw.githubusercontent.com/jhendssu/CS385/main/FinalProject/Dragon.ply',
    function(geometry) {
        simplifier = new THREE.SimplifyModifier()
        mat = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true })
        mesh = new THREE.Mesh(geometry, mat)

        simplified = mesh.clone();
        count = Math.floor(simplified.geometry.attributes.position.count * .95);
        simplified.geometry = simplifier.modify( simplified.geometry, count)

        console.log(simplified)

        dragon2 = simplified
        scene.add(simplified);
    },
    (xhr) => { console.log((xhr.loaded / xhr.total) * 100 + "% loaded"); },
    (error) => { console.log(error); }
)

camera.position.y = .095
camera.position.z = .25;


function animate() {
    requestAnimationFrame( animate );

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    if (dragon != null) {
        //dragon.rotation.y += 0.001
    }

    if (dragon2 != null) {
        if (dragon2.position[0] != .15) {
            dragon2.position.set(.15, 0, .15)
        }
        //dragon2.rotation.y += 0.001
    }

    //c onsole.log(dragonS)

    render()
};

function render() {
    renderer.render(scene, camera)
}

animate();
