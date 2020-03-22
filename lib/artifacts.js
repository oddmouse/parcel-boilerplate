const { flags } = require('./utils');

const index = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>Howdy.</title>
  </head>
  ${flags.tailwind ? '<body class="bg-red-600">' : '<body>'}
    ${flags.tailwind ? '<h1 class="font-bold my-16 text-6xl text-center text-gray-800">Howdy.</h1>' : '<h1>Howdy.</h1>'}

    <script src="./js/app.js"></script>
  </body>
</html>
`;

const parcelStyle = `* {
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

const tailwindStyle = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;

const style = flags.tailwind ? tailwindStyle : parcelStyle;

const app = `const howdy = \`
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
  app,
  index,
  style,
};
