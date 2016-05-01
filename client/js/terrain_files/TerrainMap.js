var TerrainMap = function (heightStretch, widthStretch) {
	this.heightStretch = heightStretch;
	this.widthStretch = widthStretch;
	this.width = jsonMap.sizex;
	this.depth = jsonMap.sizey;
	var size = this.width * this.depth;
	this.data = new Uint8Array( size );
	this.worldViewWidth;
	this.worldViewDepth;
	this.mesh;

	for ( var i = 0; i < size; i ++ ) {
		this.data[ i ] = jsonMap.height[ i ];
	}
};

TerrainMap.prototype.getMeshesToIntersect = function() {
	return [this.mesh];
}

TerrainMap.prototype.display = function() {
	this.worldViewWidth = worldScene.worldViewWidth;
	this.worldViewDepth = worldScene.worldViewDepth;

	var geometry = new THREE.PlaneBufferGeometry( this.worldViewWidth, this.worldViewDepth, this.width - 1, this.depth - 1 );
	geometry.rotateX( - Math.PI / 2 );

	var vertices = geometry.attributes.position.array;
	for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
		vertices[ j + 1 ] = this.data[ i ] * this.heightStretch;
	}

	geometry.computeFaceNormals();

	texture = new THREE.CanvasTexture( this.generateTexture() );
	texture.wrapS = THREE.ClampToEdgeWrapping;
	texture.wrapT = THREE.ClampToEdgeWrapping;

	this.mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: texture } ) );
	
	this.mesh.userData.parent = this;
	scene.add( this.mesh );
};

TerrainMap.prototype.getDisplayPosition = function(x, y) {
	return new THREE.Vector3(this.worldViewWidth/this.width*(this.width/2-x), this.data[this.depth*(this.width-1-y) + (this.width-1-x)]*this.heightStretch, this.worldViewDepth/this.depth*(this.depth/2-y));
};

TerrainMap.prototype.getMapPosition = function(x, y) {
	return [Math.round(this.width/2-x*this.width/this.worldViewWidth), Math.round(this.depth/2-y*this.depth/this.worldViewDepth)];
};

TerrainMap.prototype.generateTexture = function() {
	var canvas, canvasScaled, context, image, imageData,
	level, diff, vector3, sun, shade;

	vector3 = new THREE.Vector3( 0, 0, 0 );

	sun = new THREE.Vector3( 1, 1, 1 );
	sun.normalize();

	canvas = document.createElement( 'canvas' );
	canvas.width = this.width;
	canvas.height = this.depth;

	context = canvas.getContext( '2d' );
	context.fillStyle = '#000';
	context.fillRect( 0, 0, this.width, this.depth );

	image = context.getImageData( 0, 0, canvas.width, canvas.height );
	imageData = image.data;

	for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
		vector3.x = this.data[ j - 2 ] - this.data[ j + 2 ];
		vector3.y = 2;
		vector3.z = this.data[ j - this.width * 2 ] - this.data[ j + this.width * 2 ];
		vector3.normalize();

		shade = vector3.dot( sun );

		var red = 0;
		var green = 0;
		var blue = 0;

		if (jsonMap.color[i/4]==0 ) {red=0;green=0;blue=0;}
		if (jsonMap.color[i/4]==1 ) {red=0;green=0;blue=128;}
		if (jsonMap.color[i/4]==2 ) {red=0;green=0;blue=255;}
		if (jsonMap.color[i/4]==3 ) {red=0;green=128;blue=255;}
		if (jsonMap.color[i/4]==4 ) {red=240;green=240;blue=64;}
		if (jsonMap.color[i/4]==5 ) {red=32;green=160;blue=0;}
		if (jsonMap.color[i/4]==6 ) {red=160;green=82;blue=45;}
		if (jsonMap.color[i/4]==7 ) {red=128;green=128;blue=128;}
		if (jsonMap.color[i/4]==8 ) {red=255;green=255;blue=255;}
		if (jsonMap.color[i/4]==9 ) {red=255;green=255;blue=255;}
					
		red=(red-shade*40) * ( 0.5 + this.data[ j ] * 0.007 );
		if (red<0) red=0;
		if (red>255) red=255;
		green=(green-shade*40) * ( 0.5 + this.data[ j ] * 0.007 );
		if (green<0) green=0;
		if (green>255) green=255;
		blue=(blue-shade*40) * ( 0.5 + this.data[ j ] * 0.007 );
		if (blue<0) blue=0;
		if (blue>255) blue=255;
		imageData[ i ] = red;
		imageData[ i + 1 ] = green;
		imageData[ i + 2 ] = blue;

	}

	context.putImageData( image, 0, 0 );

	// Scaled 4x
	canvasScaled = document.createElement( 'canvas' );
	canvasScaled.width = this.width * this.widthStretch;
	canvasScaled.height = this.depth * this.widthStretch;

	context = canvasScaled.getContext( '2d' );
	context.scale( this.widthStretch, this.widthStretch );
	context.drawImage( canvas, 0, 0 );

	return canvasScaled;
};
