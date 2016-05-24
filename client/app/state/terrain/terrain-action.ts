import {Terrain} from '../../model/terrain';
import {TerrainTexture} from '../../model/terrain-texture';

export class LoadTerrain {
  constructor(public terrain:Terrain,public texture:TerrainTexture) {
  }
}

export class LoadTerrainTexture {
  constructor(public texture:TerrainTexture) {
  }
}

export type TerrainAction = LoadTerrain | LoadTerrainTexture;
