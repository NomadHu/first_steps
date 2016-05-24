import {UiMode, TerrainTextureType, MapMarker} from './ui-state';

export class SetModeAction {
  constructor(public uiMode:UiMode) {
  }
}

export class SetTerrainTexture {
  constructor(public texture:TerrainTextureType) {
  }
}

export class ToggleShowMapMarker {
  constructor(public marker:MapMarker) {
  }
}

export type UiAction = ToggleShowMapMarker | SetTerrainTexture | SetModeAction;
