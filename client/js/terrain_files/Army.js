var Army = function (type, pos, movementPositions) {
	this.type = type
	this.pos = pos;
	this.next;
	this.parent = this;
	this.mesh;
	this.movements = [];
	var lastPosition = this;
	for ( var i = 0; i < movementPositions.length ; i++ ) {
		var movement = new Movement("existing", lastPosition, movementPositions[i]);
		this.movements.push(movement);
		lastPosition = movement;
	}
};

Army.prototype.addMovement = function (pos) {
	var lastMovement = this;
	if (this.movements.length>0) {
		lastMovement = this.movements[this.movements.length-1];
	}
	var movement = new Movement("new", lastMovement, pos);
	this.movements.push(movement);
	movement.display();
};

Army.prototype.updateMovement = function () {
	this.movements = [];
	var current = this.next;
	while(current) {
		this.movements.push(current);
		current = current.next;
	}
}

Army.prototype.remove = function () {
	for ( var i = 0; i < this.movements.length ; i++ ) {
		this.movements[i].removeWithoutUpdate();
	}
	this.dispose();
}

Army.prototype.display = function() {
	this.mesh = currentMesh.clone();
	var vect = map.getDisplayPosition(this.pos[0], this.pos[1]);
	this.mesh.position.set(vect.x,vect.y,vect.z);
	this.mesh.userData.parent = this;
	scene.add(this.mesh);
	for ( var i = 0; i < this.movements.length ; i++ ) {
		this.movements[i].display();
	}
};

Army.prototype.getMeshesToIntersect = function() {
	var meshes = [this.mesh];
	for ( var i = 0; i < this.movements.length ; i++ ) {
		meshes = meshes.concat(this.movements[i].getMeshesToIntersect());
	}
	return meshes;
};

Army.prototype.dispose = function() {
	for ( var i = 0; i < this.movements.length ; i++ ) {
		disposeNode(this.movements[i]);
	}
	scene.remove(this.mesh);
	disposeNode(this.mesh);
};
