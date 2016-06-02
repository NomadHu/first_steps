import {TerrainAction} from './terrain/terrain-action';
import {UiAction} from './ui/ui-action';
import {ArmyAction} from './army/army-action';

export type Action = ArmyAction | TerrainAction | UiAction;
