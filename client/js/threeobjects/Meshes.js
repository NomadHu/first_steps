// rollOver
var rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );rollOverGeo.center();
var rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
var rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial );

// Current
var currentGeo = new THREE.BoxGeometry( 50, 50, 50 );currentGeo.center();
var currentMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, opacity: 0.0, transparent: false } );
var currentMesh = new THREE.Mesh( currentGeo, currentMaterial );

// Existing
var plannedGeo = new THREE.BoxGeometry( 50, 50, 50 );plannedGeo.center();
var plannedMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity: 0.0, transparent: false } );
var plannedLineMaterial = new THREE.LineBasicMaterial( { color : 0x00ff00, linewidth : 3 } );
var plannedArrowColor = 0x00ff00;
var plannedMesh = new THREE.Mesh( plannedGeo, plannedMaterial );
			
// New
var newGeo = new THREE.BoxGeometry( 50, 50, 50 );newGeo.center();
var newMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true } );
var newLineMaterial = new THREE.LineBasicMaterial( { color : 0x0000ff, linewidth : 3 } );
var newArrowColor = 0x0000ff;
var newMesh = new THREE.Mesh( newGeo, newMaterial );
