// We always need a scene

var scene = new THREE.Scene();

// ====================================================================

// function to create a Geometry for a three-pointed star with four triangular faces
// size is the radius of the circle that circumscribes the star

var size = 50;

function starGeometry(size) {
  var starGeom = new THREE.Geometry();
  var angle;
  var lens = [size, size / 4];
  for (var i = 0; i < 6; i++) {
    angle = i * (Math.PI / 3);
    len = lens[i % 2];
    starGeom.vertices.push(
      new THREE.Vector3(len * Math.cos(angle), len * Math.sin(angle))
    );
  }
  starGeom.faces.push(new THREE.Face3(0, 1, 5));
  starGeom.faces.push(new THREE.Face3(1, 2, 3));
  starGeom.faces.push(new THREE.Face3(3, 4, 5));
  starGeom.faces.push(new THREE.Face3(1, 3, 5));
  return starGeom;
}

// ====================================================================

//Excersice PT1 Create a rainbow colored star
// vector of colors to use for the 6 vertices of the star geometry
//red v1
//orange v2
//yellow v3
//green v4
//blue v5
//violet v6
var colors = [
  new THREE.Color("red"),
  new THREE.Color("orange"),
  new THREE.Color("yellow"),
  new THREE.Color("green"),
  new THREE.Color("blue"),
  new THREE.Color("violet"),
];

// add code to create a star using color interpolation of the triangular faces
// and add it to the scene
var starGeom = starGeometry(size); //create the starGeometry
starGeom.vertexColors = colors; //assign each vector a color from colors array
TW.computeFaceColors(starGeom); // compute the faces

var material = new THREE.MeshBasicMaterial({
  vertexColors: THREE.VertexColors,
  side: THREE.DoubleSide,
}); //create the material for the face
var starMesh = new THREE.Mesh(starGeom, material); //assign the material and geometry to the mesh

/////Excercise PT2 Create 6 differennt colored stars.
//creates a one Color Star at x,y position
function createOneColorStar(Color, x, y) {
  var starGeom = starGeometry(size);
  var starMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(Color),
    side: THREE.DoubleSide,
  });
  var starMesh = new THREE.Mesh(starGeom, starMaterial);
  starMesh.position.set(x, y, 0);
  scene.add(starMesh);
}
// 6 Color, 1 for each star
var diffColor = ["red", "orange", "yellow", "green", "blue", "violet"];

//will loop and create 6 stars with the color from the color array
for (i = 0; i < 6; i++) {
  angle = i * (Math.PI / 3);
  var x = 1.5 * size * Math.cos(angle);
  var y = 1.5 * size * Math.sin(angle);
  createOneColorStar(diffColor[i], x, y);
}

scene.add(starMesh); //place the mesh on the canvas

// ================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer, scene);

TW.cameraSetup(renderer, scene, {
  minx: -size,
  maxx: size,
  miny: -size,
  maxy: size,
  minz: 5,
  maxz: 5,
});
