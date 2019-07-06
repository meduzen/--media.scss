# Sizes (width, height)

*(Height: soon)*

## Mixins syntaxes

```scss
@include --w-from(name, width);
@include --w-to(name, width);
@include --w-is(name, width);
@include --w-from-to(name, smallerWidth, otherName, greaterWidth);
@include --w(widthsList);
```

## `min-`, `max-` and exact width examples

```scss
@include --w-from(smallest, 20em);
@include --w-is(wii-u, 980px);
@include --w-to(filters-collapsed, 50em);
@include --w-from-to(smallest, 20em, filters-collapsed, 50em);

// generates
@custom-media --smallest (min-width: 20em);
@custom-media --wii-u (width: 980px);
@custom-media --filters-collapsed (max-width: 49.999em);
@custom-media --smallest-to-filters-collapsed (min-width: 20em) and (max-width: 49.999em);
```

## All-in-one mixin example

Let’s imagine a responsive calendar having three display modes depending on the viewport width:
- compressed;
- one week visible;
- two weeks visible.

```scss
$breakpoints-cal: (
  'cal-compressed': 20em,
  'cal-week': 45em,
  'cal-2-weeks': 94em,
);

@include --w($breakpoints-cal);
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

💡Because width based media queries are the most common ones, they deserve to be the shortest to be written, so the names generated with `--w()` are shorter than other outputs using Double Dash ranged mixins:
- Instead of `--w-from-cal-week`, it’s `--cal-week`.
- Instead of `--w-to-cal-week`, it’s `--to-cal-week`.

### Changing the prefixes

When using the all-round `--w` mixin, prefixes (`` and `to-`) can be replaced with 2 more arguments:

```scss
@include --w($breakpoints-cal, 'w-from-', 'w-to-');
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
