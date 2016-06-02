import {TerrainState, initialTerrainState} from './terrain/terrain-state';
import {UiState, initialUiState} from './ui/ui-state';
import {ArmyState, initialArmyState} from './army/army-state';

export interface AppState {
  terrainState: TerrainState,
  uiState: UiState,
  armyState: ArmyState
}

export const initialAppState = {
  terrainState: initialTerrainState,
  uiState: initialUiState,
  armyState: initialArmyState
};
