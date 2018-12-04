//
var scene,camera,renderer,controls;
var count = 0;
var cameraPosTgt = -100;
var cameraPosZTgt = -150;
var light1, light2, light3;
var house_mat, island_mat, landmarks_mat, roulette_mat,roulette_wheel_mat, water_mat, clouds_mat, cranes_mat, sail_mat;
var house_img, island_img, landmarks_img, roulette_img,roulette_wheel_img, water_img, clouds_img, cranes_img, sail_img;
var house_obj, island_obj, landmarks_obj, roulette_obj,roulette_wheel_obj, water_obj, clouds_obj, cranes_obj;
var sail1_obj, sail2_obj, sail3_obj, sail4_obj;
var containerA_mat, containerA_img;
var containerB_mat, containerB_img;
var container1_obj, container2_obj, container3_obj, container4_obj;
var itmArr = [];
var vx, vy, vz;
var loader;
var curClickTgt;
var raycaster;
var moveCamera = 0;
var speed = 33;
var cameraTgts = {
  ggbridge:{
    x:-548, y:65, z:-680,
    rotX:-2.88, rotY:-0.66, rotZ:-2.97,
    focal:24.35
  },
  carousel:{
    x: -172.63767521150226, y: 288.7501996856718, z: 135.95344217390584,
    rotX:-1.55, rotY:0.00, rotZ:0.02,
    focal:26
  }
}
//
init();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 0.1, 100000 );
    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    controls = new THREE.OrbitControls(camera);

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera.position.set(-548,65,-680);
  camera.rotation.set(-2.88,-0.66,-2.97);
  camera.setFocalLength(24.35);
  //camera.up = new THREE.Vector3(0,1,0);
  raycaster = new THREE.Raycaster();
  initLoadingManager();
  initObjects();
  initTextures();
  initLights();
  // initInteraction();
  // render();
}


function initObjects(){
  var jsonLoader = new THREE.JSONLoader();
  // var house_obj, island_obj, landmarks_obj, roulette_obj, water_obj;

  jsonLoader.load('img/sf_house.js', function (geometry) {
      house_obj = new THREE.Mesh(geometry, house_mat);
      house_obj.name = "house_obj";
      scene.add(house_obj);
  });

  jsonLoader.load('img/sf_island.js', function (geometry) {
      island_obj = new THREE.Mesh(geometry, island_mat);
      island_obj.name = "island_obj";
      scene.add(island_obj);
  });
  //
  jsonLoader.load('img/sf_landmarks.js', function (geometry) {
      landmarks_obj = new THREE.Mesh(geometry, landmarks_mat);
      landmarks_obj.name = "landmarks_obj";
      scene.add(landmarks_obj);
  });
  jsonLoader.load('img/sf_roulette.js', function (geometry) {
      roulette_obj = new THREE.Mesh(geometry, roulette_mat);
      roulette_obj.name = "roulette_obj";
     scene.add(roulette_obj);
  });
  //
  jsonLoader.load('img/sf_roulette_wheel.js', function (geometry) {
      roulette_wheel_obj = new THREE.Mesh(geometry, roulette_wheel_mat);
      roulette_wheel_obj.name = "roulette_wheel_obj";
      scene.add(roulette_wheel_obj);
  });
  //
  jsonLoader.load('img/sf_cranes.js', function (geometry) {
      cranes_obj = new THREE.Mesh(geometry, cranes_mat);
      cranes_obj.name = "cranes_obj";
      scene.add(cranes_obj);
  });
  //
  jsonLoader.load('img/sf_clouds.js', function (geometry) {
      clouds_obj = new THREE.Mesh(geometry, clouds_mat);
      clouds_obj.name = "clouds_obj";
      scene.add(clouds_obj);
  });
  //
  ////////////////
  jsonLoader.load('img/sf_sail1.js', function (geometry) {
      sail1_obj = new THREE.Mesh(geometry, sail_mat);
      sail1_obj.name = "sail1_obj";
      scene.add(sail1_obj);
  });
  //
  jsonLoader.load('img/sf_sail2.js', function (geometry) {
      sail2_obj = new THREE.Mesh(geometry, sail_mat);
      sail2_obj.name = "sail2_obj";
      scene.add(sail2_obj);
  });
  //
  jsonLoader.load('img/sf_sail3.js', function (geometry) {
      sail3_obj = new THREE.Mesh(geometry, sail_mat);
      sail3_obj.name = "sail3_obj";
      scene.add(sail3_obj);
  });
  //
  jsonLoader.load('img/sf_sail4.js', function (geometry) {
      sail4_obj = new THREE.Mesh(geometry, sail_mat);
      sail4_obj.name = "sail4_obj";
      scene.add(sail4_obj);
  });
  //
  jsonLoader.load('img/sf_sail5.js', function (geometry) {
      sail5_obj = new THREE.Mesh(geometry, sail_mat);
      sail5_obj.name = "sail5_obj";
      scene.add(sail5_obj);
  });
  //
  jsonLoader.load('img/sf_container1.js', function (geometry) {
      container1_obj = new THREE.Mesh(geometry, containerA_mat);
      container1_obj.name = "container1_obj";
      scene.add(container1_obj);
  });
  //
  jsonLoader.load('img/sf_container2.js', function (geometry) {
      container2_obj = new THREE.Mesh(geometry, containerA_mat);
      container2_obj.name = "container2_obj";
      scene.add(container2_obj);
  });
  //
  jsonLoader.load('img/sf_container3.js', function (geometry) {
      container3_obj = new THREE.Mesh(geometry, containerB_mat);
      container3_obj.name = "container3_obj";
      scene.add(container3_obj);
  });
  //
  jsonLoader.load('img/sf_container4.js', function (geometry) {
      container4_obj = new THREE.Mesh(geometry, containerB_mat);
      container4_obj.name = "container4_obj";
      scene.add(container4_obj);
  });
  //
  ////////////////
  jsonLoader.load('img/sf_water.js', function (geometry) {
      water_obj = new THREE.Mesh(geometry, water_mat);
      water_obj.name = "water_obj";
      scene.add(water_obj);
      render();
  });
}

function initTextures(){
  // var house_mat, island_mat, landmarks_mat, roulette_mat, water_mat;
  island_mat = new THREE.MeshPhongMaterial({});
  house_mat = new THREE.MeshPhongMaterial({});
  landmarks_mat = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide
  });
  roulette_mat = new THREE.MeshPhongMaterial({});
  roulette_wheel_mat = new THREE.MeshPhongMaterial({});
  cranes_mat = new THREE.MeshPhongMaterial({});
  clouds_mat = new THREE.MeshPhongMaterial({
    color:0xddddff
  });
  sail_mat = new THREE.MeshPhongMaterial({});
  containerA_mat = new THREE.MeshPhongMaterial({});
  containerB_mat = new THREE.MeshPhongMaterial({});
  water_mat = new THREE.MeshPhongMaterial({
    transparent:true,
    shininess:9,
    specular:0xEFC099,
    opacity:0.8
  });

  var island_loader = new THREE.TextureLoader().load('img/tex/sf_island.jpg');
  island_loader.wrapS = island_loader.wrapT = THREE.RepeatWrapping;
  island_loader.repeat.set(1,1);
  island_mat.map = island_loader;
  //
  var house_loader = new THREE.TextureLoader().load('img/tex/sf_house.jpg');
  house_loader.wrapS = house_loader.wrapT = THREE.RepeatWrapping;
  house_loader.repeat.set(1,1);
  house_mat.map = house_loader;
  //
  var landmarks_loader = new THREE.TextureLoader().load('img/tex/sf_landmarks.jpg');
  landmarks_loader.wrapS = landmarks_loader.wrapT = THREE.RepeatWrapping;
  landmarks_loader.repeat.set(1,1);
  landmarks_mat.map = landmarks_loader;
  //
  var roulette_loader = new THREE.TextureLoader().load('img/tex/sf_roulette.jpg');
  roulette_loader.wrapS = roulette_loader.wrapT = THREE.RepeatWrapping;
  roulette_loader.repeat.set(1,1);
  roulette_mat.map = roulette_loader;
  //
  var roulette_wheel_loader = new THREE.TextureLoader().load('img/tex/sf_roulette_wheel.jpg');
  roulette_wheel_loader.wrapS = roulette_wheel_loader.wrapT = THREE.RepeatWrapping;
  roulette_wheel_loader.repeat.set(1,1);
  roulette_wheel_mat.map = roulette_wheel_loader;
  //
  var water_loader = new THREE.TextureLoader().load('img/tex/sf_water.jpg');
  water_loader.wrapS = water_loader.wrapT = THREE.RepeatWrapping;
  water_loader.repeat.set(1,1);
  water_mat.map = water_loader;
  //
  var cranes_loader = new THREE.TextureLoader().load('img/tex/sf_cranes.jpg');
  cranes_loader.wrapS = cranes_loader.wrapT = THREE.RepeatWrapping;
  cranes_loader.repeat.set(1,1);
  cranes_mat.map = cranes_loader;
  //
  var sail_loader = new THREE.TextureLoader().load('img/tex/sf_sail.jpg');
  sail_loader.wrapS = sail_loader.wrapT = THREE.RepeatWrapping;
  sail_loader.repeat.set(1,1);
  sail_mat.map = sail_loader;
  //
  var containerA_loader = new THREE.TextureLoader().load('img/tex/sf_containerA.jpg');
  containerA_loader.wrapS = containerA_loader.wrapT = THREE.RepeatWrapping;
  containerA_loader.repeat.set(1,1);
  containerA_mat.map = containerA_loader;
  //
  var containerB_loader = new THREE.TextureLoader().load('img/tex/sf_containerB.jpg');
  containerB_loader.wrapS = containerB_loader.wrapT = THREE.RepeatWrapping;
  containerB_loader.repeat.set(1,1);
  containerB_mat.map = containerB_loader;
  //

}

function initLights(){
  light1 = new THREE.AmbientLight(0x999999, 0.75);
  light1.position.set(2133,2500,-2500);

  scene.add(light1);

  light2 = new THREE.PointLight(0xffffff, 0.25);
  light2.position.set(2500,-1470,2310);

  scene.add(light2);

  light3 = new THREE.PointLight(0xffffff, 0.75);
  light3.position.set(-2500,2500,2310);

  scene.add(light3);


}

//
function render() {
  requestAnimationFrame( render );

  update();

  renderer.render(scene, camera);
};

function initInteraction(){
    window.addEventListener('mousedown', function(e){
        e.preventDefault();
        var cx = e.clientX;
        var cy = e.clientY;
        mouseDown(e, cx, cy);
    }, false);

    window.addEventListener('mouseup', function(e){
        mouseUp(e);
    }, false);

    window.addEventListener('touchstart', function(e){
      e.preventDefault();
      var cx = e.targetTouches[0].pageX;
      var cy = e.targetTouches[0].pageY;
      mouseDown(e, cx, cy);
    }, false);


    window.addEventListener('touchend', function(e){
      e.preventDefault();
      mouseUp(e);
    }, false);


}

function initLoadingManager(){
  THREE.DefaultLoadingManager.onStart = function ( url, itemsLoaded, itemsTotal ) {
    // console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

THREE.DefaultLoadingManager.onLoad = function () {
  console.log( 'Loading Complete! ');
};


THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
  console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

THREE.DefaultLoadingManager.onError = function ( url ) {
  console.log( 'There was an error loading ' + url );
};
}

function mouseDown(e, cx, cy){
  // console.log("mouseDown", cx, cy);
  moveCamera++;
  if(moveCamera>2){
    moveCamera=1;
  }
}

//
function mouseUp(e){
  if(curClickTgt){
    // deActivateItem(curClickTgt);
  }
}

function spinWheel(tgt){
  spinActive=true;
}

function update(){
  if(moveCamera==1){

    camera.position.x += (cameraTgts.carousel.x-camera.position.x)/speed;
    camera.position.y += (cameraTgts.carousel.y-camera.position.y)/speed;
    camera.position.z += (cameraTgts.carousel.z-camera.position.z)/speed;
    //
    camera.rotation.x += (cameraTgts.carousel.rotX-camera.rotation.x)/(speed*1.5);
    camera.rotation.y += (cameraTgts.carousel.rotY-camera.rotation.y)/(speed*1.5);
    camera.rotation.z += (cameraTgts.carousel.rotZ-camera.rotation.z)/(speed*1.5);
    // var num = camera.focalLength;
    // num+=(cameraTgts.carousel.focal-num)/speed;
    // camera.setFocalLength(num);
  }else if (moveCamera==2) {

      camera.position.x += (cameraTgts.ggbridge.x-camera.position.x)/speed;
      camera.position.y += (cameraTgts.ggbridge.y-camera.position.y)/speed;
      camera.position.z += (cameraTgts.ggbridge.z-camera.position.z)/speed;
      //
      camera.rotation.x += (cameraTgts.ggbridge.rotX-camera.rotation.x)/(speed*1.5);
      camera.rotation.y += (cameraTgts.ggbridge.rotY-camera.rotation.y)/(speed*1.5);
      camera.rotation.z += (cameraTgts.ggbridge.rotZ-camera.rotation.z)/(speed*1.5);
      // var num = camera.focalLength;
      // num+=(cameraTgts.carousel.focal-num)/speed;
      // camera.setFocalLength(num);

  }
  // light1.position.x = Math.sin(count)*4100+500;
  // light2.position.x = Math.cos(count)*3100+500;
  count+=0.03;
  // controls.update();
  updateCamera();
}

function checkTarget(rot){
  var deg = Math.abs(Math.floor(toDeg(rot)%360));
  console.log((deg%12));
}

function updateCamera(){
      //camera.lookAt(new THREE.Vector3(0,0,-1110));
}

function getRaycastObj(cx,cy){
  var mouseVect = {
  x: 2 * (cx / window.innerWidth) - 1,
  y: 1- 2 * (cy / window.innerHeight)};
  raycaster.setFromCamera(mouseVect, camera);
  var intersects = raycaster.intersectObjects([wheel]);
    if(intersects.length>0){
      var obj = intersects[0].object;
      return obj;
    }else{
      return null;
    }
}

function toRad(deg){
  return deg*Math.PI/180;
}

function toDeg(rad){
  return rad*180/Math.PI;
}

function randNum(n){
  var p = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
  return p*n;
}
