/* eslint-disable no-console */
const { spawnSync } = require('child_process');
const { flags, hasYarn, writeArtifacts } = require('./utils');
const { app, index, style } = require('./artifacts');

const name = process.cwd().split('/').slice(-1).pop();

let artifacts = [
  {
    name: 'src/js/app.js',
    content: app,
  },
  {
    name: 'src/index.html',
    content: index,
  },
  {
    name: 'src/css/style.css',
    content: style,
  },
];

let dependencies = ['parcel'];

let devDependencies = [
  'eslint',
  'eslint-config-airbnb-base',
  'eslint-config-prettier',
  'eslint-plugin-import',
  'eslint-plugin-prettier',
  'husky',
  'lint-staged',
  'prettier',
];

let packageJson = {
  name,
  version: '0.0.0',
  private: true,
  scripts: {
    build: 'parcel build src/index.html --no-cache --no-source-maps',
    clean: 'rm -rf .cache dist',
    dev: 'parcel src/index.html',
    postbuild: 'mv dist public',
    prebuild: `${hasYarn ? 'yarn' : 'npm run'} clean`,
    predev: `${hasYarn ? 'yarn' : 'npm run'} clean`,
  },
  husky: {
    hooks: { 'pre-commit': 'lint-staged' },
  },
  'lint-staged': {
    '*.js': ['eslint --fix', 'git add'],
    '*.{html,json,md}': ['prettier --write', 'git add'],
  },
  browserslist: ['last 2 Chrome versions', 'Firefox ESR'],
};

function mergeOptions(opts) {
  if (opts.artifacts) {
    artifacts = [...artifacts, ...opts.artifacts];
  }

  if (opts.dependencies) {
    dependencies = [...dependencies, ...opts.dependencies];
  }

  if (opts.devDependencies) {
    devDependencies = [...devDependencies, ...opts.devDependencies];
  }

  if (opts.package) {
    packageJson = Object.assign(packageJson, opts.package);
  }
}

function writePackages() {
  if (flags.tailwind) {
    mergeOptions({ dependencies: ['@fullhuman/postcss-purgecss', 'autoprefixer', 'tailwindcss'] });
  }

  artifacts = [
    {
      name: 'package.json',
      content: JSON.stringify(packageJson, null, 2),
    },
    ...artifacts,
  ];

  writeArtifacts(artifacts);
}

function install() {
  console.log('\n\x1b[0m', '… Installing with', hasYarn ? 'yarn,' : 'npm,', 'one sec');

  if (hasYarn) {
    if (devDependencies.length) spawnSync('yarn', ['add', '--dev', ...devDependencies]);
    if (dependencies.length) spawnSync('yarn', ['add', ...dependencies]);
  } else {
    if (devDependencies.length) spawnSync('npm', ['install', '--save-dev', ...devDependencies]);
    if (dependencies.length) spawnSync('npm', ['i', ...dependencies]);
  }

  console.log('\n\x1b[32m', '✔︎ Installation complete', '\x1b[0m');

  if (hasYarn) {
    console.log('\n\x1b[0m', '  Local development:', '\x1b[36m', 'yarn dev');
    console.log('\x1b[0m', '   Production build:', '\x1b[36m', 'yarn build\n');
  } else {
    console.log('\n\x1b[0m', '  Local development:', '\x1b[36m', 'npm run dev');
    console.log('\x1b[0m', '   Production build:', '\x1b[36m', 'npm run build\n');
  }
}

module.exports = {
  install,
  writePackages,
};
