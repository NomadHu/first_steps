import {Terrain, TerrainTexture} from './terrain-state';

export class LoadTerrain {
  constructor(public terrain:Terrain,public texture:TerrainTexture) {
  }
}

export class LoadTerrainTexture {
  constructor(public texture:TerrainTexture) {
  }
}

export type TerrainAction = LoadTerrain | LoadTerrainTexture;
