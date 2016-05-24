import { ColorCode } from './color-code';

export class TerrainTexture {
  color: Uint8Array;
  colorCode: ColorCode[];
  initialized: boolean = false;
}
