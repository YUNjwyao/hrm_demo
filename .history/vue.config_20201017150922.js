module.exports = {
    // webpack-dev-server 相关配置
    devServer: {
        proxy: {
            '/api': {
                target: 'http://ab38068962a2.ngrok.io/csi_employee_home_webui',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''  //通过pathRewrite重写地址，将前缀/api转为/
                }
            }
        }
    },
}