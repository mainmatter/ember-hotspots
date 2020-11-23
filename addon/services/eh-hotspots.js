import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';

export default class EhHotspotsService extends Service {
  @tracked showHotspots = false;
  @tracked data = undefined;

  constructor() {
    super(...arguments);

    this._globalShowCallback = (event) => {
      this.showHotspots = event.type.includes('down');

      return true;
    };

    document.addEventListener('mousedown', this._globalShowCallback);
    document.addEventListener('mouseup', this._globalShowCallback);
    document.addEventListener('touchdown', this._globalShowCallback);
    document.addEventListener('touchup', this._globalShowCallback);
  }

  willDestroy() {
    if (this._globalShowCallback) {
      document.removeEventListener('mousedown', this._globalShowCallback);
      document.removeEventListener('mouseup', this._globalShowCallback);
      document.removeEventListener('touchdown', this._globalShowCallback);
      document.removeEventListener('touchup', this._globalShowCallback);
    }
  }

  get loaded() {
    return this.data !== undefined;
  }

  async load() {
    if (this.loaded) {
      return;
    }

    const res = await fetch('/assets/eh-hotspots.json');
    const data = await res.json();

    this.data = data;
  }
}
