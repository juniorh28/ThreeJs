// The "classic" barn, converted to THREE.js by Jos Dirksen, with thanks.
function createBarnVertices(w, h, len) {
  var barnGeometry = new THREE.Geometry();
  // add the front
  barnGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
  barnGeometry.vertices.push(new THREE.Vector3(w, 0, 0));
  barnGeometry.vertices.push(new THREE.Vector3(w, h, 0));
  barnGeometry.vertices.push(new THREE.Vector3(0, h, 0));
  barnGeometry.vertices.push(new THREE.Vector3(0.5 * w, h + 0.5 * w, 0));

  // just add the back also manually
  barnGeometry.vertices.push(new THREE.Vector3(0, 0, -len));
  barnGeometry.vertices.push(new THREE.Vector3(w, 0, -len));
  barnGeometry.vertices.push(new THREE.Vector3(w, h, -len));
  barnGeometry.vertices.push(new THREE.Vector3(0, h, -len));
  barnGeometry.vertices.push(new THREE.Vector3(0.5 * w, h + 0.5 * w, -len));

  return barnGeometry;
}

function createBarnFaces(barnGeometry) {
  // now that we've got the vertices we need to define the faces.
  // front faces
  barnGeometry.faces.push(new THREE.Face3(0, 1, 2));
  barnGeometry.faces.push(new THREE.Face3(0, 2, 3));
  barnGeometry.faces.push(new THREE.Face3(3, 2, 4));

  // back faces
  barnGeometry.faces.push(new THREE.Face3(5, 7, 6));
  barnGeometry.faces.push(new THREE.Face3(5, 8, 7));
  barnGeometry.faces.push(new THREE.Face3(7, 8, 9));

  // roof faces.
  barnGeometry.faces.push(new THREE.Face3(3, 4, 8));
  barnGeometry.faces.push(new THREE.Face3(4, 9, 8));
  barnGeometry.faces.push(new THREE.Face3(2, 7, 9));
  barnGeometry.faces.push(new THREE.Face3(4, 2, 9));

  // side faces
  barnGeometry.faces.push(new THREE.Face3(6, 2, 1));
  barnGeometry.faces.push(new THREE.Face3(7, 2, 6));
  barnGeometry.faces.push(new THREE.Face3(0, 3, 5));
  barnGeometry.faces.push(new THREE.Face3(3, 8, 5));

  // floor faces
  barnGeometry.faces.push(new THREE.Face3(0, 5, 1));
  barnGeometry.faces.push(new THREE.Face3(5, 6, 1));

  // calculate the normals for shading
  barnGeometry.computeFaceNormals();

  return barnGeometry;
}

// Here's our translation function
function translateX(vertices, deltax) {
  var len = vertices.length;
  for (var i = 0; i < len; i++) {
    vertices[i].x += deltax;
  }
}

// We always need a scene
var scene = new THREE.Scene();

// ====================================================================

var barnWidth = 50;
var barnHeight = 30;
var barnDepth = 40;

var barn1geom = createBarnVertices(barnWidth, barnHeight, barnDepth);

createBarnFaces(barn1geom);
// the createMesh function adds a "demo" material to the geometry

var barn1mesh = TW.createMesh(barn1geom);

// the scene is the set of things to render, so add the barn.

////
var barn2geom = createBarnVertices(barnWidth / 2, barnHeight / 2, barnDepth);

createBarnFaces(barn2geom);
// the createMesh function adds a "demo" material to the geometry

var barn2mesh = TW.createMesh(barn2geom);
scene.add(barn1mesh);
scene.add(barn2mesh);

translateX(barn2geom.vertices, -50);
//barn2mesh.position.set(-30,0,0);

// We always need a renderer

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer, scene);

// MODIFY CODE BELOW to adjust the bounding box for the two barns

TW.cameraSetup(renderer, scene, {
  minx: 0,
  maxx: 20,
  miny: 0,
  maxy: barnHeight, // a bit low
  minz: -barnDepth,
  maxz: 0,
});
