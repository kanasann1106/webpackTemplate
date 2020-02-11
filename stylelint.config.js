module.exports = {
  plugins: [
    'stylelint-scss',
  ],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recommended-scss',
  ],
  rules: {
    'font-family-no-missing-generic-family-keyword': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-trailing-semicolon': 'always',
    'selector-pseudo-element-colon-notation': 'double',
    'number-leading-zero': 'never',
    'block-closing-brace-empty-line-before': 'never',
    'selector-max-empty-lines': 0,
    'max-empty-lines': 0,
  },
};
