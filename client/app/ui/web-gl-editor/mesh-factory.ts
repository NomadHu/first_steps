import {MeshLambertMaterial, PlaneBufferGeometry, CanvasTexture, ClampToEdgeWrapping, Mesh, MeshBasicMaterial, Vector3, BoxGeometry, CubicBezierCurve3, Geometry, ArrowHelper, Line, LineBasicMaterial, SphereGeometry, BufferGeometry} from 'three';
import {Terrain, TerrainTexture, ColorCode} from '../../state/terrain/terrain-state'
import {Army, Movement} from '../../state/army/army-state'

export class MeshFactory {
  private currentMesh:Mesh = undefined;
  private movementMesh:Mesh = undefined;

  constructor() {
    let currentGeo = new BoxGeometry( 50, 50, 50 );currentGeo.center();
    let currentMaterial = new MeshBasicMaterial( { color: 0x000000, opacity: 0.0, transparent: false } );
    this.currentMesh = new Mesh( currentGeo, currentMaterial );

    let movementGeo = new SphereGeometry( 25, 32, 32 );movementGeo.center();
    let movementMaterial = new MeshBasicMaterial( { color: 0x00ff00, opacity: 0.0, transparent: false } );
    this.movementMesh = new Mesh( movementGeo, movementMaterial );
  }

  public createArmyMesh(army:Army, position:Vector3):Mesh {
    var mesh:Mesh = this.currentMesh.clone();
  	mesh.position.set(position.x,position.y,position.z);
  	mesh.userData.parent = army;
    return mesh;
  }

  public createMovementMesh(movement:Movement, from:Vector3, to:Vector3):Mesh {
    /*
    var meshes:Mesh[] = [];
    var targetMesh:Mesh = this.movementMesh.clone();
    targetMesh.position.set(to.x,to.y,to.z);
    meshes.push(targetMesh);
*/
    let curve = new CubicBezierCurve3(
      new Vector3(from.x,from.y+25,from.z),
			new Vector3(from.x,from.y+175,from.z),
			new Vector3(to.x,to.y+175,to.z),
			new Vector3(to.x,to.y+25,to.z)
    );
    let curveGeometry = new Geometry();
    curveGeometry.vertices = curve.getPoints( 64 );
    let lineMaterial = new LineBasicMaterial( { color : 0x00ff00, linewidth : 3 } );;
    let curveObject:any = new Line( curveGeometry, lineMaterial );
    /*
    meshes.push(curveObject);

    let arrowColor = 0x00ff00;

    let arrowFrom = curveGeometry.vertices[56];
    let arrowTo = curveGeometry.vertices[64];
    let direction = arrowTo.clone().sub(arrowFrom);
    let length = direction.length();
    let arrowObject = new ArrowHelper(direction.normalize(), from, length, arrowColor, 60, 30 );

    var movementGeometry = this.mergeMeshes(meshes);
    let movementMaterial = new MeshBasicMaterial( { color: 0x00ff00, opacity: 0.0, transparent: false } );
    var mesh = new Mesh( movementGeometry, movementMaterial );
  	mesh.userData.parent = movement;
    */
    return curveObject;
  }


  public createTerrainMesh(terrain:Terrain, heightStretch:number, widthStretch:number, viewWidth:number, viewDepth:number):Mesh {
    var geometry = this.createTerrainGeometry(terrain, heightStretch, widthStretch, viewWidth, viewWidth);
    var myTexture = this.createTerrainTexture(terrain, undefined, widthStretch);
    var mesh = new Mesh( geometry, new MeshBasicMaterial( { map: myTexture } ));
    mesh.userData.parent = terrain;

    return mesh;
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

  private mergeMeshes(meshes:Mesh[]):Geometry {
    var combined = new Geometry();

    for (var i = 0; i < meshes.length; i++) {
      meshes[i].updateMatrix();
      let geometry:any = meshes[i].geometry;
      combined.merge(geometry, meshes[i].matrix);
    }

    return combined;
  }
}
