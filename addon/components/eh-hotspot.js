import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class EHHotspotComponent extends Component {
  get backgroundImageInfo() {
    return window.EH_IMAGES[this.args.src] ?? {};
  }

  get imageMissing() {
    return this.backgroundImageInfo.width === undefined;
  }

  get rect() {
    let [x, y, width, height] = this.args.rect;

    if (this.args.src) {
      width = this.backgroundImageInfo.width;
      height = this.backgroundImageInfo.height;
    }

    return { x, y, width, height };
  }

  get style() {
    const { x, y, width, height } = this.rect;

    const styles = [
      `top:${y}px`,
      `left:${x}px`,
      `width:${width}px`,
      `height:${height}px`,
    ];

    return htmlSafe(styles.join(';'));
  }
}
