# Custom Media Queries

Custom media queries are a bit like [CSS custom properties](https://vinceumo.github.io/devNotes/CSS/css-customs-properties/) (_CSS variables_), but for Media Queries ([PostCSS plugin](https://github.com/postcss/postcss-custom-media), [spec](https://drafts.csswg.org/mediaqueries-5/#custom-mq)).

They are part or the not-yet-standardized CSS Media Queries specs level 4 and 5.  Currently there’s zero browser support for them, but they’re usable right now thanks to [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env).

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

Let’s try to target a wearable watch using its viewport width and height:

```css
/* Declare max-width/height custom media queries: */
@custom-media --watch-max-w screen and (max-width: 270px);
@custom-media --watch-max-h screen and (max-height: 270px);
```

This queries the wearable:
```css
@media (--watch-max-w) and (--watch-max-h) { … }
```

Instead of composing in `@media`, let’s combine at declaration:

```css
@custom-media --watch (--watch-max-w) and (--watch-max-h);
```

This shorten the use in `@media` to:

```css
@media (--watch) { … }
```

## Comparison chart

#### Advantages

Feature | Plain media queries | SCSS | Custom media queries | Custom media queries with Double Dash
|--|--|--|--|--|
Standardized | ✅ | ❌ | ✅ (ongoing) | -
Don’t need SCSS | ✅ | ❌ | ✅ | ❌
Don’t need PostCSS now | ✅ | ✅ | ❌ | ❌
Don’t need PostCSS in the future | ✅ | ✅ | ✅ | ✅
Declaration verbosity | - | depends on the workflow | verbose | partly invisible
Use in `@media` | verbose | not so verbose | concise | concise 
Combining queries | easy but unreadable | require nesting (extra indentations) or advanced mixins | easy and readable | concise
No naming conflict with SCSS variables | ✅ | ❌ (for breakpoint variables) | ✅ | ✅
Lighter CSS bundle in the future | ❌ | ❌ | ✅ | ✅

## What’s next?

- (Soon) Media query ranges, another cool CSS Media Queries specs level 4 and 5.
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

*(Double Dash has already declared `--dark` and many more for you ✌️.)*

## Example: complex query

We have a navigation menu, sometimes sticky, sometimes not, sometimes with a background, sometimes not.

The navigation menu:
- is sticky on small viewports (but not on too small height);
- has a transparent background when sticky;
- has a background image on greater viewport.

The background image varies depending on:
- viewport pixels density;
- color scheme.

### Plain media query

```css
@media (min-width: 320px) and (max-width: 799px) and (min-height: 500px) {
  .nav {
    position: sticky;
    background: transparent;
  }
}

@media (min-width: 800px) and (prefers-color-scheme: dark) and (min-resolution: 124.8dpi), (min-width: 800px) and (prefers-color-scheme: dark) and (min-resolution: 1.3dppx) {
  .nav {
    background-image:  url('bg-dark_2x.png');
  }
}
```

### Custom media query

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
