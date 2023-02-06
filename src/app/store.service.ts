import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService<b> {

  constructor() { }

  state?: b;

  store(newState: b): void {
     this.state = newState;
  }

  retrieve(): b | undefined {
    return this.state;
  }
}
