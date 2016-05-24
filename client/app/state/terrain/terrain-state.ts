import {Terrain} from '../../model/terrain';
import {TerrainTexture} from '../../model/terrain-texture';

export class TerrainState {
  constructor(public terrain: Terrain, public terrainTexture: TerrainTexture) {
  }
}

export const initialTerrainState = {
    terrain: new Terrain(),
    terrainTexture: new TerrainTexture()
};
