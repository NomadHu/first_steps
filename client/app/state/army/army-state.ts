import {List, Record, OrderedMap} from 'immutable';

const MapPositionRecord = Record({
  x: 0,
  y: 0
});
export class MapPosition extends MapPositionRecord {
  x: number;
  y: number;
  constructor(props:any) {
    super(props);
  }
}

const ArmyRecord = Record({
  id: 0,
  pos: undefined,
  data: {}
});
export class Army extends ArmyRecord {
  id: number;
  pos: MapPosition;
  data: JSON;
  constructor(props:any) {
    super(props);
  }
}

const MovementRecord = Record({
  id: 0,
  armyId: 0,
  from: undefined,
  to: undefined,
  data: {}
})
export class Movement extends MovementRecord {
  id: number;
  armyId: number;
  from: MapPosition;
  to: MapPosition;
  data: JSON;
  constructor(props:any) {
    super(props);
  }
}

const ArmyStateRecord = Record({
  armies: {},
  movements: {}
})
export class ArmyState extends ArmyStateRecord {
  armies: OrderedMap<number,Army>;
  movements: OrderedMap<number,List<Movement>>;
  constructor(props:any) {
    super(props);
  }
}

export const initialArmyState = new ArmyState({});
