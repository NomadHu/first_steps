var ArmyMesh = function (army, map) {
	this.army = army;
	this.mesh;
	this.generateMesh(map);
};

ArmyMesh.prototype.generateMesh = function(map) {
	this.mesh = plannedMesh.clone();
	var vect = map.getDisplayPosition(this.army.pos);
	this.mesh.position.set(vect.x,vect.y,vect.z);
	this.mesh.userData.parent = this.army;
};

ArmyMesh.prototype.getMeshesToIntersect = function() {
	return [this.mesh];
};

ArmyMesh.prototype.dispose = function() {
	disposeNode(this.mesh);
};
