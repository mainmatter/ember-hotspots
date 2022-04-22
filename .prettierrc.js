module.exports = {
  trailingComma: 'es5',
  singleQuote: true,
  overrides: [
    {
      files: '**/*.hbs',
      options: {
        singleQuote: false,
      },
    },
    {
      files: '**/*{yml,yaml}',
      options: {
        singleQuote: false,
      },
    },
  ],
};
