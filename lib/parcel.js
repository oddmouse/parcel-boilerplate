const { hasYarn } = require('./utils');

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>Howdy.</title>
  </head>
  <body>
    <h1>Howdy.</h1>
  </body>
  <script src="./js/main.js"></script>
</html>
`;

const style = `* {
  box-sizing: border-box;
}

html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  line-height: 1.5;
}

body {
  background-color: #e53e3e;
  margin: 0;
}

h1 {
  color: #2d3748;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 4rem;
  margin-top: 4rem;
  text-align: center;
}
`;

const main = `const howdy = \`
 _   _                  _
| | | | _____      ____| |_   _
| |_| |/ _ \\\\ \\\\ /\\\\ / / _\\\` | | | |
|  _  | (_) \\\\ V  V / (_| | |_| |_
|_| |_|\\\\___/ \\\\_/\\\\_/ \\\\__,_|\\\\__, (_)
                          |___/
\`

/* eslint-disable-next-line no-console */
console.log(howdy);
`;

module.exports = {
  devDependencies: ['parcel'],
  package: {
    scripts: {
      build: 'parcel build src/index.html --no-cache --no-source-maps',
      clean: 'rm -rf .cache dist',
      dev: 'parcel src/index.html',
      postbuild: 'mv dist public',
      prebuild: `${hasYarn ? 'yarn' : 'npm run'} clean`,
      predev: `${hasYarn ? 'yarn' : 'npm run'} clean`,
    },
  },
  artifacts: [
    {
      name: 'src/css/style.css',
      content: style,
    },
    {
      name: 'src/js/main.js',
      content: main,
    },
    {
      name: 'src/index.html',
      content: html,
    },
  ],
};
