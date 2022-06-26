/*
width of the base is about 55 feet
•width of each side at the top is about 34 feet
•the height of the small pyramid (pyramidion) at the top of the monument is 55 feet
•The height of the whole monument is 555 feet
*/

// We always need a scene.
var scene = new THREE.Scene();

// ====================================================================

/* Next, we create objects in our scene. Here, just a box and barn. The
center of the box is the origin, so, for example, the x coordinates go
from -2 to +2. Delete these and put your code here.  */

var towerWidth = 55;
var towerHeight = 500;
var pyramidWidth = 34;
var pyramidHeight = 55;

//tower
//will create the monument without the pyramid on top
function createObelisk(towerWidth, towerHeight, pyramidWidth, pyramidHeight) {
  var obelisk = new THREE.Geometry();

  //===========================================================================
  //Tower Vertex only
  //define the vertex for the tower to place on the plane

  //base of the tower
  obelisk.vertices.push(new THREE.Vector3(towerWidth, 0, towerWidth)); //v0
  obelisk.vertices.push(new THREE.Vector3(towerWidth, 0, -towerWidth)); //v1
  obelisk.vertices.push(new THREE.Vector3(-towerWidth, 0, -towerWidth)); //v2
  obelisk.vertices.push(new THREE.Vector3(-towerWidth, 0, towerWidth)); //v3

  //top of tower
  obelisk.vertices.push(
    new THREE.Vector3(pyramidWidth, towerHeight, pyramidWidth)
  ); //v4
  obelisk.vertices.push(
    new THREE.Vector3(pyramidWidth, towerHeight, -pyramidWidth)
  ); //v5
  obelisk.vertices.push(
    new THREE.Vector3(-pyramidWidth, towerHeight, -pyramidWidth)
  ); //v6
  obelisk.vertices.push(
    new THREE.Vector3(-pyramidWidth, towerHeight, pyramidWidth)
  ); //v7

  //===========================================================================
  //
  //front face of the tower
  obelisk.faces.push(new THREE.Face3(3, 0, 4));
  obelisk.faces.push(new THREE.Face3(3, 4, 7));

  //assign the front face to these index for coloring in future
  obelisk.faces[0].materialIndex = 0;
  obelisk.faces[1].materialIndex = 1;

  //right side of the tower
  obelisk.faces.push(new THREE.Face3(0, 1, 5));
  obelisk.faces.push(new THREE.Face3(0, 5, 4));

  //assign the right face to these index for coloring in future
  obelisk.faces[2].materialIndex = 2;
  obelisk.faces[3].materialIndex = 3;

  //back of tower
  obelisk.faces.push(new THREE.Face3(1, 2, 6));
  obelisk.faces.push(new THREE.Face3(1, 6, 5));

  //assign the back face to these index for coloring in future
  obelisk.faces[4].materialIndex = 4;
  obelisk.faces[5].materialIndex = 5;

  //left side of tower
  obelisk.faces.push(new THREE.Face3(2, 3, 7));
  obelisk.faces.push(new THREE.Face3(2, 7, 6));

  //assign the left face to these index for coloring in future
  obelisk.faces[6].materialIndex = 6;
  obelisk.faces[7].materialIndex = 7;

  //top of the pyramid
  obelisk.vertices.push(new THREE.Vector3(0, towerHeight + pyramidHeight, 0));

  //===========================================================================
  // pyramid side faces

  //right side of pyramid
  obelisk.faces.push(new THREE.Face3(4, 5, 8));
  //assign the right face to these index for coloring in future
  obelisk.faces[8].materialIndex = 8;

  //back side of pyramid
  obelisk.faces.push(new THREE.Face3(5, 6, 8));
  //assign the back face to these index for coloring in future
  obelisk.faces[9].materialIndex = 9;

  //left side of pyramid
  obelisk.faces.push(new THREE.Face3(6, 7, 8));
  //assign the left face to these index for coloring in future
  obelisk.faces[10].materialIndex = 10;

  //front side of pyramid
  obelisk.faces.push(new THREE.Face3(7, 4, 8));
  //assign the front face to these index for coloring in future
  obelisk.faces[11].materialIndex = 11;

  // calculate the normals for shading
  obelisk.computeFaceNormals();
  obelisk.computeVertexNormals(true);

  obeliskColor = new THREE.MeshFaceMaterial([
    new THREE.MeshBasicMaterial({ color: new THREE.Color("#4287f5") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("#ffffff") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("blue") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("blue") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("green") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("green") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("orange") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("orange") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("grey") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("pink") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("white") }),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("purple") }),
  ]);

  var obeliskMesh = new THREE.Mesh(obelisk, obeliskColor);
  //var obeliskMesh = TW.createMesh(obelisk);
  obeliskMeshOutOfScope = obeliskMesh;
  scene.add(obeliskMesh);
}
//allows obelisk to be removed by making it global
var obeliskMeshOutOfScope;

///create the material to change the color of the sides

createObelisk(towerWidth, towerHeight, pyramidWidth, pyramidHeight);

//rotate function will change the Y axis of the oblesik and rerender its frame
function rotate(time) {
  // Rotate the obelisk with 0.05 every step
  obeliskRotY -= 0.05;

  // Prevent obeliskRotY from increasing forever so that it stays in the range [0, 2*PI]
  if (obeliskRotY > 2 * Math.PI) {
    obeliskRotY -= 2 * Math.PI;
  }

  // Rotate the obelisk
  obeliskMeshOutOfScope.rotation.y = obeliskRotY;

  // Render the scene
  TW.render();

  // Continue the render loop
  requestAnimationFrame(rotate);
}

let obeliskRotY = 0;
// ================================================================
//
// We always need a renderer

var renderer = new THREE.WebGLRenderer();

/* We always need a camera; here we'll use a default orbiting camera.  The
third argument are the ranges for the coordinates, to help with setting up
the placement of the camera. They need not be perfectly accurate, but if
they are way off, your camera might not see anything, and you'll get a
blank canvas. */

TW.cameraSetup(renderer, scene, {
  minx: 0,
  maxx: 0,
  miny: -25,
  maxy: 800,
  minz: 0,
  maxz: 0,
});

// global variable for dimensions of obelisk
var sceneParams = {
  towerHeight: towerHeight,
  towerWidth: towerWidth,
  pyramidWidth: pyramidWidth,
  pyramidHeight: pyramidHeight,
};

// redrawObeliskt() is a callback function that changes the parameteres of the obelisk to match the slider
function redrawObeliskt() {
  scene.remove(obeliskMeshOutOfScope);
  createObelisk(
    sceneParams.towerWidth,
    sceneParams.towerHeight,
    sceneParams.pyramidWidth,
    sceneParams.pyramidHeight
  );
  TW.render();
}

var gui = new dat.GUI();
gui.add(sceneParams, "towerWidth", 55, 100).onChange(redrawObeliskt);
gui.add(sceneParams, "towerHeight", 500, 700).onChange(redrawObeliskt);
gui.add(sceneParams, "pyramidWidth", 34, 100).onChange(redrawObeliskt);
gui.add(sceneParams, "pyramidHeight", 55, 200).onChange(redrawObeliskt);

requestAnimationFrame(rotate);
