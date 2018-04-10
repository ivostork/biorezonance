const faviconsContext = require.context(
  '!!file-loader?name=[name].[ext]!.',
  true,
  /\.(svg|png|ico|xml|webmanifest)$/
);
faviconsContext.keys().forEach(faviconsContext);