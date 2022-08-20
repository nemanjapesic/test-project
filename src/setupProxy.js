const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v1/symbols',
    createProxyMiddleware({
      target: 'https://api.bitfinex.com/',
      changeOrigin: true,
    })
  );
};
