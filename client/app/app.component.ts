import {Component, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {TerrainService} from "./store/terrain.service";
import {Terrain, TerrainTexture} from './state/terrain/terrain-state';
import {AppState} from './state/app.state';
import {state, dispatcher} from './state/tokens';
import {Action} from './state/app.action';
import {ToggleShowMapMarker, SetTerrainTexture, SetModeAction} from './state/ui/ui-action';
import {LoadTerrain, LoadTerrainTexture} from './state/terrain/terrain-action';
import {Menu} from './ui/menu/menu';
import {WebGlEditor} from './ui/web-gl-editor/web-gl-editor';
import {UiMode, TerrainTextureType, MapMarker} from './state/ui/ui-state';
import {List, OrderedMap} from 'immutable';
import {ArmyService} from "./store/army.service";
import {Army, Movement} from './state/army/army-state';
import {LoadArmies, LoadMovements} from './state/army/army-action';

@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App</h1>
               <br/>
               <menu [mode]="mode |async" [terrainTexture]="textureType |async" [markers]="markers |async"
                     (setMode)="setUiMode($event)" (setTerrainTexture)="setTerrainTextureType($event)" (toggleMarker)="toggleMarker($event)"></menu>
               <web-gl-editor [terrain]="terrain" [terrainTexture]="terrainTexture"
                              [armies]="armies" [movements]="movements"
                              [heightStretch]="10" [widthStretch]="4" [viewWidth]="7500" [viewDepth]="7500"></web-gl-editor>`,
    directives: [Menu, WebGlEditor]
})
export class AppComponent {
  private terrainElement:Terrain;
  private armyElement:OrderedMap<number, Army>;

  constructor(
    @Inject(state) private state: Observable<AppState>,
    @Inject(dispatcher) private dispatcher:Observer<Action>,
    private _terrainService: TerrainService,
    private _armyService: ArmyService
  ) {
    this.load();
  }

  public setUiMode(mode: UiMode) {
    console.log("New mode:" + mode);
    this.dispatcher.next(new SetModeAction(mode));
  }

  public setTerrainTextureType(texture: TerrainTextureType) {
    console.log("New texture:" + texture);
    this.dispatcher.next(new SetTerrainTexture(texture));
    this._terrainService.getTerrainTexture(texture, this.terrainElement)
      .subscribe(
        data => this.dispatcher.next(new LoadTerrainTexture(data)),
        err => console.log('Mi a gond? ERROR!!!', err)
      );

  }

  public toggleMarker(marker:MapMarker) {
    console.log("Toggle marker:" + marker);
    this.dispatcher.next(new ToggleShowMapMarker(marker));
  }

  get mode():Observable<UiMode> {
    return this.state.map((state: AppState) => state.uiState.uiMode).distinctUntilChanged();
  }

  get textureType():Observable<TerrainTextureType> {
    return this.state.map((state: AppState) => state.uiState.terrianTextureType).distinctUntilChanged();
  }

  get markers():Observable<List<MapMarker>> {
    return this.state.map((state: AppState) => state.uiState.markers).distinctUntilChanged();
  }

  get terrain():Observable<Terrain> {
    return this.state.map((state: AppState) => state.terrainState.terrain).distinctUntilChanged();
  }

  get terrainTexture():Observable<TerrainTexture> {
    return this.state.map((state: AppState) => state.terrainState.terrainTexture).distinctUntilChanged();
  }

  get armies():Observable<OrderedMap<number, Army>> {
    return this.state.map((state: AppState) => state.armyState.armies).distinctUntilChanged();
  }

  get movements():Observable<OrderedMap<number, List<Movement>>> {
    return this.state.map((state: AppState) => state.armyState.movements).distinctUntilChanged();
  }

  public load() {
    console.log("Load");
    this._terrainService.getTerrainWithTexture(TerrainTextureType.Height)
      .subscribe(
        data => {
          this.terrainElement = data[0];
          this.dispatcher.next(new LoadTerrain(data[0], data[1]))
        },
        err => console.log('Mi a gond? ERROR!!!', err)
      );
      this._armyService.getArmiesWithMovements()
        .subscribe(
          data => {
            this.armyElement = data[0];
            this.dispatcher.next(new LoadArmies(data[0], data[1]))
          },
          err => console.log('Mi a gond? ERROR!!!', err)
        );
  }
}
