/**
 * @desc 
 */
const { createProxyMiddleware } = require('http-proxy-middleware')


const createProxy = (url = '', target = '') =>
    createProxyMiddleware(url, {
        target,
        changeOrigin: true,
        pathRewrite: {
            [`^${url}`]: '',
        },
    })



/**
 * 
 */
module.exports = function (app) {
    app.use(
        createProxy('/api', `http://13.251.124.186:5000/api/`),//
        // createProxy('/api', `http://47.241.253.161:5000/api/`),//
    )
}


