var Movement = function (type, previous, pos) {
	this.type = type;
	this.previous = previous;
	this.previous.next = this;
	this.parent = this.previous.parent;
	this.next;
	this.pos = pos;
	this.meshes = [];
};

Movement.prototype.remove = function () {
	this.removeWithoutUpdate();
	this.parent.updateMovement();
}

Movement.prototype.removeWithoutUpdate = function () {
	if (this.next) {
		this.next.remove();
	}
	this.previous.next = undefined;
	this.dispose();
}

Movement.prototype.display = function () {
	var placeMesh;
	var lineMaterial;
	var arrowColor;
	if (this.type=="existing") {
		placeMesh = existingMesh;
		lineMaterial = existingLineMaterial;
		arrowColor = existingArrowColor;
	} else {
		placeMesh = newMesh;
		lineMaterial = newLineMaterial;
		arrowColor = newArrowColor;
	}
	var vect1 = map.getDisplayPosition(this.previous.pos[0], this.previous.pos[1]);
	var vect2 = map.getDisplayPosition(this.pos[0], this.pos[1]);
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
	this.meshes.push(arrowHelper);
	arrowHelper.userData.parent = this;
	scene.add( arrowHelper );

	var curveObject = new THREE.Line( geometry, lineMaterial );
	this.meshes.push(curveObject);
	curveObject.userData.parent = this;
	scene.add(curveObject);
	
	var box = placeMesh.clone();
	var vect = map.getDisplayPosition(this.pos[0], this.pos[1]);
	box.position.set(vect.x,vect.y,vect.z);
	box.userData.parent = this;
	this.meshes.push(box);
	scene.add(box);
};

Movement.prototype.getMeshesToIntersect = function() {
	return [this.meshes[2]];
};

Movement.prototype.dispose = function() {
	for (var i=0;i<this.meshes.length;i++) {
		scene.remove(this.meshes[i]);
		disposeNode(this.meshes[i]);
    }
};
