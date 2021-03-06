import React from 'react';
import App from 'next/app';
import ReactGA from 'react-ga';

import { MixpanelProvider } from 'react-mixpanel';
import mixpanel from 'mixpanel-browser';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../EasTheme.jsx';
import '../components/styles.scss';
import EasApi from '../services/EasApi';
import { isServer } from '../utils';
import { initSentry } from '../utils/logger';

// We need the `intl-pluralrules` polyfill as it's used by `next-translate`
import 'intl-pluralrules';

import config from '../config';

if (!isServer && config.mixpanelEnabled) {
  mixpanel.init(config.mixpanelID, { debug: config.mixpanelDebug, track_pageview: false });
}

if (config.googleAnalyticsEnabled) {
  ReactGA.initialize(config.googleAnalyticsID, { titleCase: false });
}

EasApi.init();
initSentry();

class EasApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    // Workaround for issue with error logging
    // https://github.com/zeit/next.js/issues/8592
    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };

    return (
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!isServer && config.mixpanelEnabled ? (
            <MixpanelProvider mixpanel={mixpanel}>
              <Component {...modifiedPageProps} />
            </MixpanelProvider>
          ) : (
            <Component {...modifiedPageProps} />
          )}
        </ThemeProvider>
      </StylesProvider>
    );
  }
}

export default EasApp;
