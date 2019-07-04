**Currently writing the documentation**

# Double Dash Media Queries

Double Dash + PostCSS = **the next decade media queries workflow, right now**.

Double Dash is a SCSS library helping to declare [custom media queries](doc/custom-media-queries.md). It includes:
- predefined custom media queries, covering the whole specs;
- mixins that generate *ranged* media queries (`min-width`, `max-width`…);
- a generic mixin to declare any custom media query faster.

## Contents

- [Installation](#installation)
- [Predefined custom media queries](#predefined-custom-media-queries)
  - [Color scheme (`prefers-color-scheme`)](#colors-scheme-prefers-color-scheme)
  - [Display (`display-mode`)](#display-display-mode)
  - [Motion (`prefers-reduced-motion`)](#motion-prefers-reduced-motion)
  - [Ratios (`aspect-ratio`)](#ratios-aspect-ratio)
  - [Others](#others)
- [Mixins for ranged media queries](#mixins-for-ranged-media-queries)
    - [First look](#first-look)
    - [Resolution](#resolution)
    - (soon) Sizes
    - (soon) Ratio
- [Partial import](#partial-import)

## Installation

- `npm install double-dash.scss` pulls the package into your project.
- `@import '~double-dash.scss';` near the beginning of the main SCSS file enables Double Dash features.

Note: awaiting for browsers to embrace Custom Media Queries, some CSS post-processing is needed. [Post CSS Present Env](https://preset-env.cssdb.org/) perfectly fills this gap.

## Predefined custom media queries

Double Dash provides a set of custom media queries usable in `@media` rules out of the box.

### Colors scheme ([prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme))

**`--dark`**: the user prefers a dark UI.

**`--light`**: the user prefers a light UI.

**`--any-theme`**: no colors preference.
Aliases: `--any-color-scheme`, `--no-theme-preference`, `--no-color-scheme-preference`


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
Aliases: `--motion`, `--full-motion`, `--play`, `--animate-all-the-things`, `party-parrot`.

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


### First look

Mixins for ranged media queries allow you to quickly generate a lof of maintainable custom media queries.

```scss
// Gather component breakpoints in a SCSS list.
$nav-breakpoints: (
  'nav-collapsed': 45em,
  'nav-expanded': 90em,
);

// One mixin to generate them all.
@include --width($nav-breakpoints);
```

This unique call to the `--width` mixin generates all the width-based custom media queries (`min-width`, `max-width`) , including combinations:
```scss
--nav-collapsed // (min-width: 45em)
--nav-expanded // (min-width: 90em)
--to-nav-collapsed // (max-width: 44.999em)
--to-nav-expanded // (max-width: 89.999em)
--nav-collapsed-to-nav-expanded // (min-width: 45em) and (max-width: 89.999em)
```

### Resolution

Syntaxes overview:

```scss
@include --resolution-from(name, pxDensityFactor);
@include --resolution-to(name, pxDensityFactor);
@include --resolution-is(name, pxDensityFactor);
@include --resolution(resolutionsList);
```

Examples:

```scss
@include --resolution-from(hidpi, 1.3);
@include --resolution-to(ldpi, 1.3);
@include --resolution-is(dppx-switch, 2.46875);

// generates
@custom-media --hidpi (min-resolution: 1.3dppx), (min-resolution: 124.8dpi);
@custom-media --ldpi (max-resolution: 1.299dppx), (max-resolution: 124.799dpi);
@custom-media --dppx-switch (resolution: 2.46875dppx), (resolution: 237dpi);
```

#### Using the all-in-one mixins

```scss
$dppx: (
  '1x': 1, // 1dppx = 96 dpi
  '2x': 2, // 2dppx = 192 dpi
  'switch': 2.46875, // 2.46875dppx = 237ppi
);

@include --resolution($dppx);
```

Available custom media queries:
- `--resolution-1x`, `--resolution-from-1x`, `--resolution-to-1x`,
- `--resolution-2x`, `--resolution-from-2x`, `--resolution-to-2x`,
- `--resolution-switch`, `--resolution-from-switch`, `--resolution-to-switch`.

When using the all-round `--resolution` mixin, prefixes (`resolution-from-`, `resolution-` and `resolution-to-`) can be replaced with 3 more arguments:

```scss
@include --resolution($dppx, 'res-from-', 'res-is-', 'res-to-');
```

By doing so, the resulting custom media queries become:
- `--res-1x`, `--res-from-1x`, `--res-to-1x`,
- `--res-2x`, `--res-from-2x`, `--res-to-2x`,
- `--res-switch`, `--res-from-switch`, `--res-to-switch`.

## Partial import

The purpose of partial import is to avoid naming conflicts with existing custom media queries and SCSS mixins.

### Import predefined custom media queries

This examples only pulls the `prefers-reduced-motion` custom media queries:

```scss
`@import '~double-dash.scss/src/variables/motion';`
```

Available files: `color`, `js`, `light`, `motion`, `pointer`, `ratio`, `refresh`, `resolution`, `ui`.

### Import mixins for ranged media queries

First, import the generic `--media` mixins: the other mixins use it:

```scss
@import '~double-dash.scss/src/mixins/base';
```

Then, pulls the mixins for viewport sizes custom media queries:

```scss
@import '~double-dash.scss/src/mixins/sizes';
```

Available files: `ratio`, `resolution`, `sizes`.
