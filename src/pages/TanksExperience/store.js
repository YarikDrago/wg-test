import { makeAutoObservable } from 'mobx';

import { tanksData } from './tanksData';

class TankStore {
  activeTankId = null;
  tanks = [];
  daysValue = 0;
  coefMode = 1; // Default play mode- "Стандартная"

  constructor() {
    makeAutoObservable(this);
    this.tanks = tanksData.map((tank, index) => ({
      ...tank,
      id: index,
    }));
  }

  setActiveTank(id) {
    this.activeTankId = id;
    /* Reset values when changing tanks */
    if (id === null) {
      this.daysValue = 0;
      this.coefMode = 1;
    }
  }

  setDaysValue(value) {
    this.daysValue = Number(value) || 0;
  }

  setCoefMode(value) {
    this.coefMode = Number(value) || 1;
  }

  get activeTank() {
    return this.tanks.find((tank) => tank.id === this.activeTankId);
  }

  get calculatedExp() {
    if (!this.activeTank) return 0;
    return this.daysValue * this.activeTank.coef * this.coefMode;
  }
}

export const tankStore = new TankStore();
