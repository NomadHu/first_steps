import {Component, Input, Output, EventEmitter} from '@angular/core';
import {UiMode, TerrainTextureType, MapMarker} from '../../state/ui/ui-state';
import {List} from 'immutable';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap';

@Component({
    selector: 'menu',
    templateUrl: './app/ui/menu/menu.html',
    directives: [BUTTON_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class Menu {
  @Input() mode: UiMode;
  @Input() terrainTexture: TerrainTextureType;
  @Input() markers: List<MapMarker>;

  @Output() setMode = new EventEmitter();
  @Output() setTerrainTexture = new EventEmitter();
  @Output() toggleMarker = new EventEmitter();

  public uiModeType = UiMode;
  public terrainTextureType = TerrainTextureType;
  public markerType = MapMarker;

  public isMarked(markerCode: string):boolean {
    return this.markers.includes(MapMarker[markerCode]);
  }

  public setModeEvent(modeCode: string) {
    this.setMode.emit(UiMode[modeCode]);
  }

  public setTextureEvent(textureCode: string) {
    this.setTerrainTexture.emit(TerrainTextureType[textureCode]);
  }

  public toggleMarkerEvent(markerCode: string) {
    this.toggleMarker.emit(MapMarker[markerCode]);
  }
}
