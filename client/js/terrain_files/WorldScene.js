var WorldScene = function (worldViewWidth, worldViewDepth) {	this.worldViewWidth = worldViewWidth;	this.worldViewDepth = worldViewDepth;		this.clock = new THREE.Clock();	this.raycaster = new THREE.Raycaster();	this.scene = new THREE.Scene();	this.mouse = new THREE.Vector2();	this.controls;	this.camera;	this.renderer;};WorldScene.prototype.init = function() {	this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );	this.scene = new THREE.Scene();		this.controls = new THREE.OrbitControls(this.camera);	this.controls.center.set( 0.0, 100.0, 0.0 );	this.controls.userPanSpeed = 100;		this.controls.center.y = 1000; //data[ worldHalfWidth + worldHalfDepth * worldWidth ] + 500;	this.camera.position.y =  this.controls.center.y + 2000;	this.camera.position.x = 2000;	this.scene.add(rollOverMesh);	return this.scene;};WorldScene.prototype.renderFirst = function() {	this.renderer = new THREE.WebGLRenderer();	this.renderer.setClearColor( 0xbfd1e5 );	this.renderer.setPixelRatio( window.devicePixelRatio );	this.renderer.setSize( window.innerWidth, window.innerHeight );	container.appendChild( worldScene.renderer.domElement );};WorldScene.prototype.render = function() {	this.controls.update( worldScene.clock.getDelta() );	this.renderer.render( worldScene.scene, worldScene.camera );};WorldScene.prototype.resize = function() {	worldScene.camera.aspect = window.innerWidth / window.innerHeight;	worldScene.camera.updateProjectionMatrix();	worldScene.renderer.setSize( window.innerWidth, window.innerHeight );}WorldScene.prototype.moveCursor = function(event) {	var intersect = this.getFirstIntersect(event, [map]);	if ( intersect ) {		rollOverMesh.position.set( 0, 0, 0 );		rollOverMesh.position.copy( intersect.point );	}}WorldScene.prototype.getFirstIntersect = function(event, worldObjects) {	this.mouse.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;	this.mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;	this.raycaster.setFromCamera( this.mouse, this.camera );	var meshes = [];	for(var i=0;i<worldObjects.length;i++) {		meshes = meshes.concat(worldObjects[i].getMeshesToIntersect());	}		// See if the ray from the camera into the world hits one of our meshes	var intersects = this.raycaster.intersectObjects( meshes );	// Toggle rotation bool for meshes that we clicked	if ( intersects.length > 0 ) {		return intersects[0];	}}