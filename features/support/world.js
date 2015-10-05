var Garden = require(require.resolve('plus.garden')).Garden;
var garden = new Garden().init();

var World = function World(callback) {

    this.garden = garden;
    
    this.config = garden.get('config');

    garden.get('Webdriver.Browser').create(function (browserService) {
        this.browserService = browserService;
        this.driver = browserService.driver;
        this.browser = browserService.browser;
        this.proxy = browserService.proxy;
        callback();
    }.bind(this));

};

exports.World = World;