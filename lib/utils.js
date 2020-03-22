/* eslint-disable no-console */
const { spawnSync } = require('child_process');
const { existsSync, mkdirSync, writeFileSync } = require('fs');

const whichYarn = spawnSync('which', ['yarn']);
const hasYarn = !!whichYarn.stdout.toString() && !process.argv.includes('--npm');

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
    console.log(`✔︎ Created ${path}`);
  });
}

function writeGit() {
  const whichGit = spawnSync('which', ['git']);
  const hasGit = !!whichGit.stdout.toString();

  if (hasGit && !existsSync('.git')) {
    spawnSync('git', ['init']);
    console.log(`✔︎ Created empty Git repository`);
  }
}

module.exports = {
  writeArtifacts,
  writeGit,
  hasYarn,
};
