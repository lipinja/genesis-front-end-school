const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://google.com',
    changeOrigin: true
}
module.exports = function(app) {
  console.log("111111111111111111111111111111");
  app.use(
    '/search',
    createProxyMiddleware(proxy)
  );
};