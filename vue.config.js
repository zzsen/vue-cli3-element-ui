const opn = require('opn')
opn('http://localhost:8088')
module.exports = {
  devServer: {
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://localhost:7001'
        // pathRewrite: {
        //   changeOrigin: true,
        //   '^/api': ''
        // }
      }
    }
  }
}
