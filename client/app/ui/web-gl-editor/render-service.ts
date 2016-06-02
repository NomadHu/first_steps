import {WebGLRenderer, Scene, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, AmbientLight, PointLight, Clock, Renderer, Raycaster, Vector2, Vector3, OrbitControls} from 'three';
import {Terrain, TerrainTexture} from '../../state/terrain/terrain-state'
import {Army, Movement, MapPosition} from '../../state/army/army-state'
import {MeshFactory} from './mesh-factory'
import {List, OrderedMap} from 'immutable'

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
  private armies:OrderedMap<number, Army>;
  private movements:OrderedMap<number, List<Movement>>;
  private meshFactory: MeshFactory;

  private terrainMesh: Mesh;
  private armyMeshes: Mesh[];
  private movementMeshes: Mesh[];

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
      this.scene.remove(this.terrainMesh);
      this.meshFactory.disposeMesh(this.terrainMesh);
    }

    this.terrainMesh = this.meshFactory.createTerrainMesh(this.terrain, this.heightStretch, this.widthStretch, this.viewWidth, this.viewDepth);
    this.scene.add(this.terrainMesh);
    if (this.terrainTexture&&this.terrainTexture.initialized) {
      this.updateTerrainTexture(this.terrainTexture);
    }
    this.updateArmies(this.armies);
    this.updateMovements(this.movements);
  }

  public updateTerrainTexture(texture:TerrainTexture) {
    if (!texture.initialized) {
  		return;
  	}
    this.terrainTexture = texture;
    if (this.terrainMesh) {
      var oldMap = undefined;
      var material:any = this.terrainMesh.material;
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

  public updateArmies(armies:OrderedMap<number, Army>) {
    if (!armies||!armies.forEach) {
  		return;
  	}
    this.armies = armies;
    if (!this.terrain||!this.terrain.initialized) {
      return;
    }
    if (this.armyMeshes) {
      this.armyMeshes.forEach((armyMesh) => {
        this.scene.remove(armyMesh);
        this.meshFactory.disposeMesh(armyMesh);
      });
    }

    this.armyMeshes = [];
    this.armies.forEach((army) => {
      let armyMesh:Mesh = this.meshFactory.createArmyMesh(army, this.getDisplayPosition(army.pos));
      this.armyMeshes.push(armyMesh);
      this.scene.add(armyMesh);
    })
  }

  public updateMovements(movements:OrderedMap<number, List<Movement>>) {
    if (!movements||!movements.forEach) {
  		return;
  	}
    this.movements = movements;
    if (!this.terrain||!this.terrain.initialized) {
      return;
    }
    if (this.movementMeshes) {
      this.movementMeshes.forEach((movementMesh) => {
        this.scene.remove(movementMesh);
        this.meshFactory.disposeMesh(movementMesh);
      });
    }

    this.movementMeshes = [];
    this.movements.forEach((movementList) => {
      movementList.forEach((movement) => {
        let movementMesh:Mesh = this.meshFactory.createMovementMesh(movement, this.getDisplayPosition(movement.from), this.getDisplayPosition(movement.to));
        this.movementMeshes.push(movementMesh);
        this.scene.add(movementMesh);
      })
    })
  }

  private getDisplayPosition(pos:MapPosition):Vector3 {
    return new Vector3(this.viewWidth/this.terrain.sizex*(this.terrain.sizex/2-pos.x), this.terrain.height[this.terrain.sizey*(this.terrain.sizex-1-pos.y) + (this.terrain.sizex-1-pos.x)]*this.heightStretch, this.viewDepth/this.terrain.sizey*(this.terrain.sizey/2-pos.y));
  }

  private getMapPosition(x:number, y:number):MapPosition {
	  return new MapPosition({x:Math.round(this.terrain.sizex/2-x*this.terrain.sizex/this.viewWidth), y:Math.round(this.terrain.sizey/2-y*this.terrain.sizey/this.viewDepth)});
  }

}
