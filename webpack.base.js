const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const isProd = process.env.NODE_ENV === 'production'; //是否生产环境

// 给页面添加自定义标签的插件
const cssCompileLoader = ['css-loader', 'autoprefixer-loader?{browsers:["Android > 4.1", "Ios > 7"]}'];

const getFiles = (src, replaceDir = '') => {
  let files = glob.sync(src);
  let map = {};

  files.forEach((file) => {
    let dirname = path.dirname(file);
    let extname = path.extname(file);
    let basename = path.basename(file, extname);
    let pathname = path.normalize(path.join(dirname, basename));
    let pathDir = path.normalize(replaceDir);

    if (pathname.startsWith(pathDir)) {
      pathname = pathname.substring(pathDir.length);
    }
    map[pathname.replace(/\\/g, '/')] = [file];
  });
  return map;
};

function resolve(dir) {
  return path.join(__dirname, dir);
}

var entries = getFiles('./src/pages/**/*.js', 'src/pages/');
entries = transformName(entries);
function transformName(entries = {}, prefix = 'js') {
  var ret = {};

  for (var entry in entries) {
    let nEntry = entry.replace(/(\/\w+)/, `/${prefix}$1`);
    ret[nEntry] = entries[entry];
  }
  return ret;
}

entries.venders = ['babel-polyfill', 'vue', 'common'];
var chunks = Object.keys(entries);
var config = {
  entry: entries,
  output: {
    path: path.join(__dirname, '/build'),
    filename: isProd ? 'static/[name].js' : 'static/[name].js',
    publicPath: '',
    chunkFilename: '[id].chunk.js?[chunkHash]'
  },
  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: cssCompileLoader
      })
    },
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [...cssCompileLoader, 'less-loader']
      })
    },
    {
      test: /\.html$/,
      loader: 'html-loader?-minimize', // 避免压缩html,https://github.com/webpack/html-loader/issues/50
      exclude: /static/
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|static\/images|static\/fonts)/,
      use: {
        loader: 'babel-loader?cacheDirectory'
      }
    },
    {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader',
      options: {
        sourceMap: true,
        loaders: {
          css: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader', // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
            use: cssCompileLoader
          })
        },
        postLoaders: {
          html: 'babel-loader'
        }
      }
    }]
  },
  resolve: {
    alias: {
      'src': resolve('src'),
      'mixins': resolve('src/static/js/mixins.js'),
      'api': resolve('src/static/js/api.js'),
      'common': resolve('src/static/js/common.js'),
      '@js': resolve('src/static/js'),
      '@style': resolve('src/static/css'),
      '@components': resolve('src/static/components')
    },
    extensions: ['.js', '.less', '.vue'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ]
  },
  // 开发环境
  devtool: '#source-map',
  performance: {
    hints: false
  },
  plugins: [
    new ExtractTextPlugin({
      filename: (getPath) => {
        // const ret = getPath('static/[name].css');
        const temp = getPath('[name]').split('/');
        temp[1] = 'css';
        return isProd ? `static/${temp.join('/')}.css` : `static/${temp.join('/')}.css`;
      }
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      minChunkSize: 1000
    }),
    // 通过合并小于 minChunkSize 大小的 chunk，将 chunk 体积保持在指定大小限制以上。
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 10000 // Minimum number of characters
    }),
    new CommonsChunkPlugin({
      name: 'venders', // 将公共模块提取，生成名为`venders`的chunk
      chunks: chunks,
      minChunks: 2, // 提取所有entry共同依赖的模块
      filename: 'static/common/js/vender.js'
    })
  // new webpack.optimize.ModuleConcatenationPlugin(),
  ]
};

const pages = getFiles('./src/pages/**/*.html', 'src/pages/');
Object.keys(pages).forEach((page) => {
  let conf = {
    filename: 'pages/' + page + '.html',
    template: './src/pages/' + page + '.html',
    inject: false,
    cache: true
  };

  page = page.split('/');
  let last = page[1];
  page[1] = 'js';
  page[2] = last;
  page = page.join('/');
  if (page in config.entry) {
    conf.inject = 'body';
    conf.chunks = ['venders', page];
    conf.hash = true;
  }
  config.plugins.push(new HtmlWebpackPlugin(conf));
});

// 替换头部标签的插件
function HtmlTagsAddPlugin(options = {}) {
  this.options = options;
}
HtmlTagsAddPlugin.prototype.apply = function(compiler) {
  let options = this.options;
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-alter-asset-tags', function(htmlPluginData, callback) {
      htmlPluginData.head = options.tags.concat(htmlPluginData.head);
      callback(null, htmlPluginData);
    });
  });
};

function HtmlReplacePlugin(options = {}) {
  this.options = options;
}

HtmlReplacePlugin.prototype.apply = function(compiler) {
  var options = this.options;
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-generation', function(data, callback) {
      let rules = options.rules;
      let ignore = options.ignore || new RegExp(Math.random() * 100);
      let js = data.assets.js;
      let css = data.assets.css;
      data.assets.js = js.map((item) => {
        // 如果不满足ignore时，才执行替换规则
        if (!ignore.test(item)) {
          rules.forEach((rule) => {
            item = item.replace(rule.test, rule.value);
          });
        }
        return item;
      });
      data.assets.css = css.map((item) => {
        // 如果不满足ignore时，才执行替换规则
        if (!ignore.test(item)) {
          rules.forEach((rule) => {
            item = item.replace(rule.test, rule.value);
          });
        }
        return item;
      });
      callback(null, data);
    });
  });
};

module.exports.HtmlReplacePlugin = HtmlReplacePlugin;
module.exports.HtmlTagsAddPlugin = HtmlTagsAddPlugin;
module.exports.config = config;
module.exports.getFiles = getFiles;
