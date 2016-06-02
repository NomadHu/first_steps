import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';
//import {getName} from '../util/get-name';
import {Action} from './app.action';
import {AppState} from './app.state';
import {dispatcher} from './tokens';
import {calculateUiState} from './ui/ui-reducer';
import {calculateTerrainState} from './terrain/terrain-reducer';
import {calculateArmyState} from './army/army-reducer';
import {UiState, initialUiState} from './ui/ui-state';
import {TerrainState, initialTerrainState} from './terrain/terrain-state';
import {ArmyState, initialArmyState} from './army/army-state';

function wrapIntoBehaviorSubject(init:AppState, obs:Observable<AppState>) {
  const res = new BehaviorSubject(init);
  obs.subscribe(s => res.next(s));
  return res;
}

export function applicationStateFactory(initialState: AppState, actions: Observable<Action>): Observable<AppState> {

  let appStateObservable = actions.scan( (state: AppState, action:Action) => {
    let newState: AppState = {
      terrainState: calculateTerrainState(state.terrainState, action),
      uiState: calculateUiState(state.uiState, action),
      armyState: calculateArmyState(state.armyState, action)
    };

    console.log({
      terrainState: newState.terrainState,
      uiState: newState.uiState.toJS(),
      armyState: newState.armyState.toJS()
    });

    return newState;
  } , initialState)
  .share();

  return wrapIntoBehaviorSubject(initialState, appStateObservable);
}
