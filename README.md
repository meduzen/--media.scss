# Double Dash Media Queries

Double Dash + PostCSS = **the next decade media queries workflow, right now**.

Double Dash is a SCSS library helping to declare [custom media queries](docs/custom-media-queries.md). It includes:
- predefined custom media queries, covering the whole specs;
- mixins that generate *ranged* media queries (`min-width`, `max-width`…).

## Contents

- [Installation](#installation)
- [Predefined custom media queries](#predefined-custom-media-queries)
  - [Color scheme (`prefers-color-scheme`)](#colors-scheme-prefers-color-scheme)
  - [Display (`display-mode`)](#display-display-mode)
  - [Motion (`prefers-reduced-motion`)](#motion-prefers-reduced-motion)
  - [Ratios (`aspect-ratio`)](#ratios-aspect-ratio)
  - [Others](#others)
- [Mixins for ranged media queries](#mixins-for-ranged-media-queries)
    - [Introduction](#introduction)
    - [Available mixins](#available-mixins)
- [Partial import](#partial-import)
- [Debug](#debug)

## Installation

- `npm install double-dash.scss` pulls the package into your project.
- `@import '~double-dash.scss';` near the beginning of the main SCSS file enables Double Dash features.

💡 Awaiting for browsers to embrace Custom Media Queries, some CSS post-processing is needed. [Post CSS Preset Env](https://preset-env.cssdb.org/) perfectly fills this gap.

## Predefined custom media queries

Double Dash provides a set of custom media queries usable in `@media` rules out of the box.

### Colors scheme ([prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme))

**`--dark`**: the user prefers a dark UI.

**`--light`**: the user prefers a light UI or has no colors preference.
Aliases: `--any-theme`, `--any-color-scheme`, `--no-theme-preference`, `--no-color-scheme-preference`.

**`--any-theme`**: no colors preference.
Aliases: `--any-color-scheme`, `--no-theme-preference`, `--no-color-scheme-preference`.


### Display ([display-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode))

These custom media queries matches the [Web Manifest `display`](https://developer.mozilla.org/en-US/docs/Web/Manifest#display) property.

**`--fullscreen`**: the website covers the screen, the browser has no _chrome_ (= no user interface).

**`--standalone`**: the website is displayed as if it was an app.

**`--minimal-ui`**: same as `standalone`, with some browser UI elements.

**`--browser`**: the website is open in a browser tab or window.

### Motion ([prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion))

**`--reduced-motion`**: the user wants less or no animation.
Aliases: `--no-motion`, `--less-motion`, `--stop`.

**`--no-motion-preference`**: the user doesn’t want less animation.
Aliases: `--motion`, `--full-motion`, `--play`, `--animate-all-the-things`, `--party-parrot`.

Example:
```scss
*,
*::before,
*::after {
  @media (--reduced-motion) {
    transition-duration: 0.001s !important;
    animation-duration: 0.001s !important;
  }
}
```

### Ratios ([aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/aspect-ratio))

**`--landscape`**: the viewport width is greater than its height.
Alias: `--horizontal`.

**`--square`**: the viewport width and height are equal.

**`--portrait`**: the viewport width is smaller than its height.
Alias: `--vertical`.

### Others

*Not documented yet. Feel free to have a messy look at the [messy sources](https://github.com/meduzen/--media.scss/tree/master/src/variables).*

## Mixins for ranged media queries

### Introduction

Mixins for ranged media queries generate a lot of custom media queries based on breakpoints lists.

```scss
// Gather component breakpoints in a SCSS list.
$nav-breakpoints: (
  'nav-collapsed': 45em,
  'nav-expanded': 90em,
);

// One mixin to generate them all.
@include --w($nav-breakpoints);
```

This unique `--w` mixin call generates all these width-based custom media queries:
```scss
// min-width
--nav-collapsed // (min-width: 45em)
--nav-expanded // (min-width: 90em)

// max-width
--to-nav-collapsed // (max-width: 44.999em)
--to-nav-expanded // (max-width: 89.999em)

// combinations
--nav-collapsed-to-nav-expanded // (min-width: 45em) and (max-width: 89.999em)
```

They are now all usable in `@media`:

```css
@media(--nav-expanded) {
  .nav-toggle-btn { display: none; }
}
```

### Available mixins

#### Width and height

```scss
@include --w-from(name, width);
@include --w-to(name, width);
@include --w-is(name, width);
@include --w-from-to(name, smallerWidth, otherName, greaterWidth);
@include --w(widthsList);

@include --h-from(name, height);
@include --h-to(name, height);
@include --h-is(name, height);
@include --h-from-to(name, smallerHeight, otherName, greaterHeight);
@include --h(heightsList);
```

[Width and height mixins documentation](/docs/ranged-sizes-mixins.md).

#### Resolution

```scss
@include --resolution-from(name, pxDensityFactor);
@include --resolution-to(name, pxDensityFactor);
@include --resolution-is(name, pxDensityFactor);
@include --resolution(resolutionsList);
```

[Resolution mixins documentation](/docs/ranged-resolutions-mixins.md).

#### Ratio

Soon.

## Partial import

The purpose of partial import is to avoid naming conflicts with existing custom media queries and SCSS mixins.

### Import predefined custom media queries

This examples only pulls the `prefers-reduced-motion` custom media queries:

```scss
`@import '~double-dash.scss/src/variables/motion';`
```

Available files: `color`, `js`, `light`, `motion`, `pointer`, `ratio`, `refresh`, `resolution`, `ui`.

### Import mixins for ranged media queries

First, import the generic `--media` mixins (the other mixins use it):

```scss
@import '~double-dash.scss/src/mixins/base';
```

Then, pulls the mixins for viewport sizes custom media queries:

```scss
@import '~double-dash.scss/src/mixins/sizes';
```

Available files: `ratio`, `resolution`, `sizes`.

## Debug

You can output each custom media query generated with Double Dash in your CLI by setting the `$dash-dash-debug` variable before importing Double Dash.

```scss
$dash-dash-debug: true;
@import '~double-dash.scss';
```
