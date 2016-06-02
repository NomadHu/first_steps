import {ArmyState, initialArmyState} from './army-state';
import {LoadArmies, LoadMovements, AddMovement, DeleteMovement, ArmyAction} from './army-action';
import {Action} from '../app.action';
import {List} from 'immutable';

export function calculateArmyState(state: ArmyState, action:Action):ArmyState {
  if (!state) {
    return initialArmyState;
  }

  if (action instanceof LoadArmies) {
    return new ArmyState({armies:action.armies, movements:action.movements});
  }
  else if (action instanceof LoadMovements) {
    return new ArmyState({armies:state.armies, movements:action.movements});
  }
  else if (action instanceof AddMovement) {
    let movement = action.movementToAdd;
    return <ArmyState>state.updateIn(['movements', movement.armyId], List.of(movement), movements => movements.push(movement));
  }
  else if (action instanceof DeleteMovement) {
    let movement = action.movementToDelete;
    return <ArmyState>state.updateIn(['movements', movement.armyId], movements => {
      let index = movements.findIndex((movement) => movement.id === movement.id);
      return movements.slice(0,index);
    });
  } else {
    return state;
  }
}
