const config = {
  indexPages: false,
  googleAnalyticsID: 'UA-62791775-3',
  mixpanelID: '5ad8df79215a2cd8df2c93a126dcaa23',
  mixpanelDebug: true,
  hotjarEnabled: false,
  googleAnalyticsEnabled: true,
  mixpanelEnabled: false,
  sentryEnabled: true,
  // In local (i.e. a non-production like server) apiDomain is always used
  // In production apiDomain is only used when making calls server side, on the client the calls are relative to the hostname
  apiDomain: 'http://127.0.0.1:8000',
  facebookAppId: '258744194669921',
};

module.exports = config;
