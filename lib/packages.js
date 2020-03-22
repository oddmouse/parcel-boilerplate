/* eslint-disable no-console */
const { spawnSync } = require('child_process');
const { hasYarn, writeArtifacts } = require('./utils');
const parcel = require('./parcel');
const tailwind = require('./tailwind');

const name = process.cwd().split('/').slice(-1).pop();

let artifacts = [];

let dependencies = [];

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
    uninstall: 'rm -rf ./node_modules',
  },
  husky: {
    hooks: {
      'pre-commit': 'lint-staged',
    },
  },
  'lint-staged': {
    '*.js': ['eslint --fix', 'git add'],
    '*.{html,json,md}': ['prettier --write', 'git add'],
  },
  browserslist: ['last 2 Chrome versions'],
};

function processFlag(flag) {
  if (flag.artifacts) {
    artifacts = [...artifacts, ...flag.artifacts];
  }

  if (flag.dependencies) {
    dependencies = [...dependencies, ...flag.dependencies];
  }

  if (flag.devDependencies) {
    devDependencies = [...devDependencies, ...flag.devDependencies];
  }

  if (flag.package) {
    packageJson = Object.assign(packageJson, flag.package);
  }
}

function processArguments() {
  processFlag(parcel);

  if (process.argv.includes('--tailwind')) {
    processFlag(tailwind);
  }
}

function installPackages() {
  console.log('… Installing dependencies, hang on a sec');

  if (hasYarn) {
    if (devDependencies.length) spawnSync('yarn', ['add', '--dev', ...devDependencies]);
    if (dependencies.length) spawnSync('yarn', ['add', ...dependencies]);
  } else {
    if (devDependencies.length) spawnSync('npm', ['install', '--save-dev', ...devDependencies]);
    if (dependencies.length) spawnSync('npm', ['i', ...dependencies]);
  }

  console.log('✔︎ Installation complete');
}

function writePackages() {
  processArguments();

  artifacts = [
    {
      name: 'package.json',
      content: JSON.stringify(packageJson, null, 2),
    },
    ...artifacts,
  ];

  writeArtifacts(artifacts);
  installPackages();
}

module.exports = {
  writePackages,
};
