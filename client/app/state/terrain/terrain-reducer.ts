import {TerrainState, initialTerrainState} from './terrain-state';
import {LoadTerrain, LoadTerrainTexture} from './terrain-action';
import {Action} from '../app.action';

export function calculateTerrainState(state: TerrainState, action:Action) {
    if (!state) {
        return initialTerrainState;
    }

    if (action instanceof LoadTerrain) {
        return new TerrainState(action.terrain, action.texture);
    }
    else if (action instanceof LoadTerrainTexture) {
        return new TerrainState(state.terrain, action.texture);
    }
    else {
        return state;
    }
}
