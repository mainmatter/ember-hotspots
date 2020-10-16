import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class EHBackgroundComponent extends Component {
  get backgroundImageInfo() {
    return window.EH_IMAGES[this.args.src] ?? {};
  }

  get imageMissing() {
    return this.backgroundImageInfo.width === undefined;
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
