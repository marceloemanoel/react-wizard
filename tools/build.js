/*eslint-disable no-console*/
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

console.log("Generating minified bundle for production via Webpack. This will take a moment...".blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) { //So.. a fatal error occurred. Stop here..
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log("Webpack generated the following warnings: ".bold.yellow);
    return jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  //if got this far, this build succeeded.
  console.log("Your library has been compiled in production mode and written into /lib. It's ready to roll!".green);
  return 0;
});
