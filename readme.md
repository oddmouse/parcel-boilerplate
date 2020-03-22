# Parcel Boilerplate

Boilerplate for a fresh project configured with [ParcelJS](https://parceljs.org), [ESLint](https://eslint.org), [Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) and [Prettier](https://prettier.io).

## Usage

If `yarn` is detected, it will be used to install dependencies, otherwise it will fallback to `npm`. This can be overridden with the `--npm` flag.

### Make a new project directory.

```
$ mkdir <project-name> && cd <project-name>
```

### Run the boilerplate script.

#### Parcel only

```
$ npx github:oddmouse/parcel-boilerplate
```

#### With Tailwind CSS

```
$ npx github:oddmouse/parcel-boilerplate --tailwind
```

## Optional flags

- `--configs` - Only write the dot config files and do not create a `package.json` or install dependencies.

- `--npm` - Install using `npm` instead of the default `yarn`.

- `--tailwind` - Add the [Tailwind CSS](https://tailwindcss.com) framework with [PurgeCSS](https://www.purgecss.com).
