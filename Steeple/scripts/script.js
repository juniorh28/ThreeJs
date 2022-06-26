/* Returns a geometry object for a steeple, which is just a square pyramid
 * or tetrahedron.  The origin is in the center of the base, so the base
 * vertices are at y=0 and x and z at plus or minus half the width, and
 * the top is at (0,height,0) */

function createSteeple(width, height) {
  var geom = new THREE.Geometry();
  var w2 = 0.5 * width;
  // add the base
  geom.vertices.push(new THREE.Vector3(+w2, 0, +w2));
  geom.vertices.push(new THREE.Vector3(+w2, 0, -w2));
  geom.vertices.push(new THREE.Vector3(-w2, 0, -w2));
  geom.vertices.push(new THREE.Vector3(-w2, 0, +w2));
  geom.vertices.push(new THREE.Vector3(0, height, 0));

  // now that we've got the vertices we need to define the faces.
  // base
  geom.faces.push(new THREE.Face3(0, 1, 2));
  geom.faces.push(new THREE.Face3(0, 2, 3));

  // side faces
  geom.faces.push(new THREE.Face3(0, 1, 4));
  geom.faces.push(new THREE.Face3(1, 2, 4));
  geom.faces.push(new THREE.Face3(2, 3, 4));
  geom.faces.push(new THREE.Face3(3, 0, 4));

  // calculate the normals for shading
  geom.computeFaceNormals();
  geom.computeVertexNormals(true);

  return geom;
}

// We always need a scene.
var scene = new THREE.Scene();

// ====================================================================

var barnWidth = 50;
var barnHeight = 30;
var barnDepth = 40;

var barn1geom = TW.createBarn(barnWidth, barnHeight, barnDepth);
var barn1mesh = TW.createMesh(barn1geom);
scene.add(barn1mesh);

// ================================================================

var steepleHeight = 36;
var steepleWidth = 6;
var steepleMesh;

function placeSteeple(steepleHeight, steepleWidth) {
  var half = steepleWidth * 0.5;
  var steepleGeom = createSteeple(steepleWidth, steepleHeight);
  steepleMesh = TW.createMesh(steepleGeom);
  steepleMesh.position.set(
    barnWidth * 0.5,
    barnHeight + barnWidth * 0.5 - half,
    -half
  );
  scene.add(steepleMesh);
}

placeSteeple(steepleHeight, steepleWidth);

// ================================================================

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer, scene);

TW.cameraSetup(renderer, scene, {
  minx: 0,
  maxx: barnWidth,
  miny: 0,
  maxy: barnHeight + barnWidth * 0.5 + steepleHeight - steepleWidth * 0.5,
  minz: -barnDepth,
  maxz: 0,
});

// add new code here

//==================================================================
//This is part 1 of the exercise using the control + and -
//comment all below up to commment on GUI pt2 comment to use GUI

// growSteeple() is a callback function that decreases the height of the steeple
function growSteeple() {
  scene.remove(steepleMesh);
  steepleHeight++;
  placeSteeple(steepleHeight, steepleWidth);
  TW.render();
}
// shrinkSteeple() is a callback function that decreases the height of the steeple
function shrinkSteeple() {
  scene.remove(steepleMesh);
  steepleHeight--;
  placeSteeple(steepleHeight, steepleWidth);
  TW.render();
}

TW.setKeyboardCallback("+", growSteeple, "grow steeple");
TW.setKeyboardCallback("-", shrinkSteeple, "shrink steeple");

//GUI pt2 of the exercise=======================================================
//comment all below if you want only want keyboard

// global variable for dimensions of steeple
var sceneParams = {
  steepleHeight: 40,
  steepleWidth: steepleWidth,
};

// redrawSteeple() is a callback function that redraws the steeple with the new dimensions
function redrawSteeple() {
  scene.remove(steepleMesh);
  placeSteeple(sceneParams.steepleHeight, sceneParams.steepleWidth);
  TW.render();
}

//this is gui version of growing and shrinking steeple height
var gui = new dat.GUI();
gui.add(sceneParams, "steepleHeight", 20, 40).onChange(redrawSteeple);
