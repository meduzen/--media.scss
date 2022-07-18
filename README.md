# Double Dash Media Queries

Double Dash + PostCSS = **the next decade media queries workflow, right now**.

Double Dash is a SCSS library helping to declare [custom media queries](docs/custom-media-queries.md). It includes:
- predefined custom media queries, covering the whole specs;
- mixins that generate *ranged* media queries (`min-width`, `max-width`…).

⚠️ **To use `double-dash.scss` in a `node-sass` project, see [v0.8 documentation](https://github.com/meduzen/--media.scss/tree/v0.8.0#contents)**. If you’re not sure about your environment, start with the [installation section](#installation).

## Contents

- [Installation](#installation)
- [Predefined custom media queries](#predefined-custom-media-queries)
  - [Color scheme (`prefers-color-scheme`)](#colors-scheme-prefers-color-scheme)
  - [Connectivity (`prefers-reduced-data`)](#connectivity-prefers-reduced-data)
  - [Contrast (`prefers-contrast`)](#contrast-prefers-contrast)
  - [Display (`display-mode`)](#display-display-mode)
  - [Motion (`prefers-reduced-motion`)](#motion-prefers-reduced-motion)
  - [Ratio (`aspect-ratio`)](#ratio-aspect-ratio)
  - [Others](#others)
- [Mixins for ranged media queries](#mixins-for-ranged-media-queries)
    - [Introduction](#introduction)
    - [Available mixins](#available-mixins)
      - [Width and height](#width-and-height)
      - [Resolution](#resolution)
      - [Ratio](#ratio)
- [Partial import](#partial-import)
- [Debug](#debug)

## Installation

💡 `double-dash.scss` supports both the old and the new (2020) SASS specification, but the usage of the library varies per spec.

<details>

<summary>If you’re not sure which one your project uses, this might help.</summary>

- If the project uses `node-sass` **or** if you import SCSS files using `@import`, there’s a high chance you use **the old spec**.
- If the project uses Dart SASS (`sass`) **and** if you import SCSS files using `@use` or `@forward`, you are using **the new spec**.
- In the new spec, `@import` is deprecated and variables are not global. This is why `double.dash.scss` usage isn’t the same changes depending on the spec.

</details>

### Projects using Dart SASS

**Dart SASS support starts at version 1.0.**

- `npm install double-dash.scss@dart-sass` pulls the package into your project;
- `@use 'double-dash.scss' as mq;` in all projects where you need one of its mixins or variables. `mq` is the recommended [namespace](https://sass-lang.com/documentation/at-rules/use#choosing-a-namespace) for `double-dash.scss`.

### Projects using `node-sass`

**Projects using `node-sass` must stick to version `0.x`**

- `npm install double-dash.scss@0` pulls the package into your project (for now, the `@0` part isn’t needed);
- `@import 'double-dash.scss';` near the beginning of the main SCSS file enables Double Dash features.

### Browser support

💡 Awaiting for browsers to embrace Custom Media Queries, [PostCSS Preset Env](https://preset-env.cssdb.org) is perfect to fill the gap. If you need an example of a small project using both `double-dash.scss` and PostCSS, you can have a look at [Can We](https://github.com/meduzen/canwe) repository.

## Predefined custom media queries

Double Dash provides a set of custom media queries usable in `@media` rules out of the box.

### Colors scheme ([prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme))

**`--dark`**: the user prefers a dark UI.

**`--light`**: the user prefers a light UI or has no colors preference.
Aliases: `--any-theme`, `--any-color-scheme`, `--no-theme-preference`, `--no-color-scheme-preference`.

Example:
```scss
html {
  background: white;
  color: black;

  @media (--dark) {
    background: black;
    color: white;
  }
}
```

### Contrast ([prefers-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast))

**`--more-contrast`**: the user prefers a UI with a higher level of contrast.
Aliases: `--high-contrast`, `--contrasted`.

**`--less-contrast`**: the user prefers a UI with a lower level of contrast.
Alias: `--low-contrast`.

**`--no-contrast-preference`**: the user has no contrast preference.
Aliases: `--any-contrast`, `--normal-contrast`.

### Connectivity ([prefers-reduced-data](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-data))

**`--reduced-data`**: the user prefers to save data.
Alias: `--data-shortage`.

**`--no-data-preference`**: the user doesn’t prefer to save data.
Alias: `--data`.

Example:
```scss
.hero {
  background-image: url('wedding-pic-2048-1024.webp');

  @media (--reduced-data) {
    background-image: none;
  }
}
```

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

### Ratio ([aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/aspect-ratio))

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
@use 'double-dash.scss' as mq;

// Gather component breakpoints in a SCSS list.
$nav-breakpoints: (
  'nav-collapsed': 45em,
  'nav-expanded': 90em,
);

// One mixin to generate them all.
@include mq.w($nav-breakpoints);
```

This unique `w` mixin call generates the following width-based custom media queries:
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
@media (--nav-expanded) {
  .nav-toggle-btn { display: none; }
}
```

### Available mixins

#### Width and height

```scss
@use 'double-dash.scss' as mq;

@include mq.w-from(name, width);
@include mq.w-to(name, width);
@include mq.w-is(name, width);
@include mq.w-from-to(name, smallerWidth, otherName, greaterWidth);
@include mq.w(widthsList);

@include mq.h-from(name, height);
@include mq.h-to(name, height);
@include mq.h-is(name, height);
@include mq.h-from-to(name, smallerHeight, otherName, greaterHeight);
@include mq.h(heightsList);
```

[Width and height mixins documentation](/docs/ranged-sizes-mixins.md).

#### Resolution

```scss
@use 'double-dash.scss' as mq;

@include mq.resolution-from(name, pxDensityFactor);
@include mq.resolution-to(name, pxDensityFactor);
@include mq.resolution-is(name, pxDensityFactor);
@include mq.resolution(resolutionsList);
```

[Resolution mixins documentation](/docs/ranged-resolutions-mixins.md).

#### Ratio

Soon.

## Partial import

The purpose of partial import is to avoid naming conflicts with existing custom media queries and SCSS mixins.

### Import predefined custom media queries

This examples only pulls the `prefers-reduced-motion` custom media queries:

```scss
@use 'double-dash.scss/src/variables/motion';
```

Available files: `color`, `js`, `light`, `motion`, `pointer`, `ratio`, `refresh`, `resolution`, `ui`.

### Import mixins for ranged media queries

Example for the resolution mixins:

```scss
@use 'double-dash.scss/src/mixins/sizes' as mq;
```

Available files: `ratio`, `resolution`, `sizes`.

## Debug

You can output each custom media query generated with Double Dash in your CLI by setting the `$debug` variable when importing Double Dash.

```scss
@use 'double-dash.scss' with ($debug: true);
```
