var MovementMesh = function (movement, map) {
	this.movement = movement;
	this.mesh;
	this.generateMesh(map);
};

MovementMesh.prototype.generateMesh = function (map) {
	var placeMesh;
	var lineMaterial;
	var arrowColor;
	
	if (this.movement.data.type=="planned") {
		placeMesh = plannedMesh;
		lineMaterial = plannedLineMaterial;
		arrowColor = plannedArrowColor;
	} else {
		placeMesh = newMesh;
		lineMaterial = newLineMaterial;
		arrowColor = newArrowColor;
	}
	var vect1 = map.getDisplayPosition(this.movement.from);
	var vect2 = map.getDisplayPosition(this.movement.to);
	var curve = new THREE.CubicBezierCurve3(
						new THREE.Vector3(vect1.x,vect1.y+25,vect1.z),
						new THREE.Vector3(vect1.x,vect1.y+175,vect1.z),
						new THREE.Vector3(vect2.x,vect2.y+175,vect2.z),
						new THREE.Vector3(vect2.x,vect2.y+25,vect2.z)
	);

	var geometry = new THREE.Geometry();
	geometry.vertices = curve.getPoints( 50 );
			
	var from = geometry.vertices[40];
	var to = geometry.vertices[50];
	var direction = to.clone().sub(from);
	var length = direction.length();
	var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, arrowColor, 60, 30 );
	arrowHelper.userData.parent = this.movement;

	var curveObject = new THREE.Line( geometry, lineMaterial );
	curveObject.userData.parent = this.movement;
	
	var box = placeMesh.clone();
	var vect = map.getDisplayPosition(this.movement.to);
	box.position.set(vect.x,vect.y,vect.z);
	box.userData.parent = this.movement;
	
	// Group the objects
	this.mesh = new THREE.Object3D();//create an empty container
	this.mesh.add( arrowHelper );
	this.mesh.add( curveObject );
	this.mesh.add( box );
	this.mesh.userData.parent = this.movement;
	return this.mesh;
};

MovementMesh.prototype.getMeshesToIntersect = function() {
	return this.mesh.children;
};

MovementMesh.prototype.dispose = function() {
  disposeNode(this.mesh);
};
