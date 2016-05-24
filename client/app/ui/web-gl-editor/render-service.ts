import {WebGLRenderer, Scene, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, AmbientLight, PointLight, Clock, Renderer, Raycaster, Vector2, OrbitControls} from 'three';
import {Terrain} from '../../model/terrain'
import {TerrainTexture} from '../../model/terrain-texture'
import {MapMesh} from './map-mesh';
import {MeshFactory} from './mesh-factory';

export class RenderService {
  private container: HTMLElement;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private controls: OrbitControls;
  private sphere: Mesh;
  private clock: Clock;
  private mouse: Vector2;
  private raycaster: Raycaster;
  private heightStretch: number;
  private widthStretch: number;
  private viewWidth: number;
  private viewDepth: number;

  private terrain:Terrain;
  private terrainTexture:TerrainTexture;
  private meshFactory: MeshFactory;
  private terrainMesh: MapMesh;
	private terrainMeshesToIntersect: Mesh[];


  public init(container: HTMLElement, meshFactory: MeshFactory, heightStretch:number, widthStretch:number, viewWidth:number, viewDepth:number) {
    this.container = container;
    this.meshFactory = meshFactory;
    this.heightStretch = heightStretch;
    this.widthStretch = widthStretch;
    this.viewWidth = viewWidth;
    this.viewDepth = viewDepth;


    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    // Clock
  	this.clock = new Clock();

    // Camera
    this.camera = new PerspectiveCamera( 60, width / height, 1, 20000 );
    this.camera.position.y = 3000;
    this.camera.position.x = 2000;
    this.camera.position.z = 1800;

    // Controls
    this.controls = new OrbitControls(this.camera, container);
    this.controls.center.set( 0.0, 100.0, 0.0 );
    this.controls.keyPanSpeed = 100;
    this.controls.center.y = 1000;

    // Scene
    this.scene = new Scene();

    this.renderer = new WebGLRenderer();
    this.renderer.setClearColor( 0xbfd1e5 );
    this.renderer.setSize( width, height );

    // Mouse
    this.mouse = new Vector2();

    // Raycaster
    this.raycaster = new Raycaster();

    // RollOverMesh
//      	this.rollOverMesh = rollOverMesh.clone();
//      	this.scene.add(this.rollOverMesh);

    container.appendChild( this.renderer.domElement );

    // start animation
    this.animate();

    // bind to window resizes
    window.addEventListener('resize', _ => this.onResize());
  }

  public animate() {
    window.requestAnimationFrame(_ => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public onResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  public updateTerrain(terrain:Terrain) {
    if (!terrain.initialized) {
  		return;
  	}
    this.terrain = terrain;
    if (this.terrainMesh) {
      this.scene.remove(this.terrainMesh.meshToDisplay);
      this.meshFactory.disposeMesh(this.terrainMesh.meshToDisplay);
    }

    this.terrainMesh = this.meshFactory.createTerrainMesh(this.terrain, this.heightStretch, this.widthStretch, this.viewWidth, this.viewDepth);
    this.terrainMeshesToIntersect = [];
    this.terrainMeshesToIntersect = this.terrainMeshesToIntersect.concat(this.terrainMesh.meshesToIntersect);
    this.scene.add(this.terrainMesh.meshToDisplay);
    if (this.terrainTexture&&this.terrainTexture.initialized) {
      this.updateTerrainTexture(this.terrainTexture);
    }
  }

  public updateTerrainTexture(texture:TerrainTexture) {
    if (!texture.initialized) {
  		return;
  	}
    this.terrainTexture = texture;
    if (this.terrainMesh) {
      var oldMap = undefined;
      var material:any = this.terrainMesh.meshToDisplay.material;
      if (material.map) {
        oldMap = material.map;
      }

      var newTexture = this.meshFactory.createTerrainTexture(this.terrain, this.terrainTexture, this.widthStretch);
      material.map = newTexture;
      material.needsUpdate = true;
      if (oldMap) {
        oldMap.dispose();
      }
    }
  }
}
