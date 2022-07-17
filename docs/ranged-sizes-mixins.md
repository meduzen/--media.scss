# Sizes (width, height)

*(Height: soon)*

## Mixins import

Use one of these two to import the mixins in your file:

```scss
// import all double-dash.scss
@use 'double-dash.scss' as mq;

// only import sizes mixins
@use 'double-dash.scss/src/mixins/sizes' as mq;
```

## Syntax

```scss
@include mq.w-from(name, width);
@include mq.w-to(name, width);
@include mq.w-is(name, width);
@include mq.w-from-to(name, smallerWidth, otherName, greaterWidth);
@include mq.w(widthsList);
```

## Examples for `min-`, `max-` and _exact_ width examples

```scss
@use 'double-dash.scss' as mq;

@include mq.w-from(smallest, 20em);
@include mq.w-is(wii-u, 980px);
@include mq.w-to(filters-collapsed, 50em);
@include mq.w-from-to(smallest, 20em, filters-collapsed, 50em);
```

generates:
```css
@custom-media --smallest (min-width: 20em);
@custom-media --wii-u (width: 980px);
@custom-media --filters-collapsed (max-width: 49.999em);
@custom-media --smallest-to-filters-collapsed (min-width: 20em) and (max-width: 49.999em);
```

## The all-in-one mixin

Let’s imagine a responsive calendar having three display modes depending on the viewport width:
- compressed;
- one week visible;
- two weeks visible.

```scss
@use 'double-dash.scss' as mq;

$breakpoints-cal: (
  'cal-compressed': 20em,
  'cal-week': 45em,
  'cal-2-weeks': 94em,
);

@include mq.w($breakpoints-cal);
```

Available custom media queries:

```scss
--cal-compressed // (min-width: 20em)
--to-cal-compressed // (max-width: 19.999em)
--cal-week // (min-width: 45em)
--to-cal-week // (max-width: 44.999em)
--cal-2-weeks // (min-width: 94em)
--to-cal-2-weeks // (max-width: 93.999em)
--cal-compressed-to-cal-week // (min-width: 20em) and (max-width: 44.999em)
--cal-compressed-to-cal-2-weeks // (min-width: 20em) and (max-width: 93.999em)
--cal-week-to-cal-2-weeks // (min-width: 45em) and (max-width: 93.999em)
```

💡 Because width based media queries are the most common ones, they deserve to be the fastest to be written, so the names generated with `w()` are shorter than other outputs using Double Dash ranged mixins:
- Instead of `w-from-cal-week`, it’s `--cal-week`.
- Instead of `w-to-cal-week`, it’s `--to-cal-week`.

If you want more expressive names for width media queries, you can [change their prefix](#changing-the-prefixes).

### Changing the prefixes

When using the all-round `w` mixin, prefixes (`` and `to-`) can be replaced with 2 more arguments:

```scss
@include mq.w($breakpoints-cal, 'w-from-', 'w-to-');
```
The resulting available custom media queries become:
- `--w-from-cal-compressed`
- `--w-to-cal-compressed`
- `--w-from-cal-week`
- `--w-to-cal-week`
- `--w-from-cal-2-weeks`
- `--w-to-cal-2-weeks`
- `--cal-compressed-to-cal-week`
- `--cal-compressed-to-cal-2-weeks`
- `--cal-week-to-cal-2-weeks`

This was for the all-round mixin. For the other ones, the third parameter is the prefix:

```scss
@include mq.w-from(small-phone, 20em, 'wider-than-');
```

generates:
```css
@custom-media --wider-than-small-phone (min-width: 20em);
```
