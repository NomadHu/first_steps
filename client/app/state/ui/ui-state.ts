import {List, Record} from 'immutable';

const UiStateRecord = Record({
  uiMode: 'View',
  terrianTextureType: 'Height',
  markers: List.of('Army', 'Movement', 'Building')
});

export class UiState extends UiStateRecord {
  uiMode: UiMode;
  terrianTextureType: TerrainTextureType;
  markers: List<MapMarker>;

  constructor(props:any) {
    super(props);
  }
/*  constructor(public uiMode: UiMode, public terrianTextureType:TerrainTextureType, public markers: List<MapMarker>) {
}*/
}

export const initialUiState = new UiState({
    uiMode: 'View',
    terrianTextureType: 'Height',
    markers: List.of('Army', 'Movement', 'Building')
});

export enum UiMode {
  Add = <any>"Add",
  View = <any>"View",
  Delete = <any>"Delete"
}

export enum TerrainTextureType {
  Height = <any>"Height",
  Tax = <any>"Tax",
  Population = <any>"Population"
}

export enum MapMarker {
  Armies = <any>"Armies",
  Movements = <any>"Movements",
  Buildings = <any>"Buildings"
}
