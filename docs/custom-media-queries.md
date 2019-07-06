# Custom Media Queries

Custom media queries are a bit like [CSS custom properties](https://vinceumo.github.io/devNotes/CSS/css-customs-properties/) (_CSS variables_), but for Media Queries ([spec](https://drafts.csswg.org/mediaqueries-5/#custom-mq)).

They are part or the not-yet-standardized CSS Media Queries specs level 4 and 5.  Currently there’s zero browser support for them, but they’re usable right now thanks to [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) or the dedicated ([PostCSS Custom Media plugin](https://github.com/postcss/postcss-custom-media)).

## Contents

- [Declaration](#declaration)
- [Use](#use)
- [Queries combinations](#queries-combinations)
- [Comparison chart](#comparison-chart)
- [What’s Next](#whats-next)
- [Example: dark mode](#example-dark-mode)
- [Example: complex query](#example-complex-query)

## Declaration

Declaring a custom media query must be done **outside selectors rulesets**, using the `@custom-media` _at_ rule.


```css
/* @custom-media <name> <value> */
@custom-media --large-text (min-width: 87em);
```

*(This verbose syntax is shorter with Double Dash ✌️.)*

## Use

The declared `--large-text` can be used in any `@media` rules:

```css
@media (--large-text) {
  .quotes { font-size: 3.5rem }
}
```

## Queries combinations

Let’s try to target a wearable watch using [its viewport](https://vizdevices.yesviz.com/watches.php) width and height:

```css
/* Media queries for max-width and max-height */
@custom-media --watch-max-w screen and (max-width: 270px);
@custom-media --watch-max-h screen and (max-height: 270px);
```

This queries the wearable:
```css
@media (--watch-max-w) and (--watch-max-h) { … }
```

Instead of composing the features list in `@media`, let’s combine it at declaration:

```css
@custom-media --watch (--watch-max-w) and (--watch-max-h);
```

This shorten the use in `@media` to:

```css
@media (--watch) { … }
```

## Comparison chart

. | Plain MQ | SCSS | Custom MQ | Custom MQ + Double Dash
|:--:|:--:|:--:|:--:|:--:|
Standardized | ✅ | ❌ | ☑️ (ongoing) | -
Don’t need SCSS | ✅ | ❌ | ✅ | ❌
Don’t need PostCSS now | ✅ | ✅ | ❌ | ❌
Won’t need PostCSS in the future | ✅ | ✅ | ✅ | ✅
Concise declaration | no declaration | ❌ (mixins and/or variables) | ❌ | ✅ partly invisible
Concise use | ❌ | ☑️ | ✅ | ✅ 
Combining queries | easy but unreadable | nesting (extra indentations) or advanced mixins | easy and readable | easy and readable
Explicit naming | ❌ | ☑️ (a lot of efforts for queries combinations) | ✅ | ✅
No naming conflict with SCSS variables | ✅ | ❌ (if breakpoint variables) | ✅ | ✅
Lighter CSS bundle in the future | ❌ | ❌ | ✅ | ✅

## What’s next?

- [Media query ranges](/docs/media-queries-ranges.md), another cool thing from the CSS Media Queries specs level 4 and 5.
- Supercharge your Custom media queries workflow with [Double Dash](/)!!

## Example: dark mode

### Plain media query

```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary: white;
    --background: black;
  }
}
```

### Custom media query

```css
@custom-media --dark (prefers-color-scheme: dark);

@media (--dark) {
  :root {
    --primary: white;
    --background: black;
  }
}
```

*(Double Dash has already declared `--dark` and [many more](/#predefined-custom-media-queries) for you ✌️.)*

## Example: complex query

*(Todo: provide Codepen link.)*

For this example, we style a navigation menu:
- sometimes sticky, sometimes not;
- sometimes with a background, sometimes without.

### Explain with words

*Words are not the best way to shape a clear understanding of what we try to achieve. But let’s try.*

The navigation menu:
- is sticky on small viewports (but not on too small height);
- has a transparent background when sticky;
- has a background image on greater viewport.

The served background image varies depending on:
- viewport pixels density;
- color scheme.

### Plain media query

The `@media` features lists are long and painful to understand:

```css
/* Sticky with transparent background */
@media (min-width: 320px) and (max-width: 799px) and (min-height: 500px) {
  .nav {
    position: sticky;
    background: transparent;
  }
}

/* Not sticky with dark background for high-resolution screens */
@media (min-width: 800px) and (prefers-color-scheme: dark) and (min-resolution: 124.8dpi), (min-width: 800px) and (prefers-color-scheme: dark) and (min-resolution: 1.3dppx) {
  .nav {
    background-image:  url('bg-dark_2x.png');
  }
}
```

### Custom media query

By splitting and naming the features using `@custom-media`, the `@media` become readable and maintainable.

```css
@custom-media --sticky-nav (min-width: 320px) and (max-width: 799px) and (min-height: 500px);
@custom-media --nav-expanded (min-width: 800px);
@custom-media --dark (prefers-color-scheme: dark);
@custom-media --hidpi (min-resolution: 1.3dppx), (min-resolution: 124.8dpi);

@media (--sticky-nav) {
  .nav {
    position: sticky;
    background: transparent;
  }
}

@media (--nav-expanded) and (--dark) and (--hidpi)  {
  .nav {
    background-image:  url('bg-dark_2x.png');
  }
}
```

💡 Media queries ranges can make [this last example even more readable](/docs/media-queries-ranges.md#declaring-a-custom-media-queries-using-ranges).
