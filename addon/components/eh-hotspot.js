import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EHHotspotComponent extends Component {
  @service router;

  get backgroundImageInfo() {
    return window.EH_IMAGES[this.args.src] ?? {};
  }

  get imageMissing() {
    return this.backgroundImageInfo.width === undefined;
  }

  get isInteractive() {
    return this.args.action || this.args.route;
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

    const styles = [`top:${y}px`, `left:${x}px`];

    if (this.args.src) {
      const {
        width: imageWidth,
        height: imageHeight,
      } = this.backgroundImageInfo;

      styles.push(
        `width:${imageWidth}px`,
        `height:${imageHeight}px`,
        `background-image:url(${this.args.src})`
      );
    } else {
      styles.push(`width:${width}px`, `height:${height}px`);
    }

    return htmlSafe(styles.join(';'));
  }

  get triggerEvent() {
    if (this.args.trigger === 'hover') {
      return 'mouseenter';
    }

    if (this.args.trigger) {
      return this.args.trigger;
    }

    return 'click';
  }

  @action
  onLeave() {
    if (this.args.trigger !== 'hover') {
      return;
    }

    this.args.action?.();
  }

  @action
  onTrigger() {
    this.args.action?.();

    if (!this.args.route) {
      return;
    }

    this.router.transitionTo(
      this.args.route,
      this.args.queryParams
        ? {
            queryParams: this.args.queryParams,
          }
        : {}
    );
  }
}
