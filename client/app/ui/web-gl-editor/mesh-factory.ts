import {PlaneBufferGeometry, CanvasTexture, ClampToEdgeWrapping, Mesh, MeshBasicMaterial, Vector3} from 'three';
import {Terrain} from '../../model/terrain'
import {TerrainTexture} from '../../model/terrain-texture'
import {ColorCode} from '../../model/color-code'
import {MapMesh} from './map-mesh'

export class MeshFactory {
  public createTerrainMesh(terrain:Terrain, heightStretch:number, widthStretch:number, viewWidth:number, viewDepth:number):MapMesh {
    var geometry = this.createTerrainGeometry(terrain, heightStretch, widthStretch, viewWidth, viewWidth);
    var myTexture = this.createTerrainTexture(terrain, undefined, widthStretch);
    return this.createTerrainMeshInner(terrain, geometry, new MeshBasicMaterial( { map: myTexture }/*{ color: 0x000000, opacity: 0.0, transparent: false }*/ ));
  }

  private createTerrainGeometry(terrain:Terrain, heightStretch:number, widthStretch:number, viewWidth:number, viewDepth:number):PlaneBufferGeometry {
    var result:PlaneBufferGeometry = new PlaneBufferGeometry( viewWidth, viewDepth, terrain.sizex - 1, terrain.sizey - 1 );
  	result.rotateX( - Math.PI / 2 );

    var attr:any = result.attributes;
  	var vertices = attr.position.array;
  	for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {
  		vertices[ j + 1 ] = terrain.height[ i ] * heightStretch;
  	}

  	result.computeFaceNormals();

    return result;
  }

  private createTerrainMeshInner(terrain:Terrain, geometry:PlaneBufferGeometry, material: MeshBasicMaterial):MapMesh {
  	var mesh = new Mesh( geometry, material );
    mesh.userData.parent = terrain;

    var result = new MapMesh();
    result.meshToDisplay = mesh;
    result.meshesToIntersect = [mesh];
    result.parent = terrain;
  	return result;
  }

  public createTerrainTexture (terrain:Terrain, texture:TerrainTexture, widthStretch:number):CanvasTexture {
  	var canvas, canvasScaled, context, image, imageData,
  	level, diff, vector3, sun, shade;

  	vector3 = new Vector3( 0, 0, 0 );

  	sun = new Vector3( 1, 1, 1 );
  	sun.normalize();

  	canvas = document.createElement( 'canvas' );
  	canvas.width = terrain.sizex;
  	canvas.height = terrain.sizey;

  	context = canvas.getContext( '2d' );
  	context.fillStyle = '#000';
  	context.fillRect( 0, 0, canvas.width, canvas.height );

  	image = context.getImageData( 0, 0, canvas.width, canvas.height );
  	imageData = image.data;

    if (texture) {
    	for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
  //      console.log("i " + i + " col " + texture.color[i/4] + " colCode " + texture.colorCode[texture.color[i/4]]);
        var colorCode = texture.colorCode[texture.color[i/4]];
    		var red = colorCode.red;
    		var green = colorCode.green;
    		var blue = colorCode.blue;

        // calculate shading
    		vector3.x = terrain.height[ j - 2 ] - terrain.height[ j + 2 ];
    		vector3.y = 2;
    		vector3.z = terrain.height[ j - terrain.sizex * 2 ] - terrain.height[ j + terrain.sizex * 2 ];
    		vector3.normalize();

    		shade = vector3.dot( sun );

    		red=(red-shade*40) * ( 0.5 + terrain.height[ j ] * 0.007 );
    		if (red<0) red=0;
    		if (red>255) red=255;
    		green=(green-shade*40) * ( 0.5 + terrain.height[ j ] * 0.007 );
    		if (green<0) green=0;
    		if (green>255) green=255;
    		blue=(blue-shade*40) * ( 0.5 + terrain.height[ j ] * 0.007 );
    		if (blue<0) blue=0;
    		if (blue>255) blue=255;
    		imageData[ i ] = red;
    		imageData[ i + 1 ] = green;
    		imageData[ i + 2 ] = blue;
      }
  	} else {
      for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {
    		imageData[ i ] = 0;
    		imageData[ i + 1 ] = 0;
    		imageData[ i + 2 ] = 0;
      }
    }

  	context.putImageData( image, 0, 0 );

  	// Scaled
  	canvasScaled = document.createElement( 'canvas' );
  	canvasScaled.width = canvas.width * widthStretch;
  	canvasScaled.height = canvas.height * widthStretch;

  	context = canvasScaled.getContext( '2d' );
  	context.scale( widthStretch, widthStretch );
  	context.drawImage( canvas, 0, 0 );

    var result = new CanvasTexture( canvasScaled );
    result.wrapS = ClampToEdgeWrapping;
  	result.wrapT = ClampToEdgeWrapping;
  	return result;
  }

  public disposeMesh(mesh:Mesh) {
    var children = mesh.children;
    var child;

    if (children) {
      for (var i=0; i<children.length; i+=1) {
        child = children[i];
        this.disposeMesh(child);
      }
    }

    var geometry = mesh.geometry;
    var material:any = mesh.material;
    if (geometry) {
      geometry.dispose();
    }
    if (material) {
      var texture = material.map;
      if (texture) {
        texture.dispose();
      }
      material.dispose();
    }
  }
}
