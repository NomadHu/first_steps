import {bootstrap}    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from "@angular/http";
import {provide, Inject} from '@angular/core';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publish';
import 'rxjs/add/observable/forkJoin';
import {AppComponent} from './app.component';
import {TerrainService} from "./store/terrain.service";
import {Action} from './state/app.action';
import {initialAppState} from './state/app.state';
import {applicationStateFactory} from "./state/app.state-factory";
import {initialState, dispatcher, state} from './state/tokens';

bootstrap(AppComponent, [
  TerrainService,
  HTTP_PROVIDERS,
  provide(initialState, {useValue: initialAppState}),
  provide(dispatcher, {useValue: new Subject<Action>()}),
  provide(state, {useFactory: applicationStateFactory, deps: [new Inject(initialState), new Inject(dispatcher)]})
]);
