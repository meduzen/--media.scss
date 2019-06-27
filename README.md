**Currently writing the documentation**

# Double Dash Media Queries

_Double Dash_ + _PostCSS_ = **the next decade media queries workflow, right now**.

Double Dash is a SCSS library helping to declare [custom media queries](doc/custom-media-queries.md). It also comes with a set of predefined ones.

## Contents

- [Installation](#installation)
- [Predefined custom media queries](#predefined-custom-media-queries)
  - [Color scheme (`prefers-color-scheme`)](#colors-scheme-prefers-color-scheme)
  - [Display(`display-mode`)](#display-display-mode)
  - [Motion (`prefers-reduced-motion`](#motion-prefers-reduced-motion)
  - [Ratios (`aspect-ratio`](#ratios-aspect-ratio)
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

## First look

_Having a working knowledge of [custom media queries.md](doc/custom-media-queries) before using Double Dash is probably a wise recommandation._

```scss
// Define component breakpoints in a SCSS list.
$nav-breakpoints: (
  'nav-collapsed': 45em,
  'nav-expanded': 90em,
);

// Use Double Dash mixin to generate the related custom media queries.
@include --width($nav-breakpoints);
```
This unique line calling the `--width` mixin generates all the possible width-based (`min-width`, `max-width`) custom media queries:
```scss
--nav-collapsed // (min-width: 45em)
--nav-expanded // (min-width: 90em)
--to-nav-collapsed // (max-width: 44.999em)
--to-nav-expanded // (max-width: 89.999em)
--nav-collapsed-to-nav-expanded // (min-width: 45em) and (max-width: 89.999em)
```

That’s what *Double Dash* enables: **fast custom media queries declaration**. And even _no declaration needed_ for some of them that are already declared for you, like:
- `--dark` to target users with dark UI preference;
- `--hidpi` to target high pixel density screens;
- and [many more](#predefined-custom-media-queries).

Once declared using *Double Dash*, custom media queries are usable in the standard `@media` syntax:

```scss
@media (--nav-collapsed) {
  .nav { transform: translateX(80%); }
}

@media (--nav-expanded) and (--dark) and (--hidpi) {
  .nav { background-image: url('bg-dark_2x.png'); }
}
```

**Q:** Is it really shorter and more readable and lighter and… than [whatever]?

**A:** [Yes](#advantages). 😎 If you don’t agree, please [share your knowledge](https://github.com/meduzen/--media.scss/issues/new) 🙏.

## What is _Double Dash_?

_Double Dash_ is a set of custom media queries and SCSS mixins to speed up their declarations. It includes:

- a set of custom media queries named in an immediately understandable way: absolutely all available and future media queries from the specs have been named (some even have aliases);
- a set of mixins for *ranged* media queries (`min-width`, `max-width`…);
- a global mixin to fastly declare any custom media query.

*Double Dash* is available in a modulable fashion: you can import everything or only the files you need. All the mixins starts by a double dash (`--`) to avoid naming conflict with your other existing mixins.









```scss
```









```

```scss



```



```





```


```







## Also good to know

Aside from custom media queries, _Double Dash_ mixins already use some other level 4-5 media queries fanciness. This way, when massive browser adoption will be a thing 🤞, the generated code will be even lighter.

Among them (currently it’s the only one 🤭) are [media queries ranges](https://github.com/postcss/postcss-media-minmax) ([spec](https://www.w3.org/TR/mediaqueries-4/#mq-range-context)), allowing a concise syntax for _ranged_ media features (`width`, `height`, `resolution`, `aspect-ratio`, `color`).

### Media queries ranges

```css
/* CSS 3 */
@media (min-width: 50em) {
  body { font-size: 1.8rem; }
}

/* CSS 4 */
@media (width <= 50em) {
  body { font-size: 1.8rem; }
}

/* CSS 3 */
@media screen and (min-width: 20em) and (max-width: 50em) {
  .element { display: flex; }
}

/* CSS 4 */
@media screen and (20em <= width < 50em) {
  .element { display: flex; }
}
```
