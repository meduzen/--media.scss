# Media queries ranges

Media queries ranges ([spec](https://www.w3.org/TR/mediaqueries-4/#mq-range-context), [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Syntax_improvements_in_Level_4)), allows a concise syntax for _ranged_ media features, which are the ones allowing the `min-` and `max-` prefixes in their syntax (`width`, `height`, `resolution`, `aspect-ratio`, `color`).

They are part or the not-yet-standardized CSS Media Queries specs level 4 and 5.  Currently there’s zero browser support for them, but they’re usable right now thanks to [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) or the dedicated ([PostCSS Media Minmax plugin](https://github.com/postcss/postcss-media-minmax)).

## Without ranged media queries

```css
@media (min-width: 50em) {
  body { font-size: 1.8rem; }
}

@media screen and (min-width: 20em) and (max-width: 49.999em) {
  .element { display: flex; }
}
```

## With ranged media queries

```css
@media (width >= 50em) {
  body { font-size: 1.8rem; }
}

@media screen and (20em <= width < 50em) {
  .element { display: flex; }
}
```

*(Double Dash [ranged mixins](/#mixins-for-ranged-media-queries) already uses this syntax. This way, when massive browser adoption will be a thing 🤞, the generated code will be lighter.)*

## Declaring a custom media queries using ranges

Let’s take the `--sticky-nav` declaration from the [complex query example](/doc/custom-media-queries.md#example-complex-query) in the custom media queries explanation.

### Without ranges

```css
@custom-media --sticky-nav (min-width: 320px) and (max-width: 799px) and (min-height: 500px);
```

### With ranges

```css
@custom-media --sticky-nav (320px <= width < 800px) and (height >= 500px);
```
