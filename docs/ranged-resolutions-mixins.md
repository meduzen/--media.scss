# Resolution

[Valid units for resolutions](https://developer.mozilla.org/en-US/docs/Web/CSS/resolution#Units) media queries are:
- for screens: `dppx` (alias: `x`) and `dpi` (1 dppx = 96 dpi);
- for printed materials: `dpcm`.

The reference unit in Double Dash is the `dppx`. Currently, `dpcm` are unsupported.

| dppx | dpi | example devices
|--|--|--|
| 1 | 96 | most PC monitors
| 1.3 | 124.8 | Google Nexus 7 2012
| 1.5 | 144 | Samsung Galaxy Watch 2018
| 2 | 192 | most Macbook Pro and iPad models, iPhone 6
| 2.46875 | 236.87 | Nintendo Switch
| 3 | 288 | iPhone XS Max

## Mixins import

Use one of these two to import the mixins in your file:

```scss
// import all double-dash.scss
@use 'double-dash.scss' as mq;

// only import resolution mixins
@use 'double-dash.scss/src/mixins/resolution' as mq;
```

## Syntax

```scss
@include mq.resolution-from(name, pxDensityFactor);
@include mq.resolution-to(name, pxDensityFactor);
@include mq.resolution-is(name, pxDensityFactor);
@include mq.resolution(resolutionsList);
```

## Examples for `min-`, `max-` and _exact_ resolution examples

```scss
@use 'double-dash.scss' as mq;

@include mq.resolution-from(hidpi, 1.3);
@include mq.resolution-to(ldpi, 1.3);
@include mq.resolution-is(dppx-switch, 2.46875);
```

generates:
```css
@custom-media --hidpi (min-resolution: 1.3dppx), (min-resolution: 124.8dpi);
@custom-media --ldpi (max-resolution: 1.299dppx), (max-resolution: 124.799dpi);
@custom-media --dppx-switch (resolution: 2.46875dppx), (resolution: 237dpi);
```

💡 Autoprefixer [doesn’t handle](https://github.com/postcss/autoprefixer/issues/775) the conversion of `dppx` factors to `dpi`. You can see in the previous example that Double Dash does it for you. To totally get rid of IE support, wait for [issue #1](https://github.com/meduzen/media.scss/issues/1) to be handled.

## The all-in-one mixin

```scss
@use 'double-dash.scss' as mq;

$dppx: (
  '1x': 1, // 1dppx = 96 dpi
  '2x': 2, // 2dppx = 192 dpi
  'switch': 2.46875, // 2.46875dppx = 237ppi
);

@include mq.resolution($dppx);
```

Available custom media queries:
- `resolution-1x`, `resolution-from-1x`, `resolution-to-1x`,
- `resolution-2x`, `resolution-from-2x`, `resolution-to-2x`,
- `resolution-switch`, `resolution-from-switch`, `resolution-to-switch`.

### Changing the prefixes

When using the all-round `resolution` mixin, prefixes (`resolution-from-`, `resolution-` and `resolution-to-`) can be replaced with 3 more arguments:

```scss
@include mq.resolution($dppx, 'res-from-', 'res-is-', 'res-to-');
```

By doing so, the resulting custom media queries become:
- `--res-1x`, `--res-from-1x`, `--res-to-1x`,
- `--res-2x`, `--res-from-2x`, `--res-to-2x`,
- `--res-switch`, `--res-from-switch`, `--res-to-switch`.

This was for the all-round mixin. For the other ones, the third parameter is the prefix:

```scss
@include mq.resolution-from('nexus-7', 1.3, 'more-dense-than-');
```

generates:
```css
@custom-media --more-dense-than-nexus-7 (min-resolution: 1.3dppx), (min-resolution: 124.8dpi);
```
