# Parcel Boilerplate

Boilerplate for a fresh [Parcel](https://parceljs.org) + [Airbnb ESLint](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) + [Prettier](https://prettier.io) project with optional [Tailwind CSS](https://tailwindcss.com) + [PurgeCSS](https://www.purgecss.com) configuration.

## Usage

Dependencies are installed using `yarn` if it is detected, otherwise `npm` wil be used. This can be overridden by using the `--npm` flag.

### Make a new project directory.

```
mkdir <project-name> && cd <project-name>
```

### Run the boilerplate script.

#### Parcel only

```
npx github:oddmouse/parcel-boilerplate
```

#### With Tailwind CSS

```
npx github:oddmouse/parcel-boilerplate --tailwind
```

## Optional flags

- `--configs` - Only write the dot config files and do not create a `package.json` or install dependencies.

- `--no-git` - Do not create an empty git repository.

- `--no-install` - Do not install dependencies.

- `--npm` - Install using `npm` instead of the default `yarn`.

- `--tailwind` - Add the [Tailwind CSS](https://tailwindcss.com) framework with [PurgeCSS](https://www.purgecss.com).
