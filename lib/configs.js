const { flags, writeArtifacts } = require('./utils');

const editorconfig = `root = true
[*]
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 120
trim_trailing_whitespace = true
`;

const eslintignore = `.cache
dist
node_modules
public
vendor
`;

const eslintrc = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
};

const gitignore = `*.log*
*.zip
.DS_Store
.*cache
.env*
dist
node_modules
public
`;

const nvmrc = 'lts/erbium';

const postcssconfig = `const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.html', './src/**/*.vue', './src/**/*.js', './src/**/*.jsx'],
  defaultExtractor: (content) => content.match(/[\\w-/:]+(?<!:)/g) || [],
});

module.exports = {
  plugins: [tailwindcss, autoprefixer, ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])],
};
`;

const prettierrc = {
  arrowParens: 'always',
  singleQuote: true,
  trailingComma: 'all',
};

function writeConfigs() {
  const configs = [
    { name: '.editorconfig', content: editorconfig },
    { name: '.eslintignore', content: eslintignore },
    { name: '.eslintrc', content: JSON.stringify(eslintrc, null, 2) },
    { name: '.gitignore', content: gitignore },
    { name: '.nvmrc', content: nvmrc },
    { name: '.prettierrc', content: JSON.stringify(prettierrc, null, 2) },
  ];

  if (flags.tailwind) configs.push({ name: 'postcss.config.js', content: postcssconfig });

  writeArtifacts(configs);
}

module.exports = {
  writeConfigs,
};
