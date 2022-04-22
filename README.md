# ember-hotspots

Create interactive prototypes from scratch and design mockups using little code
but the full power of the Ember.js ecosystem.

TODO: Add animation showing the addon in use

## Compatibility

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above

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

Image file names ending in `@2x` like `background@2x.png` are treated as
"Retina" style images, which means they will be displayed at half their actual
pixel size. This allows for crisper rendering on high density displays used in
many mobile devices. No other suffixes are supported. Both `<EhBackground />`
and `<EhHotspot />` will provide feedback if a referenced image is missing.

All images detected by the addon will be preloaded and added to the browsers
prefetch list by default. This behavior can be configured in
[the addons options][options].

### The addon in use

Clicking and holding the left mouse button or tapping and holding on a touch 
device will reveal all hotspots in the document. 

## Demo

The included dummy application of this addon acts as a [online-demo][demo].

[options]: #options
[demo]: #todo

## Options

Settings can be configured in your applications `ember-cli-build.js`.

```js
module.exports = function (defaults) {
  // ...

  let app = new EmberAddon(defaults, {
    // Defaults
    'ember-hotspots': {
      cwd: '/', // limit image parsing to a subfolder of `/public`. Example: pass `/hotspots` to limit to `/public/hotspots`
      // prefetch and preload make sure images are ready when they should be displayed
      preload: true, // Preload all images found using a JavaScript preloader which delays your application
      prefetch: true, // Put prefetch `<link>` tags in the HTML `<head>` so browsers can preload and cache images
    },
  });

  // ...
};
```

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

#### Changing the trigger event

Hotspots react to clicks / taps by default. The `@trigger` attribute can be
used to change that to any valid JavaScript DOM event. `EhHotspot` also 
supports a special event named `hover`, which will trigger the `@action` 
twice: Once on mouseenter, once on mouseleave. This can be used to emulate a 
hover effect for buttons and other elements like so:

```hbs
<EhHotspot
  @rect={{array 341 671 304 90}}
  @src={{if this.buttonHasHover "button-with-hoverstate@2x.png"}}
  @action={{fn (mut this.buttonHasHover) (not this.buttonHasHover)}}
  @trigger="hover"
/>
```

In this example the hotspot changes to a background image on hover. The 
non-hovered state is expected to be part of the background. You could also add 
a second image to the parameter list of the `{{if }}` which will be shown when 
the condition is falsy.

While not included in the addon, this pattern can be wrapped in a template-only Glimmer component for easier re-use.

### Combining everything into a prototype

#### Prerequisites

- Setup a new Ember application
- Put three images into the `/public` folder:
  - the background which has a logo in the upper left a menu button in the upper right corner
  - the open menu
  - the second route background

#### Goals of the prototype

- Show the menu when clicking on the menu button.
- When clicking anywhere on the open menu, it should close and navigate to a second route.
- Clicking on the logo on either route will bring us back to the first one.

#### Necessary code

Using the [generate commmand][generate] of `ember-cli` will setup and create
the correct files for your routes.

[generate]: https://guides.emberjs.com/release/routing/defining-your-routes/

`ember generate route index` will generate `templates/index.hbs`, where we can
put this code:

```hbs
<EhBackground @src="path/to/your/image/in/the/public/folder@2x.png">
  {{! The logo hotspot }}
  <EhHotspot
    @rect={{array 0 0 200 100}}
    @route="index"
  />

  {{! The hotspot for the menu toggle }}
  <EhHotspot
    @rect={{array 900 0 100 100}}
    @action={{fn (mut this.showMenu) (not this.showMenu)}}
  />

  {{! The menu }}
  <EhHotspot
    @rect={{array 0 100}}
    @src="menu@2x.png"
    @action={{fn (mut this.showMenu) false}}
    @route="another-route"
  />
</EhBackground>
```

`ember generate route another-route` will generate
`templates/another-route.hbs`, which will hold this code:

```hbs
<EhBackground @src="path/to/your/image/in/the/public/folder@2x.png">
  <EhHotspot
    @rect={{array 0 0 200 100}}
    @route="index"
  />

  <EhHotspot
    @rect={{array 900 0 100 100}}
    @action={{fn (mut this.showMenu) (not this.showMenu)}}
  />

  <EhHotspot
    @rect={{array 0 100}}
    @src="menu@2x.png"
    @action={{fn (mut this.showMenu) false}}
    @route="another-route"
  />
</EhBackground>
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

Ember Hotspots is developed by and © simplabs GmbH and contributors. It is
released under the [MIT License](LICENSE.md).
