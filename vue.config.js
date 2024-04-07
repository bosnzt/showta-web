const { defineConfig } = require('@vue/cli-service')

const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const webpack = require('webpack')

module.exports = defineConfig({
  productionSourceMap: false,
  publicPath:process.env.ENV === 'production'
    ? '/dist/'
    : '/',
  transpileDependencies: true,
  lintOnSave: false,
  
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  chainWebpack(config) {
    //Set up svg sprite loader
    //Configure objects for webpack using config
    //Config.module means creating a named rule that can be used to modify the rule in the future
    config.module
      //Rules
      .rule('svg')
      //Ignoring
      .exclude.add(resolve('src/icons'))
      //End
      .end()
    //Config.module means creating a named rule that can be used to modify the rule in the future
    config.module
      //Rules
      .rule('icons')
      //Regular, parsing. svg format files
      .test(/\.svg$/)
      //Parsed files
      .include.add(resolve('src/icons'))
      //End
      .end()
      //Added a parsed loader
      .use('svg-sprite-loader')
      //Specific loader
      .loader('svg-sprite-loader')
      //Loader configuration
      .options({
        symbolId: 'icon-[name]'
      })
      //End
      .end()
    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    port:8087,
    client: {
      overlay: false
    },
    https: false,
    // hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://192.168.1.64:8888/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixin.scss";
        `
      },
    }
  }
})
