#!/usr/bin/env node
const { writeConfigs } = require('./lib/configs');
const { writePackages, install } = require('./lib/packages');
const { flags, writeGit } = require('./lib/utils');

writeConfigs();

if (!flags.configs) {
  writePackages();
  if (!flags.noGit) writeGit();
  if (!flags.noInstall) install();
}
