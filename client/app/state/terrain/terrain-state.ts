// Not immutable so the immutable overhead is not needed on uint8arrays
export class ColorCode {
  red: number;
  green: number;
  blue: number;
}

export class TerrainTexture {
  color: Uint8Array;
  colorCode: ColorCode[];
  initialized: boolean = false;
}

export class Terrain {
  sizex: number;
  sizey: number;
  height: Uint8Array;
  initialized: boolean = false;
}

export class TerrainState {
  constructor(public terrain: Terrain, public terrainTexture: TerrainTexture) {
  }
}

export const initialTerrainState = {
    terrain: new Terrain(),
    terrainTexture: new TerrainTexture()
};
