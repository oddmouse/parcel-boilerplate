const { writeArtifacts } = require('./utils');

const editorConfig = `root = true
[*]
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
max_line_length = 120
trim_trailing_whitespace = true
`;

const eslintIgnore = `.cache
dist
node_modules
public
vendor
`;

const esLint = {
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

const gitIgnore = `*.log*
*.zip
.DS_Store
.*cache
.env*
dist
node_modules
public
`;

const nvm = 'lts/erbium';

const prettier = {
  arrowParens: 'always',
  singleQuote: true,
  trailingComma: 'all',
};

function writeConfigs() {
  writeArtifacts([
    { name: '.editorconfig', content: editorConfig },
    { name: '.eslintignore', content: eslintIgnore },
    { name: '.eslintrc', content: JSON.stringify(esLint, null, 2) },
    { name: '.gitignore', content: gitIgnore },
    { name: '.nvmrc', content: nvm },
    { name: '.prettierrc', content: JSON.stringify(prettier, null, 2) },
  ]);
}

module.exports = {
  writeConfigs,
};
