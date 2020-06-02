const webpack = require('webpack');

module.exports = function(env,argv){
    argv.mode = argv.mode || "development";
    if(argv.mode==="production"){
      return require('./webpack.config-pro.js');
    }else if(argv.mode==='development'){
      return require('./webpack.config-dev.js');
    }
};