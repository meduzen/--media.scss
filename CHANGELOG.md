# Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) starting 1.0.

## Unreleased

Compare with [last published version](https://github.com/meduzen/--media.scss/compare/v1.0.0...main).

## v1.0.0 (2022-09-09)

Compare with [last published version](https://github.com/meduzen/--media.scss/compare/v1.0.0-rc.0...v1.0.0).

### New

- Add `forced-colors`.

### Documentation

- Add CHANGELOG file (this file).

### Breaking

`v1.0.0` is now the default version and `v0.8.0` can be pulled by running `npm install double-dash.scss@0`.

## v1.0.0-rc.0 (2022-07-20)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/v0.8.0...v1.0.0-rc.0).

### New

- Add support for Dart SASS.
- [Nintendo Switch](https://github.com/meduzen/--media.scss/blob/2db0feaf890fc2188069ffc4c87ea81be00af601/src/variables/_resolution.scss#L6-L8):
  - add a custom media query for the Nintendo Switch OLED;
  - fix the Nintendo Switch custom media query.
- Remove unneeded space from media features.

### Breaking

- Remove support for `node-sass`.

## v0.8.0 (2021-07-21)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/0.7.1...v0.8.0).

### New

- Add `prefers-reduced-data`.

### Breaking

- Update level-5 Media Queries following spec.

## v0.7.1 (2020-12-29)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/0.7.0...0.7.1).

### Chore

- Fix EditorConfig and remove it from shipped files. This has no impact on the library usage.

## v0.7.0 (2020-11-15)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/v0.6.1...0.7.0).

### New

- Add [debug mode](https://github.com/meduzen/--media.scss#debug) to output generated custom media queries in the CLI.

## v0.6.1 (2020-07-11)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/v0.6.0...v0.6.1).

### Fix

- Fix ratios media queries generating unparsable media features.

## v0.6.0 (2019-07-19)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/v0.5.1...v0.6.0).

### New

- Add Nintendo Switch Lite resolution.

### Breaking

- Sizes mixins: [prefix removed](https://github.com/meduzen/--media.scss/commit/e2df04a60d35204697f0e460e7021103c8cbd038?diff=split) (it is now `null` by default) for custom media queries generated by the following mixins: `--w-is`, `--w-to`, `--h-is`, `--h-to`. No changes for the all-round mixins (`--w` and `--h`).

## v0.5.1 (2019-07-07)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/v0.5.0...v0.5.1).

### Documentation

- Remove the _currently writing_ mention at the top of `README.md`.

## v0.5.0 (2019-07-07)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/v0.4.0...v0.5.0).

### New

- Add `--play` and `--stop` aliases for `prefers-reduced-motion`.
- Add undocumented mixins for [media queries types](https://github.com/meduzen/--media.scss/tree/master/src/mixins/types).

### Fix

Fix missing parameter in `--m()` mixin.

### Documentation

- Make the documentation more readable by splitting it into several topics.

## v0.4.0 (2019-04-29)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/v0.3.0...v0.4.0).

### New

- Add pointers variables.
- Add some aliases.

### Documentation

Start documentation:
- media queries levels 4 and 5 spec awareness;
- Double Dash first look;
- document some common custom media queries.

### Breaking

- `--ratio-from-[name]` and `--ratio-to-[name]` don’t include the ratio value anymore.

## v0.3.0 (2019-04-26)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/v0.2...v0.3.0).

### New

- Add sizes and ratios variables and mixins.

### Breaking

- Custom media queries prefix for resolution is changed from `--dpi` to `--resolution`.

## v0.2.0 (2019-04-23)

Compare with [previous version](https://github.com/meduzen/--media.scss/compare/v0.1.0...v0.2).

### New

- Add resolutions variables and mixins.

## v0.1.0 (2019-04-19)

First published version.
