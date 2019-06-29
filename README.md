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
  - [Display(`display-mode`)](#display-display-mode)
  - [Motion (`prefers-reduced-motion`](#motion-prefers-reduced-motion)
  - [Ratios (`aspect-ratio`](#ratios-aspect-ratio)
- [Partial import](#partial-import)
- [First look](#first-look)

## Installation

- `npm install double-dash.scss` pulls the package into your project.
- `@import '~double-dash.scss';` near the beginning of the main SCSS file enables Double Dash features.

Note: awaiting for browsers to embrace Custom Media Queries, some CSS post-processing is needed. [Post CSS Present Env](https://preset-env.cssdb.org/) perfectly fills this gap.

## Predefined custom media queries

These custom media queries provided by Double Dash are all usable in `@media` rules out of the box.

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



















```scss
```








```

```scss



```

## Partial import

### Import predefined custom media queries

This examples pulls the `prefers-reduced-motion` custom media queries:

```scss
`@import '~double-dash.scss/src/variables/motion';`
```

Available files: `color`, `js`, `light`, `motion`, `pointer`, `ratio`, `refresh`, `resolution`, `ui`.

### Import mixins for ranged media queries

First, import the generic `--media` mixins: the other mixins use it:

```scss
@import '~double-dash.scss/src/mixins/main';
```

Then, pulls the mixins for viewport sizes custom media queries:

```scss
@import '~double-dash.scss/src/mixins/sizes';
```

Available files: `ratio`, `resolution`, `sizes`.





```
