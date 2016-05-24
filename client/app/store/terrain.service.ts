import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Terrain } from '../model/terrain';
import { TerrainTexture } from '../model/terrain-texture';
import { ColorCode } from '../model/color-code';
import { TerrainTextureType } from '../state/ui/ui-state';



@Injectable()
export class TerrainService {
  constructor(private _http : Http) {}

  getTerrain(): Observable<Terrain> {
    return this._http.get('/testdata/terrain.json')
                      .map(this.convertToTerrain)
                      .catch(this.handleError);
  }

  getTerrainWithTexture(id: TerrainTextureType): Observable<any> {
    return Observable.forkJoin(
        this.getTerrain(),
        this._http.get('/testdata/terrain-texture-'+id+'.json')
      ).map(res => {
        let terrain = <Terrain>res[0];
        let terrainTexture = this.convertToTerrainTexture(<Response>res[1],terrain);
        return [terrain, terrainTexture];
       })
       .catch(this.handleError);
  }

  getTerrainTexture(id: TerrainTextureType, terrain: Terrain): Observable<TerrainTexture> {
    return this._http.get('/testdata/terrain-texture-'+id+'.json')
                      .map(data => this.convertToTerrainTexture(data,terrain))
                      .catch(this.handleError);
  }

  private convertToTerrain(res: Response):Terrain {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    let result = new Terrain();
    result.sizex = body.sizex;
    result.sizey = body.sizey;
    result.height = new Uint8Array(result.sizex * result.sizey);
    result.initialized = true;
    for(var i=0; i<result.height.length; i++) {
  		result.height[i] = body.height[i];
	  }
    return result;
  }

  private convertToTerrainTexture(res: Response, terrain: Terrain):TerrainTexture {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let texture = res.json();
    let result = new TerrainTexture();
    result.color = new Uint8Array(terrain.sizex * terrain.sizey);
    result.initialized = true;
    for(var i=0; i<result.color.length; i++) {
  		result.color[i] = texture.color[i];
	  }
    result.colorCode = new Array(texture.colorCode.length);
    for(var i=0; i<texture.colorCode.length; i++) {
  		result.colorCode[i] = new ColorCode();
      result.colorCode[i].red = texture.colorCode[i].red;
      result.colorCode[i].green = texture.colorCode[i].green;
      result.colorCode[i].blue = texture.colorCode[i].blue;
	  }
    return result;
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
