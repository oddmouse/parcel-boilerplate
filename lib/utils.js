/* eslint-disable no-console */
const { spawnSync } = require('child_process');
const { existsSync, mkdirSync, writeFileSync } = require('fs');

const flags = {
  configs: process.argv.includes('--configs'),
  noGit: process.argv.includes('--no-git'),
  noInstall: process.argv.includes('--no-install'),
  npm: process.argv.includes('--npm'),
  tailwind: process.argv.includes('--tailwind'),
};

const hasYarn = !!spawnSync('which', ['yarn']).stdout.toString() && !flags.npm;

function cleanPath(name) {
  const segments = name.split('/').filter((val) => val);

  if (segments.length > 1) {
    const dir = segments.slice(0, -1).join('/');
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  }

  return segments.join('/');
}

function writeArtifacts(artifacts) {
  artifacts.forEach(({ name, content }) => {
    const path = cleanPath(name);
    writeFileSync(path, content);
    console.log('\x1b[32m', '✔︎ Created', '\x1b[0m', path);
  });
}

function writeGit() {
  const hasGit = !!spawnSync('which', ['git']).stdout.toString();

  if (hasGit && !existsSync('.git')) {
    spawnSync('git', ['init']);
    console.log('\x1b[32m', '✔︎ Created', '\x1b[0m', 'git repository');
  }
}

module.exports = {
  flags,
  hasYarn,
  writeArtifacts,
  writeGit,
};
