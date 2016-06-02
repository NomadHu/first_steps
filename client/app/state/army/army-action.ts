import {Army, Movement} from './army-state';
import {List, OrderedMap} from 'immutable';

export class LoadArmies {
  constructor(public armies:OrderedMap<number, Army>,public movements:OrderedMap<number, List<Movement>>) {
  }
}

export class LoadMovements {
  constructor(public movements:OrderedMap<number, List<Movement>>) {
  }
}

export class AddMovement {
  constructor(public movementToAdd:Movement) {
  }
}

export class DeleteMovement {
  constructor(public movementToDelete:Movement) {
  }
}

export type ArmyAction = DeleteMovement | LoadArmies | LoadMovements | AddMovement;
