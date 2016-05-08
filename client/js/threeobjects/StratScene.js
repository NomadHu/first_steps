var StratScene = function () {
	this.clock;
	this.camera;
	this.controls;
	this.scene;
	this.renderer;
	this.armyMeshes;
	this.armyMeshesToIntersect = [];
	this.movementMeshes;
	this.movementMeshesToIntersect = [];
	this.terrainMesh;
	this.terrainMeshesToIntersect = [];
	this.rolloverMesh;
	this.mouse;
	this.raycaster;
	this.rollOverMesh;
};

// Add a new movement at the end of the list
StratScene.prototype.init = function (contW, contH, rootElement) {
	// Clock
	this.clock = new THREE.Clock();
				
	// Camera
	this.camera = new THREE.PerspectiveCamera( 60, contW / contH, 1, 20000 );
	this.camera.position.y = 3000;
	this.camera.position.x = 2000;
	this.camera.position.z = 1800;
					
	// Controls
	this.controls = new THREE.OrbitControls(this.camera,rootElement);
	this.controls.center.set( 0.0, 100.0, 0.0 );
	this.controls.userPanSpeed = 100;
	this.controls.center.y = 1000;
					
	// Scene
	this.scene = new THREE.Scene();
			
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setClearColor( 0xbfd1e5 );
	this.renderer.setSize( contW, contH );
	
	// Mouse
	this.mouse = new THREE.Vector2();
	
	// Raycaster
	this.raycaster = new THREE.Raycaster();
	
	// RollOverMesh
	this.rollOverMesh = rollOverMesh.clone();
	this.scene.add(this.rollOverMesh);
	
	// element is provided by the angular directive
	rootElement.appendChild( this.renderer.domElement );
};

StratScene.prototype.resizeCanvas = function (contW, contH) {
	this.camera.aspect = contW / contH;
	this.camera.updateProjectionMatrix();
	
	this.renderer.setSize( contW, contH );
};

StratScene.prototype.refreshArmies = function (armies) {
	if (!armies || !this.terrainMesh) {
		return;
	}
	if (this.armyMeshes) {
		for ( var i = 0; i < this.armyMeshes.length ; i++ ) {
			this.scene.remove(this.armyMeshes[i].mesh);
			this.armyMeshes[i].dispose();
		}
	}

	this.armyMeshes = [];
	this.armyMeshesToIntersect = [];
	for (var i in armies) {
		if (armies[i] instanceof Army) {
	//	for ( var i = 0; i < armies.length ; i++ ) {
			var armyMesh = new ArmyMesh(armies[i], this.terrainMesh);
			this.armyMeshes.push(armyMesh);
			this.armyMeshesToIntersect = this.armyMeshesToIntersect.concat(armyMesh.getMeshesToIntersect());
			this.scene.add(armyMesh.mesh);
		}
	}
};

StratScene.prototype.refreshMovements = function (movements) {
	if (!movements || !this.terrainMesh) {
		return;
	}
	if (this.movementMeshes) {
		for ( var i = 0; i < this.movementMeshes.length ; i++ ) {
			this.scene.remove(this.movementMeshes[i].mesh);
			this.movementMeshes[i].dispose();
		}
	}

	this.movementMeshes = [];
	this.movementMeshesToIntersect = [];
	for (var i in movements) {
		if (movements[i][0] instanceof Movement) {
			for ( var j = 0; j < movements[i].length ; j++ ) {
				var movementMesh = new MovementMesh(movements[i][j], this.terrainMesh);
				this.movementMeshes.push(movementMesh);
				this.movementMeshesToIntersect = this.movementMeshesToIntersect.concat(movementMesh.getMeshesToIntersect());
				this.scene.add(movementMesh.mesh);					
			}
		}
	}
};


StratScene.prototype.refreshMap = function (map, heightStretch, widthStretch, viewWidth, viewDepth) {
	if (!map) {
		return;
	}
	if (this.terrainMesh) {
		this.scene.remove(this.terrainMesh.mesh);
		this.terrainMesh.dispose();
	}
	this.terrainMesh = new TerrainMesh(map, heightStretch, widthStretch, viewWidth, viewDepth);
	this.terrainMeshesToIntersect = [];
	this.terrainMeshesToIntersect = this.terrainMeshesToIntersect.concat(this.terrainMesh.getMeshesToIntersect());
	this.scene.add(this.terrainMesh.mesh);
};

StratScene.prototype.render = function () {
	this.controls.update( this.clock.getDelta() );
	this.renderer.render( this.scene, this.camera );
};

StratScene.prototype.selectedObject = function(clientX, clientY, objectTypes) {
 var intersect = this.getFirstIntersect(clientX, clientY, objectTypes);

	if ( intersect ) {
		return this.getModelObject(intersect);
	}
	return;
}

StratScene.prototype.moveCursor = function(clientX, clientY, objectTypes) {
	var intersect = this.getFirstIntersect(clientX, clientY, objectTypes);

	if ( intersect ) {
		this.rollOverMesh.position.set( 0, 0, 0 );
		this.rollOverMesh.position.copy( intersect.point );
		return this.getModelObject(intersect);
	}
}

StratScene.prototype.getModelObject = function(intersect) {
	var parent = intersect.object.userData.parent;
	if (parent instanceof Army || 
		parent instanceof Movement) 
	{
		return parent;
	} else if (parent instanceof TerrainMesh) {
		return parent.getMapPosition(intersect.point.x, intersect.point.z);
	}
}

StratScene.prototype.getMeshes = function(objectTypes) {
	var meshes = [];
	angular.forEach(objectTypes, function(type) {
		switch(type) {
			case 'Army':
					meshes = meshes.concat(this.armyMeshesToIntersect);
					break;
			case 'Movement':
					meshes = meshes.concat(this.movementMeshesToIntersect);
					break;
			case 'Terrain':
					meshes = meshes.concat(this.terrainMeshesToIntersect);
					break;
			default:
					console.log("Unknown object type: "+type);
		}}, this);
	return meshes;
}

StratScene.prototype.getFirstIntersect = function(clientX, clientY, objectTypes) {
	this.mouse.x = ( clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
	this.mouse.y = -( clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
	this.raycaster.setFromCamera( this.mouse, this.camera );
	
	// See if the ray from the camera into the world hits one of our meshes
	var intersects = this.raycaster.intersectObjects( this.getMeshes(objectTypes) );

	// Toggle rotation bool for meshes that we clicked
	if ( intersects.length > 0 ) {
		return intersects[0];
	}
}