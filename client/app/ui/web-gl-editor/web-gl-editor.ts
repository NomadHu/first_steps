import {Component, Input, Output, EventEmitter, OnInit, ElementRef, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Terrain} from '../../model/terrain';
import {TerrainTexture} from '../../model/terrain-texture';
import {RenderService} from './render-service';
import {MeshFactory} from './mesh-factory'

@Component({
    selector: 'web-gl-editor',
    template: '<div #editor id="editor"></div>',
    providers: [RenderService, MeshFactory]
})

export class WebGlEditor implements OnInit {
  @Input() heightStretch: number;
  @Input() widthStretch: number;
  @Input() viewWidth: number;
  @Input() viewDepth: number;
  @Input() terrain: Observable<Terrain>;
  @Input() terrainTexture: Observable<TerrainTexture>;

  @Output() setHover = new EventEmitter();
  @Output() setSelection = new EventEmitter();

  constructor(@Inject(ElementRef) private elementRef: ElementRef, private renderService: RenderService, private meshFactory: MeshFactory) {
  }

  ngOnInit() {
    this.renderService.init(this.elementRef.nativeElement.querySelector('#editor'), this.meshFactory, this.heightStretch, this.widthStretch, this.viewWidth, this.viewDepth);
    this.terrain.subscribe(newTerrain=>this.updateTerrain(newTerrain));
    this.terrainTexture.subscribe(newTexture=>this.updateTerrainTexture(newTexture));
  }

  private updateTerrain(newTerrain:Terrain) {
    this.renderService.updateTerrain(newTerrain);
  }

  private updateTerrainTexture(newTexture:TerrainTexture) {
    this.renderService.updateTerrainTexture(newTexture);
  }
}
