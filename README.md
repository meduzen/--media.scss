**Currently writing the documentation**

# Double Dash Media Queries

_Double Dash_ + _PostCSS_ = tomorrow’s custom media queries workflow, right now.

_Having a working knowledge of [CSS custom properties](https://vinceumo.github.io/devNotes/css/2019/02/20/css-customs-properties.html) before using Double Dash is probably a wise recommandation._

## Contents

- [First look](#first-look)
- [Installation](#installation)
- [Ready-to-use custom media queries](#ready-to-use-custom-media-queries)
  - [Color scheme (`prefers-color-scheme`)](#colors-scheme-prefers-color-scheme)
  - [Display(`display-mode`)](#display-display-mode)
  - [Motion (`prefers-reduced-motion`](#motion-prefers-reduced-motion)
  - [Ratios (`aspect-ratio`](#ratios-aspect-ratio)
- [Introduction to custom media queries](#custom-media-queries)
- [Media queries ranges](#media-queries-ranges)

## First look

*Double Dash* makes [custom media queries](#custom-media-queries) declaration a breeze. It even comes with a set of predefined ones.

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
- and [many more](#ready-to-use-custom-media-queries).

Once declared using *Double Dash*, custom media queries are usable in the standard `@media` syntax:

```scss
@media (--nav-collapsed) {
  .nav { transform: translateX(80%); }
}

@media (--nav-expanded) and (--dark) and (--hidpi) {
  .nav { background-image: url('bg-dark_2x.png'); }
}
```

### Mini-FAQ

Q: Is it really shorter and more readable and lighter and… than [whatever]?

A: [Yes](#advantages). 😎 If you don’t agree, please [share your knowledge](https://github.com/meduzen/--media.scss/issues/new) 🙏.

## What is _Double Dash_?

_Double Dash_ is a set of custom media queries and SCSS mixins to speed up their declarations. It brings 3 things:

1. a set of custom media queries named in an immediately understandable way: absolutely all available and future media queries from the specs have been named (some even have aliases), apart from the deprecated ones (like `device-width`);
2. a set of mixins for *ranged* media queries (`min-width`, `max-width`…);
3. a global mixin to fastly declare any custom media query.

*Double Dash* is available in a modulable fashion: you can import everything or only the files you need. All the mixins starts by a double dash (`--`) to minimize the chance of naming conflict with other SCSS mixins.

## Installation

- `npm install double-dash.scss` pulls the package into your project.
- `@import '~double-dash.scss';` near the beginning of the main SCSS file makes its features available.

## Ready-to-use custom media queries

Here are all the custom media queries usable in `@media` rules out of the box.

### Colors scheme ([prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme))

**`--dark`**: the user prefers dark UI.

**`--light`**: the user prefers a light UI.

**`--any-theme`**: no colors preference.

### Display ([display-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode))

These custom media queries matches the [Web Manifest `display`](https://developer.mozilla.org/en-US/docs/Web/Manifest#display) property.

**`--fullscreen`**: the website covers the screen, the browser has no _chrome_ (= no user interface).

**`--standalone`**: the website is displayed like if it is an app.

**`--minimal-ui`**: same as `standalone`, with some browser UI elements.

**`--browser`**: the website is open in a browser tab or window.

### Motion ([prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion))

**`--reduced-motion`**: the user wants less animation.

**`--no-motion-preference`**: the user doesn’t want less animation.

Example:
```scss
*,
*::before,
*::after {
  @media (--reduced-motion) {
    transition: none !important;
    animation: none !important;
  }
}
```

### Ratios ([aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/aspect-ratio))

**`--landscape`**: the viewport width is greater than its height.

**`--square`**: the viewport width and height are equal.

**`--portrait`**: the viewport width is smaller than is height.

### Others

*Not documented yet. Feel free to have a messy look at the [messy sources](https://github.com/meduzen/--media.scss/tree/master/src/variables).*

## Custom media queries

Among other new features, the not-yet-standardized CSS Media Queries specs (level 4 and 5) comes with custom media queries ([PostCSS plugin](https://github.com/postcss/postcss-custom-media), [spec](https://drafts.csswg.org/mediaqueries-5/#custom-mq)). There’s zero browser support for them, but they’re usable right now thanks to [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env), which enables them, among other cool things.

Like custom properties, the purpose of custom media queries is to avoid repetition and ensure consistency.

Let’s compare how to write styles using CSS 3, then SCSS, then custom media queries.

### CSS 3

CSS 3 doesn’t prevent repetitions of verbose `@media` statements:
```css
// layout.css
@media (min-resolution: 124.8dpi), (min-resolution: 1.3dppx){
  .bg-pattern { background-image: url('bg-pattern_2x.png') }
}

// customer-testimony.css
@media (min-resolution: 124.8dpi), (min-resolution: 1.3dppx){
  .quotes { font-weight: 100; }
}

// spritesheets.css
@media (min-resolution: 124.8dpi), (min-resolution: 1.3dppx){
  .sky-box { background-image: url('sprites/skies_2x.jpg') }
}
```

### SCSS

SCSS mixins and variables reduces verbosity and brings better readability:
```scss
// variables/media-queries.scss
$high-res: 1.3;

// layout.scss
@include min-resolution($high-res) {
  .bg-pattern { background-image: url('bg-pattern_2x.png') }
}

// customer-testimony.scss
@include min-resolution($high-res) {
  .quotes { font-weight: 100; }
}

// spritesheets.scss
@include min-resolution($high-res) {
  .sky-box { background-image: url('sprites/skies_2x.jpg') }
}
```

### Custom media queries

Declaring a custom media query must be done outside of any selector ruleset, using the `@custom-media` _at_ rule.

```css
/*  at-rule              custom property value (coma separated features list)
      ↓                   ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓                           */
@custom-media --high-res (min-resolution: 1.3dppx), (min-resolution: 124.8dpi);
/*                 ↑
                   ↑
         custom property name                                              */
```

*(This verbose syntax will be shorter with Double Dash ✌️.)*

The custom media query can now be used in `@media` rules: 

```css
// layout.scss
@media (--high-res) {
  .bg-pattern { background-image: url('bg-pattern_2x.png') }
}

// customer-testimony.scss
@media (--high-res) {
  .quotes { font-weight: 100; }
}

// spritesheets.scss
@media (--high-res) {
  .sky-box { background-image: url('sprites/skies_2x.jpg') }
}
```

Another example:
```css
@custom-media --dark (prefers-color-scheme: dark);

@media (--dark) {
  :root {
    --primary: white;
    --background: black;
  }
}
```

#### Advantages

Benefits right now over SCSS variables and mixins:
- (on the way to be) standardized, so available outside of any SCSS context (but PostCSS is needed);
- shorter to write than SCSS mixins;
- no naming conflict with SCSS variables;
- fast declaration thanks to *Double Dash*;
- can be easily combined (and nested for people using SCSS):
```css
@media (--dark) and (--high-res) { … }
```

Benefits once standardized and widespread:
- final CSS file will be lighter in the browser.

Next step: first look at [Double Dash](#first-look).

## Also good to know

Aside from custom media queries, _Double Dash_ mixins already use some other media queries 4-5 fanciness. This way, when massive browser adoption will be a thing 🤞, the generated code will be lighter than now.

Among them (currently it’s the only one 🤭) are [media queries ranges](https://github.com/postcss/postcss-media-minmax) ([spec](https://www.w3.org/TR/mediaqueries-4/#mq-range-context)), allowing a concise syntax for _ranged_ media features (`width`, `height`, `resolution`, `aspect-ratio`, `color`).

### Media queries ranges

```css
// CSS 3
@media (min-width: 50em) {
  body { font-size: 1.8rem; }
}

// CSS 4
@media (width <= 50em) {
  body { font-size: 1.8rem; }
}

// CSS 3
@media screen and (min-width: 20em) and (max-width: 50em) {
  .element { display: flex; }
}

// CSS 4
@media screen and (20em <= width < 50em) {
  .element { display: flex; }
}
```
