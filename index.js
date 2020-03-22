#!/usr/bin/env node
const { writeConfigs } = require('./lib/configs');
const { writePackages } = require('./lib/packages');
const { writeGit } = require('./lib/utils');

function install() {
  writeConfigs();

  if (!process.argv.includes('--configs')) {
    writePackages();
    writeGit();
  }
}

install();
