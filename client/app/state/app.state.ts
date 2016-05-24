import {TerrainState, initialTerrainState} from './terrain/terrain-state';
import {UiState, initialUiState} from './ui/ui-state';

export interface AppState {
  terrainState: TerrainState,
  uiState: UiState
}

export const initialAppState = {
  terrainState: initialTerrainState,
  uiState: initialUiState
};
