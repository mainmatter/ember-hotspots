# ember-hotspots

Create interactive prototypes from scratch and design mockups using little code 
but the full power of the Ember.js ecosystem.

## Compatibility

- Ember.js v3.16 or above
- Ember CLI v2.13 or above
- Node.js v10 or above

## Installation

```
ember install ember-hotspots
```

This addon has no additional dependencies. However, there are other addons that 
will make it easier to create prototypes with little if any JavaScript code 
necessary.

- [ember-truth-helpers][ember-truth-helpers] provide logic helpers like 
  `(not)`, `(and)` and more.
- [ember-composable-helpers][ember-composable-helpers] provide additional 
  macros which can be used to create basic behaviors in templates.

As with all addons, the cost of having these helpers is additional payload 
size. It won't hurt a standalone prototype to use all of them, but if you use 
ember-hotspots in an existing application, you may already have similar helpers 
to your disposal, which is why they do not come as a direct dependency of this 
project.

Some code examples below make use of `ember-truth-helpers`.

[ember-truth-helpers]: https://github.com/jmurphyau/ember-truth-helpers
[ember-composable-helpers]: https://github.com/DockYard/ember-composable-helpers

## Usage

This addon provides two components, which can be used to mock features and 
whole pages in your application or even start a new mock application from 
scratch.

Images ending in `@2x` are treated as "Retina" style images, which means they 
will be displayed at half their actual pixel size. This allows for crisper 
rendering on high density displays used in many mobile devices. No other 
suffixes are supported. Both `<EhBackground />` and `<EhHotspot />` will 
provide feedback if a referenced image is missing.

### EhBackground

`<EhBackground />` creates a full width background that is centered to the 
viewport and automatically grows to the full height of the selected image, 
acting as a positional reference for the hotspots.

```hbs
<EhBackground @src="path/to/your/image/in/the/public/folder@2x.png">
  {{! Add your hotspots here ---}}
</EhBackground>
```

### EhHotspot

`<EhHotspot />` provides interaction to your mockup and positioned absolute to 
the wrapping background. Hotspots may have an optional background image, which 
will also provide an automatic size to the hotspot. They can trigger actions 
or navigation.

#### Basic hotspot

> left: 70px, top: 80px, width: 200px, height: 50px
> Clicking the hotspot will toggle `this.showMenu` from `false` to `true` and 
> vice-versa. The variable `this.showMenu` and it's context may not exist 
> explicitly, but they will still work as expected. If you need a more stable 
> state, you may want to reach for [a controller][controllers] 
> or create a wrapping Glimmer/Ember component.

[controllers]: https://guides.emberjs.com/release/routing/controllers/

```hbs
  <EhHotspot
    @rect={{array 70 80 200 50}}
    @action={{fn (mut this.showMenu) (not this.showMenu)}}
  />
```

#### Triggering navigation

> On click, navigate to `some/route?optional=true`

```hbs
  <EhHotspot
    @rect={{array 70 80 200 50}}
    @route="some.route"
    @queryParams=(hash optional=true)
  />
```

#### Adding an image

When adding an image to an hotspot, the height and width default to the 
dimensions of the image. Specifying width and height will override these 
defaults. In short, in most cases you only need to pass left and top position 
to hotspot.

```hbs
  <EhHotspot
    @rect={{array 70 80}}
    @src="foo@2x.png"
    @action={{fn (mut this.showMenu) true}}
  />
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

Ember Hotspots is developed by and © simplabs GmbH and contributors. It is 
released under the [MIT License](LICENSE.md).
