**Currently writing the documentation**

# Double Dash Media Queries

_Double Dash_ + _PostCSS_ = tomorrow’s custom media queries workflow, right now.

## Custom media queries

_People already familiar with custom media queries can skip this part._

Among other new features, the no-yet-standardized CSS Media Queries specs (level 4 and 5) comes with custom media queries ([PostCSS plugin](https://github.com/postcss/postcss-custom-media), [spec](https://drafts.csswg.org/mediaqueries-5/#custom-mq)). There’s zero browser support for them, but they’re usable right now thanks to [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env), which enables them, among other cool things.

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

This verbose syntax (compared to the one of SCSS variables) will be shorter with Double Dash ✌️.

```css
/*  at-rule              custom property value (coma separated features list)
      ↓                                        ↓                           */
@custom-media --high-res (min-resolution: 1.3dppx), (min-resolution: 124.8dpi); /*
                   ↑
         custom property name                                              */
```

The name of the declared custom media query can now be used in a `@media` rule: 

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

Benefits right now over SCSS variables and mixins:
- (on the way to be) standardized, so available outside of any SCSS context (but PostCSS is needed);
- shorter to write than SCSS mixins;
- no naming conflict with SCSS variables;
- can be easily combined (and nested for people using SCSS):
```css
@media (--dark) and (--high-res) { … }
```

Benefits once standardized and widespread:
- final CSS file will be lighter in the browser.

Now that everyone loves custom media queries, let’s finally meet _Double Dash_.

