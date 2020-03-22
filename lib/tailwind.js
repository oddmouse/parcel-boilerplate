const postcss = `const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.js', './src/**/*.jsx'],
  defaultExtractor: (content) => content.match(/[\\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [tailwindcss, autoprefixer, ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])],
};
`;

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>Howdy.</title>
  </head>
  <body class="bg-red-600">
    <h1 class="font-bold my-16 text-6xl text-center text-gray-800">Howdy.</h1>
  </body>
  <script src="./js/main.js"></script>
</html>
`;

const style = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;

module.exports = {
  dependencies: ['@fullhuman/postcss-purgecss', 'autoprefixer', 'tailwindcss'],
  artifacts: [
    {
      name: 'postcss.config.js',
      content: postcss,
    },
    {
      name: '/src/css/style.css',
      content: style,
    },
    {
      name: '/src/index.html',
      content: html,
    },
  ],
};
