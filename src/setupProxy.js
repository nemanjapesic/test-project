const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v1/symbols',
    createProxyMiddleware({
      target: 'https://api.bitfinex.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/v2/tickers',
    createProxyMiddleware({
      target: 'https://api-pub.bitfinex.com/',
      changeOrigin: true,
    })
  );
};
