import {UiState, initialUiState, MapMarker} from './ui-state';
import {ToggleShowMapMarker, SetTerrainTexture, SetModeAction} from './ui-action';
import {Action} from '../app.action';

export function calculateUiState(state: UiState, action:Action) {
  if (!state) {
    return initialUiState;
  }

  if (action instanceof SetModeAction) {
    return new UiState({uiMode:action.uiMode, terrianTextureType:state.terrianTextureType, markers: state.markers});
  }
  else if (action instanceof SetTerrainTexture) {
    return new UiState({uiMode:state.uiMode, terrianTextureType:action.texture, markers: state.markers});
  }
  else if (action instanceof ToggleShowMapMarker) {
    let marker = action.marker;
    let index = state.markers.findIndex((oldMarker: MapMarker) => oldMarker === marker);
    if (index==-1) {
      return new UiState({uiMode:state.uiMode, terrianTextureType:state.terrianTextureType, markers: state.markers.push(action.marker)});
    } else {
      return new UiState({uiMode:state.uiMode, terrianTextureType:state.terrianTextureType, markers: state.markers.delete(index)});
    }
  } else {
    return state;
  }
}
