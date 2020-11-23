import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

export default class EHBackgroundComponent extends Component {
  @service ehHotspots;

  constructor() {
    super(...arguments);

    this.ehHotspots.load();
  }

  get backgroundImageInfo() {
    return this.ehHotspots.data?.[this.args.src] ?? {};
  }

  get imageMissing() {
    return (
      this.ehHotspots.data !== undefined &&
      this.backgroundImageInfo.width === undefined
    );
  }

  get style() {
    const { width, height } = this.backgroundImageInfo;
    const styles = [
      `background-image:url(${this.args.src})`,
      `--eh-background-width:${width}px`,
      `--eh-background-height:${height}px`,
    ];

    return htmlSafe(styles.join(';'));
  }
}
