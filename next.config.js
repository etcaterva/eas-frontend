// next.config.js
const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['echaloasuerte-js-sdk']);
const withSourceMaps = require('@zeit/next-source-maps')();
// Use the SentryWebpack plugin to upload the source maps during build step
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const chalk = require('chalk');

const { SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT, REACT_APP_ENV, NODE_ENV } = process.env;

const isDevelopmentServer = NODE_ENV !== 'production';

if (!isDevelopmentServer && !REACT_APP_ENV) {
  // TODO we could take a look at using a custom config file for preprod
  /** ****************
   * Possible environments:
   * - production (deployed app, both in the prod and dev server)
   * - local (running locally)
   * - test (running battery tests)
   **************** */
  console.log(
    chalk.bold.red(
      'If you are running `npm run build` or `npm run start` you need to specify an environment in REACT_APP_ENV. Possible values [production, local, test]',
    ),
  );
  throw Error('No environment specified');
}

module.exports = withImages(
  withTM(
    withSourceMaps({
      env: {
        APP_ENV: REACT_APP_ENV || 'local',
      },
      webpack: (config, options) => {
        // In `pages/_app.js`, Sentry is imported from @sentry/node. While
        // @sentry/browser will run in a Node.js environment, @sentry/node will use
        // Node.js-only APIs to catch even more unhandled exceptions.
        //
        // This works well when Next.js is SSRing your page on a server with
        // Node.js, but it is not what we want when your client-side bundle is being
        // executed by a browser.
        //
        // Luckily, Next.js will call this webpack function twice, once for the
        // server and once for the client. Read more:
        // https://nextjs.org/docs#customizing-webpack-config
        //
        // So ask Webpack to replace @sentry/node imports with @sentry/browser when
        // building the browser's bundle

        if (!options.isServer) {
          config.resolve.alias['@sentry/node'] = '@sentry/browser'; // eslint-disable-line no-param-reassign
        }
        // When all the Sentry configuration env variables are available/configured
        // The Sentry webpack plugin gets pushed to the webpack plugins to build
        // and upload the source maps to sentry.
        // This is an alternative to manually uploading the source maps
        // I would still like to uncomment the code below to send the sourcemaps to Sentry
        // https://github.com/zeit/next.js/tree/c60511c76d8dc07a4738da5b1677f32dfa1dc52b/examples/with-sentry-simple
        if (!isDevelopmentServer && SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT) {
          config.plugins.push(
            new SentryWebpackPlugin({
              include: '.next',
              ignore: ['node_modules'],
              urlPrefix: '~/_next',
            }),
          );
        }

        return config;
      },
    }),
  ),
);