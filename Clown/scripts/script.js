//SphereGeometry(radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)

//TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)

// Colors and materials for the clown.
let earColor =  0x800080; 
let bodyColor = 0x00A6FF;//also the color for the arms and tophat 
let headColor = 0xB8FFE5; 
let feetColor = 0x22F0B2;// also color for the hands
let shoulderColor = 0xF022D8; //also color for the legs
let bodyMaterial = new THREE.MeshBasicMaterial({color: bodyColor});
let headMaterial = new THREE.MeshBasicMaterial({color: headColor});
let earMaterial = new THREE.MeshBasicMaterial({color: earColor});
let blackMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
let feetMaterial = new THREE.MeshBasicMaterial({color: feetColor});
let shoulderMaterial = new THREE.MeshBasicMaterial({color: shoulderColor});


/*
  createNose - create the nose of the clown with the color and size from the params Object
  @params {Object} params - holds all the information of the clown and we're grabbing only the parts related to the nose
  @return {Object} noseMesh - returns the nose mesh with the geometry and color
*/
function createNose(params) {
    let sphereDetail = params.sphereDetail || 10;
    let radius = params.noseRadius || 0.6;
    let noseGeometry = new THREE.SphereGeometry(radius,sphereDetail,sphereDetail);
    let noseMesh = new THREE.Mesh(noseGeometry, blackMaterial);
    return noseMesh;
}


/*
  addNose - place the nose at position to the head radius. 
  @params{Object} head - head contains the geometry and color of the head and is needed to know where to palce our nose
  @params{Object} params- holds all the information of the clown and we're grabbing only the parts related to the nose
  @return {Object} head - returns the head it recieve with the nose's position information
*/
function addNose(head,params) {
    let noseframe = new THREE.Object3D();
    let nose = createNose(params)
    let radius = params.headRadius || 2;
    nose.position.z = radius; 
    noseframe.add(nose);
    let angle = params.noseRotation || TW.degrees2radians(10);
    noseframe.rotation.x = angle;
    head.add(noseframe);
    return head;
}

/*
  createEar - creates the purple ear that be on the head of the clown
  @params {Object} params - holds all the information of the clown 
  and we're grabbing only the parts related to the ear
  @return {Object} ear - returns the ear mesh with the geometry and color and size
*/
function createEar(params) {
    let sphereDetail = params.sphereDetail || 10;
    let radius = params.earRadius || 0.6;
    let earGeometry = new THREE.SphereGeometry(radius,sphereDetail,sphereDetail);
    let ear = new THREE.Mesh(earGeometry, earMaterial);
    ear.scale.z = params.earScale || 0.5;
    return ear;
}

/*
  addEar - place the nose at position to the head radius. 
  @params{Object} head - head contains the geometry and color of the head and is needed to know where to palce our ear
  @params{Object} params- holds all the information of the clown and we're grabbing only the parts related to the ear
  @return {Object} head - returns the head it recieve with the ear's position information
*/
function addEar(head,params,side) {
    let earframe = new THREE.Object3D();
    let ear = createEar(params);
    let radius = params.headRadius || 2;
    let angle = params.earAngle || Math.PI;
    ear.position.x = side * radius;
    earframe.rotation.z = side * angle;
    //ear.rotation.z = side * angle;
    earframe.add(ear);
    head.add(earframe);
    //head.add(ear);
    return head;
}

/*
  createEye - creates the eye that be on the head of the clown
  @params {Object} params - holds all the information of the clown 
  and we're grabbing only the parts related to the eye
  @return {Object} eyeMesh - returns the eye mesh that holds the geometry and color of the eye
*/
function createEye(params) {
    let sphereDetail = params.sphereDetail || 10;
    let radius = params.eyeRadius || 0.3;
    let eyeGeometry = new THREE.SphereGeometry(.1*params.headRadius,sphereDetail,sphereDetail);
    let eyeMesh = new THREE.Mesh(eyeGeometry, blackMaterial);
    return eyeMesh;
}

/*
  addEye - place the eye at position to the head radius. The angle on X and Y used to position 
  @params{Object} head - head contains the geometry and color of the head and is needed to know where to palce our eye
  @params{Object} params- holds all the information of the clown and we're grabbing only the parts related to the eye
  @params{number} side - Tells the function which side(left=-1 or right=1) to place the eye
  @return {Object} head - returns the head it recieve with the eye's position information
*/
function addEye(head,params,side) {
    let eyeframe = new THREE.Object3D();
    let eye = createEye(params);
    let radius = params.headRadius || 2;
    eye.position.z = radius; // within the eyeframe
    let angleX = params.eyeAngleX || -Math.PI/6;
    let angleY = params.eyeAngleY || Math.PI/6;
    eyeframe.rotation.x = angleX;
    eyeframe.rotation.y = side * angleY;
    eyeframe.add(eye);
    head.add(eyeframe);
    return head;
}


/*
  createMouth - create a tubed mouth arc on the head of the clown
  @params{Object} head - the head of the clown that holds referance to radius and position
  @params{Object} params - hold all clown information, we use to grab information about head
*/
function createMouth(head,params){
  //TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
   var mouthGeometry = new THREE.TorusGeometry(0.2*params.headRadius, 0.04*params.headRadius, 30, 30, 1.8);
   var mouth = new THREE.Mesh(mouthGeometry, shoulderMaterial);
   mouth.position.set(0, -0.35*params.headRadius, 0.9*params.headRadius);
   mouth.rotation.set(Math.PI, 0, Math.PI/8);
   head.add(mouth);

}


/*
  createHead - creates the head of the clown then call function to add the feature like eye, ears, and nose
  @params{Object} params -  holds all the information of the clown and we're grabbing only the parts related to the head
  @return {Object} head - returns the head with the eyes, ears, and nose.
*/
function createHead(params) {
    let head = new THREE.Object3D();
    let sphereDetail = params.sphereDetail || 10;
    let radius = params.headRadius || 2;
    let headGeometry = new THREE.SphereGeometry(radius, sphereDetail, sphereDetail);
    let headMesh = new THREE.Mesh(headGeometry, headMaterial);
    head.add(headMesh);

        addNose(head,params);

        addEar(head,params,1); //right ear
        addEar(head,params,-1); //left ear
        
        addEye(head,params,1); //right eye
        addEye(head,params,-1); //left eye
  
        createMouth(head,params)
        createHat(head,params)
       
    return head;
}

/*
  createHat - creates the hat of the clown using Cylinder
  @params{Object} head - clown head with the Mesh and position
  @params{Object} params - used to grab information about clown
*/
function createHat(head,params){
   let hat = new THREE.Object3D();
   let topGeometry = new THREE.CylinderGeometry(params.headRadius, 0.8*params.headRadius, 1.2*params.headRadius, params.cylinderDetail, params.cylinderDetail);
   let top = new THREE.Mesh(topGeometry, bodyMaterial);
   let brimGeom = new THREE.CylinderGeometry(1.3*params.headRadius, 1.3*params.headRadius, 0.05*params.headRadius, params.cylinderDetail, params.cylinderDetail);
   let brim = new THREE.Mesh(brimGeom, bodyMaterial);
   hat.add(top);
   brim.position.y = -0.6*params.headRadius;
   hat.add(brim);
   hat.position.set(0.2*params.headRadius, 1.2*params.headRadius, 0);
   hat.rotation.set(-Math.PI/20, 0, -Math.PI/20);
   head.add(hat);
}
//======================= Head info Above ^ =======================================

    //Gap for readablitity

//======================= Body info Below v =======================================

/*
  createArm - will create a cylinderical arm of the clown
  @parmas{Object} params - holds all the information of the clown 
  and we're grabbing only the parts related to the arms
  @return{Object} arm - return the arm object with the color, size, and posisition
*/
function createArm(params) {
    let arm = new THREE.Object3D();
    let top = params.armRadiusTop || 0.6;
    let bot = params.armRadiusBottom || 0.6;
    let length = params.armLength || 5;
    let cylinderDetail  = params.cylinderDetail || 10;
    var armGeom = new THREE.CylinderGeometry(top,bot,length,cylinderDetail);
    var armMesh = new THREE.Mesh(armGeom, bodyMaterial );
    armMesh.position.y = -length/2;
    arm.add(armMesh);
    return arm;
}

/*
  addArm - will add a arm of the clown to the body
  @parmas{Object} body - contains the geometry and color of the body and is needed to know where to place the arm
  @parmas{Object} params - holds all the information of the clown 
  and we're grabbing information for the arm
  @parmas{Number} side - tells the function what side you're refering to left(-1) or right(1)
*/
function addArm(body,params,side) {
    let arm = createArm(params);
    let radius = params.bodyRadius+.5 || 3;
    let scale = params.bodyScaleY || 2; 
    let shoulderWidth = params.shoulderWidth  || radius * 0.5;
    let shoulderHeight = params.shoulderHeight || scale * radius * 0.7;
    arm.position.set( side * shoulderWidth, shoulderHeight, 0 );
    arm.rotation.z = side * Math.PI/6;
    body.add(arm);
}

/*
  createShoulder - will create a sphere shoulder of the clown
  @parmas{Object} params - holds all the information of the clown 
  and we're grabbing information of the ear and sphere for shoulder creation 
  @return{Object} shoudler - return the shoulder object with the color and size
*/
function createShoulder(params)
{
    let sphereDetail = params.sphereDetail || 10;
    let shoulderGeometry = new THREE.SphereGeometry(params.shoulderRadius, sphereDetail, sphereDetail);
    let shoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial); 
    let radius = params.earRadius || 0.6;
    shoulder.scale.z = params.earScale || 0.5;
    return shoulder;
}


/*
  addShoulder - will add a shoulder of the clown to the body
  @parmas{Object} body - contains the geometry and color of the body and is needed to know where to place our shoulder
  @parmas{Object} params - holds all the information of the clown 
  and we're grabbing information for shoulder positioning 
  @parmas{Number} side - tells the function what side you're refering to left(-1) or right(1)
  @return{Object} body - return the body object with the color, size, and posisition
*/
function addShoulder(body,params,side) {
    let shoulderframe = new THREE.Object3D();
    let shoulder = createShoulder(params);
    let radius = params.bodyRadius+1.2 || 2;//offset the shoulder from the body by a few
    let angle =  params.shoulderAngle || -4* Math.PI/3;  
    shoulder.position.x = side * radius;
    shoulder.rotation.y = 90
    shoulderframe.rotation.z = side * angle;
    shoulderframe.add(shoulder);
    body.add(shoulderframe);
    return body;
}



/*
  createHand - create the hand of the clown and uses only half the sphere
  @params{Object} params - holds all the information of the clown, used to grab information to create hands
  @return{Object} hand - return the hand object with the color, position, and size
*/
function createHand(parmas){
    let sphereDetail = params.sphereDetail || 10;
    let radius = params.handRadius || 0.6;
    let handGeometry = new THREE.SphereGeometry(radius, sphereDetail, sphereDetail);
    let hand = new THREE.Mesh(handGeometry, feetMaterial);
    hand.scale.z = params.handScale || 1;
    return hand;
}

/*
  addHand - adds hands to the clown at the end of the arm
  @params{Object} body - holds information of the clown's body, its position and Mesh
  @pramas{Object} parmas - hold all the clown's information used to position the hands
  @params{Number} number - referance to left (-1) or right(1)
  @return{Object} body - return the body with the hand attached
*/
function addHand(body,params,side) {
    let handframe = new THREE.Object3D();
    let hand = createHand(params);
    let radius = params.handRadius || 1;
    let angle = Math.PI/2 
    hand.position.x = side * (params.armLength-.9)
    hand.position.y = params.bodyRadius - (params.armLength-1)
    handframe.add(hand);
    body.add(handframe);
    return body;
}

/*
  createLeg - will create a cylinderical arm of the clown
  @parmas{Object} params - holds all the information of the clown 
  and we're grabbing only the parts related to the leg
  @return{Object} leg - return the arm object with the color, size, and posisition
*/
function createLeg(params) {
    let leg = new THREE.Object3D();
    let top = params.legRadiusTop || 0.7;
    let bot = params.legRadiusBottom || 0.6;
    let length = params.legLength || 5;
    let cylinderDetail  = params.cylinderDetail || 10;
    var legGeom = new THREE.CylinderGeometry(top,bot,length,cylinderDetail);
    var legMesh = new THREE.Mesh( legGeom, shoulderMaterial );
    legMesh.position.y = -length/2;
    leg.add(legMesh);
    return leg;
}
    
/*
  addLeg - will add a shoulder of the clown to the body
  @parmas{Object} body - contains the geometry and color of the body and is needed to know where to place our shoulder
  @parmas{Object} params - holds all the information of the clown 
  and we're grabbing information for shoulder positioning 
  @parmas{Number} side - tells the function what side you're refering to left(-1) or right(1)
  @return{Object} leg - return the leg object with the color, size, and posisition
*/
function addLeg(body,params,side) {
    let leg = createLeg(params)
    var radius = params.bodyRadius || 3;
    var scale = params.bodyScaleY || 2; 
    var hipWidth = side * params.hipWidth  || side * radius * 0.5;
    var hipHeight = params.hipHeight || scale * radius * -0.7;
    leg.position.set( hipWidth, hipHeight, 0 );
    leg.rotation.x = params.legRotationX;
    leg.rotation.z = side * params.legRotationZ;
    body.add(leg);
    return leg;
}

/*
  createFeet - create the feet of the clown and uses only half the sphere
  @params{Object} params - holds all the information of the clown and we're grabbing information for the feet
  @return{Object} feet - return the feet object with the color, position, and size
*/
function createFeet(parmas){
    let sphereDetail = params.sphereDetail || 10;
    let radius = params.feetRadius || 0.6;
    let feetGeometry = new THREE.SphereGeometry(radius, sphereDetail, sphereDetail, 0, 6.3, 0, 1.5);
    let feet = new THREE.Mesh(feetGeometry, feetMaterial);
    feet.scale.z = params.feetScale || 0.5;
    return feet;
}

/*
  addFeet - places the feet on the clown's body
  @params{Object} body - contains the body's Mesh and position
  @params{Object} params - holds all clown information used to position feet
  @params{Number} side - referance to sides left = -1 or right = 1
  @return{Object} body - return the body with the feet attached
*/
function addFeet(body,params,side) {
    let feetframe = new THREE.Object3D();
    let feet = createFeet(params);
    let radius = params.legRadiusBottom+9 || 2;
    let angle =  4* Math.PI/3
    feet.position.set(side * params.hipWidth,params.hipHeight-params.legLength,0)
    feetframe.add(feet);
    body.add(feetframe);
    return body;
}

/*
  createBody - Create the Clown body and calls function to create arm, shoulders, and legs
  @params {Object} params- holds all the information of the clown and we're grabbing only the parts related to the body
  return {Object} body - return the clown body along with the limbs, shoulder,hands, and feet 
*/
function createBody(params) {
    let body = new THREE.Object3D();
    let radius = params.bodyRadius || 3;
    let sphereDetail = params.sphereDetail || 20;
    let bodyGeom = new THREE.SphereGeometry(radius,sphereDetail,sphereDetail);
    let bodyMesh = new THREE.Mesh(bodyGeom, bodyMaterial);
    let scale = params.bodyScaleY || 2;
    bodyMesh.scale.y = scale;
    body.add(bodyMesh);

         addArm(body,params,1);//right arm
         addArm(body,params,-1);//left arm
    
         addShoulder(body,params,1);//left shoulder
         addShoulder(body,params,-1);//right shoulder
         
         addHand(body,params,1); //left hand
         addHand(body,params,-1); //right hand
  
         addLeg(body,params,1);//left leg
         addLeg(body,params,-1);//right leg
  
         addFeet(body,params,1); //left foot
         addFeet(body,params,-1); //right foot
  
        
  
    return body;
}

/*
  yellowOrigin - create a yellow sphere between the feet of the clown and place it on canvas
  @parmas{Object} params - holds clown information, we need the feet and body radius to get proper height
*/
function yellowOrigin(params)
{
  
  let sphereDetail = params.sphereDetail
  const geometry = new THREE.SphereGeometry(.5, sphereDetail, sphereDetail);
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  const sphere = new THREE.Mesh( geometry, material );
  sphere.position.x = 0
  sphere.position.y = -(params.legLength+params.bodyRadius)
  scene.add( sphere );
}


/*
  createClown - creates the clown by creating the head and the body
  @params{Object} params - holds all the clown information for creating the heads, facial features, body, and limbs
  @return{Object} clown - returns the clown object that has the head, body, and all the features
*/
function createClown(params) {
    let clown = new THREE.Object3D();
    let body = createBody(params);
    clown.add(body);
    let head = createHead(params);
    let bodyScale = params.bodyScaleY || 2;
    let bodyRadius = params.bodyRadius || 3;
    let headRadius  = params.headRadius || 1;
    head.position.y = bodyScale*bodyRadius+headRadius;
    clown.add(head);
    return clown;
}

//Holds all the clowns informations, change values to modify the clown
let params = {
    sphereDetail: 32,
    cylinderDetail: 10,
    nose: true,
    noseRadius: 0.3,
    noseRotation: TW.degrees2radians(1),
    ears: true,
    earRadius: 1,
    earScale: 1,
    earAngle: Math.PI,
    eyes: true,
    eyeRadius: 0.3,
    eyeAngleX: -Math.PI/6,
    eyeAngleY: +Math.PI/6,
    shoulder:true,
    shoulderRadius:1,
    shoulderAngle:-4* Math.PI/3,
    armLength: 6,
    armRadiusTop: .5,
    armRadiusBottom: .6,
    handRadius:1,
    handScale:1,
    legRadiusTop: .5,
    legRadiusBottom: .5,
    legLength: 6,
    legRotationX: -TW.degrees2radians(0),
    legRotationZ: TW.degrees2radians(0),
    hipWidth: 1.5,
    hipHeight: -4,
    feetRadius: 1.2,
    feetScale: 1,
    feetAngle: Math.PI/2,
    headRadius: 2.5,
    bodyRadius: 3.3,
    bodyScaleY: 1.5,
};

let renderer = new THREE.WebGLRenderer();

let scene = new THREE.Scene();
                        
let clown = createClown(params);

yellowOrigin(params)
scene.add(clown)

TW.cameraSetup(renderer,
               scene,
               {minx: -5, maxx: 5,
                miny: -10, maxy: 15,
                minz: -5, maxz: 5});

