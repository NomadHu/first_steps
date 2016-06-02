import { Injectable } from '@angular/core';
import { Http, Response  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Army, Movement, MapPosition } from '../state/army/army-state';
import { List, OrderedMap } from 'immutable';

@Injectable()
export class ArmyService {
  constructor(private _http : Http) {}

  getArmies(): Observable<OrderedMap<number, Army>> {
    return this._http.get('/testdata/armies.json')
                      .map(this.convertToArmies)
                      .catch(this.handleError);
  }

  getMovements(armies:OrderedMap<number, Army>): Observable<OrderedMap<number,Movement>> {
    return this._http.get('/testdata/movements.json')
                      .map(response=>this.convertToMovements(response, armies))
                      .catch(this.handleError);
  }

  getArmiesWithMovements(): Observable<any> {
    return Observable.forkJoin(
        this.getArmies(),
        this._http.get('/testdata/movements.json')
      ).map(res => {
        let armies:OrderedMap<number, Army> = <OrderedMap<number, Army>>res[0];
        let movements:OrderedMap<number, List<Movement>> = this.convertToMovements(<Response>res[1],armies);
        return [armies, movements];
       })
       .catch(this.handleError);
  }

  private convertToArmies(res: Response):OrderedMap<number, Army> {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let list:Army[] = (<Object[]>res.json()).map((army: any) =>
      new Army({id:army.id, pos:new MapPosition({x:army.pos[0], y:army.pos[1]}), data:army.data})
    );
    let armyMap = OrderedMap<number, Army>();
    for(let i=0;i<list.length;i++) {
      armyMap = armyMap.set(list[i].id, list[i]);
    }
    return armyMap;
  }

  private convertToMovements(res: Response, armies:OrderedMap<number, Army>):OrderedMap<number, List<Movement>> {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let json = res.json();
    let movementMap = OrderedMap<number, List<Movement>>();
    res.json().forEach(function(armyMovement) {
      let army:Army = armies.get(armyMovement["armyId"]);
      let previousPosition:MapPosition = army.pos;
      let movements = List<Movement>();//:Movement[] = [];
      armyMovement["movements"].forEach(function(movementJson:any) {
        let movement:Movement = new Movement({id:movementJson.id, armyId:army.id, from:previousPosition, to:new MapPosition({x:movementJson.to[0], y:movementJson.to[1]}), data:movementJson.data});
        movements = movements.push(movement);
        previousPosition = movement.to;
      });
      movementMap = movementMap.set(army.id,movements);
    });
    return movementMap;
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
