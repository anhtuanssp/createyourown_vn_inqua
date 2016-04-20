var path = require('path');

var configs = {
    base: require(path.join(__dirname, 'configs/base')),
    dev:  require(path.join(__dirname, 'configs/dev')),
    production:  require(path.join(__dirname, 'configs/production'))
};

module.exports = configs.dev;
